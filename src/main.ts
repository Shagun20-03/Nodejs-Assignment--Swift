import express from "express";
import UserModel, { IUser } from "./models/UserModel";
import PostModel, { IPost } from "./models/PostModel";
import CommentModel, { IComment } from "./models/CommentModel";
import mongoose from "mongoose";
import https from "https";

const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection setup
mongoose.connect(
  "mongodb+srv://admin-shagun:Test123@cluster0.s3ny0yg.mongodb.net/node_assignment?retryWrites=true&w=majority"
);

const timeout = 15000; // Set the timeout duration in milliseconds

async function sendHttpGetRequest(url: string) {
  return new Promise<string>((resolve, reject) => {
    const request = https.get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        if (response.statusCode === 200) {
          try {
            // Try to parse the response as JSON
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            // Handle JSON parsing error
            reject(`JSON Parsing Error: ${error}`);
          }
        } else {
          // Handle non-200 status code
          reject(`HTTP Error: ${response.statusCode}`);
        }
      });
    });

    request.on("error", (error) => {
      reject(error);
    });

    // Set a timeout for the request
    request.setTimeout(timeout, () => {
      request.abort();
      reject("Request timed out");
    });

    // Set a timeout for the request
    request.end();
  });
}

// Load 10 users into the database
router.get("/load", async (req, res) => {
  try {
    // Fetch user data from JSON Placeholder
    const userResponseData: any = await sendHttpGetRequest(
      "https://jsonplaceholder.typicode.com/users"
    );

    const userData = userResponseData as IUser[];

    // The rest of your code to process userData
    let startIndex = 0;
    const batchSize = 10;

    while (startIndex < userData.length) {
      const usersToProcess = userData.slice(startIndex, startIndex + batchSize); // Get the next batch of 10 users

      const promises = usersToProcess.map(async (user: any) => {
        const postResponseData: any = await sendHttpGetRequest(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );
        const posts = postResponseData as IPost[];

        // Create a new user document
        const newUser: IUser = new UserModel({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          website: user.website,
          company: user.company,
          posts: [],
        });

        // Save the user document
        await newUser.save();

        const postPromises = posts.map(async (post: any) => {
          const newPost = new PostModel({
            id: post.id,
            title: post.title,
            body: post.body,
            comments: [], // Initialize comments as an empty array
          });

          // Save the post document and associate it with the user
          await newPost.save();

          // Fetch comments for this post
          const commentResponseData: any = await sendHttpGetRequest(
            `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
          );
          const postComments = commentResponseData as IComment[];

          // Create CommentModel instances and associate them with the post
          const commentPromises = postComments.map(
            async (commentData: IComment) => {
              const newComment = new CommentModel({
                id: commentData.id,
                // postId: commentData.postId,
                name: commentData.name,
                email: commentData.email,
                body: commentData.body,
              });

              // Save the comment document
              await newComment.save();

              // Push the comment's _id into the post's comments array
              newPost.comments.push(newComment._id);
            }
          );

          // Wait for all comment promises to resolve
          await Promise.all(commentPromises);

          // Save the updated post document with comments
          await newPost.save();

          // Push the post to the user's posts array
          newUser.posts.push(newPost._id);
        });

        // Wait for all post promises to resolve
        await Promise.all(postPromises);

        // Save the updated user document
        await newUser.save();
      });

      // Wait for all user promises to resolve
      await Promise.all(promises);

      // Increment the startIndex for the next batch
      startIndex += batchSize;
    }

    // Respond with a 200 OK on success
    res.status(200).send();
  } catch (error) {
    // Respond with an error code on failure
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors appropriately
  }
});

// DELETE route to delete all users
router.delete("/users", async (req, res) => {
  try {
    // Delete all users in the UserModel
    await UserModel.deleteMany({});

    // Respond with a 204 No Content status on success (since there's no data to return)
    res.status(200).send();
  } catch (error) {
    // Respond with an error code on failure
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors appropriately
  }
});

// // DELETE /users/:userId - Delete a user with userId from DB
router.delete("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ id: userId });
    if (!user) {
      // User with the specified userId was not found
      return res.status(404).json({ error: "User not found" });
    }
    // Delete the user document from the database
    await UserModel.deleteOne({ id: userId });
    // Return a success response
    res.status(204).send(); // No content in response
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the GET route to fetch a user by userId
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user by userId

    const user = await UserModel.findOne({ id: userId }).populate({
      path: "posts",
      model: PostModel,
      populate: {
        path: "comments",
        model: CommentModel,
      },
    });

    if (!user) {
      // User not found with the specified userId
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user data with posts and comments in JSON format
    res.status(200).json(user);
  } catch (error) {
    // Handle errors, e.g., database errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // PUT /users - Put a new user into the DB
router.put("/users", async (req, res) => {
  try {
    const userData = req.body; // Assuming the user data is sent in the request body

    // Check if the user with the same id already exists
    const existingUser = await UserModel.findOne({ id: userData.id });

    if (existingUser) {
      // User with the same id already exists
      return res.status(409).json({ error: "User already exists" });
    }

    // Create a new user document
    const newUser = new UserModel(userData);

    // Save the new user document to the database
    await newUser.save();

    // Include a Link header in the response
    res.set("Link", "/users/" + newUser.id); // Set the appropriate URL

    // Return a success response with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors, e.g., database errors or invalid request data
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//user has userId- 5 ftech all posts
//add 5 comments to each post that user id 5
