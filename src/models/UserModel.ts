import mongoose, { Document, Schema } from 'mongoose';

// Define the schema for a user
const UserSchema = new mongoose.Schema({
  // id: Number,
  id: String,
  name: String,
  username: String,
  email: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Reference to posts
});

// Define the User interface extending Document
export interface IUser extends Document {
  // id: number;
  id: string,
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
 
  posts: mongoose.Types.ObjectId[];
}

// Create and export the User model
export default mongoose.model<IUser>('User', UserSchema);
