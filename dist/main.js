"use strict";
// import express, { Request, Response } from "express";
// import UserModel, { IUser } from "./models/UserModel";
// import PostModel, { IPost } from "./models/PostModel";
// import CommentModel, { IComment } from "./models/CommentModel";
// import mongoose from "mongoose";
// const fetch = require('node-fetch');
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const app = express();
// const port = process.env.PORT || 3000;
// // Middleware to parse JSON
// app.use(express.json());
// // MongoDB connection setup
// mongoose.connect(
//   "mongodb+srv://admin-shagun:Test123@cluster0.s3ny0yg.mongodb.net/node_assignment?retryWrites=true&w=majority"
// );
// // Define interfaces for the JSON Placeholder data
// interface IJsonPlaceholderUser {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: any;
//   phone: string;
//   website: string;
//   company: any;
// }
// interface IJsonPlaceholderPost {
//   id: number;
//   title: string;
//   body: string;
// }
// interface IJsonPlaceholderComment {
//   id: number;
//   name: string;
//   email: string;
//   body: string;
//   postId: number;
// }
// // Load 10 users into the database
// router.get("/load", async (req: Request, res: Response) => {
//   try {
//     // Fetch user data from JSON Placeholder
//     const userResponse = await fetch(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     const userData = (await userResponse.json()) as IUser[];
//     const usersToProcess =
//       (await userResponse.json()) as IJsonPlaceholderUser[];
//     // Process each user
//     for (const user of usersToProcess.slice(0, 10)) {
//       // Create a new user document
//       const newUser = new UserModel({
//         id: user.id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         website: user.website,
//         company: user.company,
//         posts: [],
//       });
//       // Fetch posts for the user
//       const postResponse = await fetch(
//         `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
//       );
//       const posts = (await postResponse.json()) as IJsonPlaceholderPost[];
//       // Process each post
//       for (const post of posts) {
//         // Create a new post document
//         const newPost = new PostModel({
//           id: post.id,
//           title: post.title,
//           body: post.body,
//           comments: [],
//         });
//         // Save the post document
//         await newPost.save();
//         // Push the post to the user's posts array
//         newUser.posts.push(newPost._id);
//       }
//       // Fetch comments for the user's posts
//       const commentResponse = await fetch(
//         `https://jsonplaceholder.typicode.com/comments?postId=${user.id}`
//       );
//       const comments =
//         (await commentResponse.json()) as IJsonPlaceholderComment[];
//       // Process each comment
//       for (const comment of comments) {
//         // Find the corresponding post for the comment
//         const correspondingPost = newUser.posts.find((post) => {
//           if ("id" in post) {
//             // Check if 'id' property exists (IPost)
//             return (post as IPost).id === comment.postId;
//           }
//           return false; // It's an ObjectId
//         });
//         // Create a new comment document
//         // Push the comment to the corresponding post's comments array
//         const newComment = new CommentModel({
//           id: comment.id,
//           postId: comment.postId,
//           name: comment.name,
//           email: comment.email,
//           body: comment.body,
//         });
//         // Save the comment document
//         await newComment.save();
//         // Save the new comment document
//         if (correspondingPost && "comments" in correspondingPost) {
//           (correspondingPost as IPost).comments.push(newComment._id);
//         }
//         // Save the corresponding post
//         await (correspondingPost as IPost).save();
//       }
//       // Save the user document
//       await newUser.save();
//     }
//     res.status(200).send(); // Empty response with status 200 on success
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" }); // Handle errors appropriately
//   }
// });
const express_1 = __importDefault(require("express"));
const UserModel_1 = __importDefault(require("./models/UserModel"));
const PostModel_1 = __importDefault(require("./models/PostModel"));
const CommentModel_1 = __importDefault(require("./models/CommentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = express_1.default.Router();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const options = {
    timeout: 15000, // Set the timeout to 15 seconds (adjust as needed)
};
// Middleware to parse JSON
app.use(express_1.default.json());
// MongoDB connection setup
mongoose_1.default.connect("mongodb+srv://admin-shagun:Test123@cluster0.s3ny0yg.mongodb.net/node_assignment?retryWrites=true&w=majority");
//load 10 users into db
router.get("/load", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch user data from JSON Placeholder
        const userResponse = yield (0, node_fetch_1.default)("https://jsonplaceholder.typicode.com/users");
        const userData = (yield userResponse.json());
        const usersToProcess = userData.slice(0, 10); // Get the first 10 users
        // Fetch posts and comments for each user
        const promises = usersToProcess.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const fetchModule = yield Promise.resolve().then(() => __importStar(require('node-fetch')));
            const fetch = fetchModule.default;
            const postResponse = yield fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const posts = yield postResponse.json();
            const commentResponse = yield fetch(`https://jsonplaceholder.typicode.com/comments?postId=${user.id}`);
            const comments = yield commentResponse.json();
            // Create a new user document
            const newUser = new UserModel_1.default({
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
            yield newUser.save();
            const fetchedPosts = (yield postResponse.json());
            // Create and save post documents
            for (const post of fetchedPosts) {
                const newPost = new PostModel_1.default({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    comments: [], // Initialize comments as an empty array
                });
                // Save the post document and associate it with the user
                yield newPost.save();
                // Push the post to the user's posts array
                newUser.posts.push(newPost._id);
            }
            yield newUser.save();
            const fetchedComments = (yield commentResponse.json());
            // Create and save comment documents
            for (const comment of fetchedComments) {
                // Find the corresponding post based on the comment's postId
                var correspondingPost = newUser.posts.find((post) => post.id === comment.postId);
                // Check if a corresponding post was found
                if (correspondingPost) {
                    // Create a new comment document
                    const newComment = new CommentModel_1.default({
                        id: comment.id,
                        postId: comment.postId,
                        name: comment.name,
                        email: comment.email,
                        body: comment.body,
                    });
                    // Push the comment to the corresponding post's comments array
                    if (correspondingPost && "comments" in correspondingPost) {
                        correspondingPost.comments.push(newComment._id);
                    }
                    // Save the corresponding post
                    yield correspondingPost.save();
                }
            }
            // Save the updated user document
            yield newUser.save();
        }));
        // Wait for all promises to resolve
        yield Promise.all(promises);
        res.status(200).send(); // Empty response with status 200 on success
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Handle errors appropriately
    }
}));
app.use(router);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = router;
// DELETE /users - Delete all users in the DB
// app.delete("/users", async (req: Request, res: Response) => {
//   try {
//     await UserModel.deleteMany({});
//     res.sendStatus(204); // No Content
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// // DELETE /users/:userId - Delete a user with userId from DB
// app.delete("/users/:userId", async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.userId;
//     await UserModel.deleteOne({ id: userId });
//     res.sendStatus(204); // No Content
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// // GET /users/:userId - Get the specific user with userId from DB
// app.get("/users/:userId", async (req: Request, res: Response) => {
//   try {
//     const userId = req.params.userId;
//     const user = await UserModel.findOne({ id: userId });
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//     } else {
//       // You can fetch user's posts and comments here if needed
//       res.status(200).json(user);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// // PUT /users - Put a new user into the DB
// app.put("/users", async (req: Request, res: Response) => {
//   try {
//     const newUser = req.body;
//     // Check if the user already exists (you can use a unique property)
//     const existingUser = await UserModel.findOne({ id: newUser.id });
//     if (existingUser) {
//       res.status(400).json({ error: "User already exists" });
//     } else {
//       // Create and save the new user
//       const user = new UserModel(newUser);
//       await user.save();
//       res.status(201).json(user);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.use(router);
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// export default router;
