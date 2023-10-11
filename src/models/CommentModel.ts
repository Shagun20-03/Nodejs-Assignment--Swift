import mongoose, { Document, Schema } from "mongoose";

// Define the schema for a comment
const CommentSchema = new Schema({
  id: Number,
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  name: String,
  email: String,
  body: String,
});

// Define the Comment interface extending Document for type checking
export interface IComment extends Document {
  id: number;
  postId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  body: string;
}

// Create and export the Comment model
export default mongoose.model<IComment>("Comment", CommentSchema);
