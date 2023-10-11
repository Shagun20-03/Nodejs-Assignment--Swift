import mongoose, { Document, Schema, Types } from "mongoose";
import { IComment } from "./CommentModel"; // Import the Comment model

// Define the schema for a post
const PostSchema = new Schema({
  id: Number,
  title: String,
  body: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Reference to comments
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

// Define the Post interface extending Document
export interface IPost extends Document {
  id: number;
  title: string;
  body: string;
  comments: mongoose.Types.ObjectId[];
  userId: mongoose.Types.ObjectId;
}

// Create and export the Post model
export default mongoose.model<IPost>("Post", PostSchema);
