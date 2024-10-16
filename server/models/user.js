import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  likedPosts: {
    type: [String],
    default: [],
    required: false 
  },
  shoppingList: {
    type: [String],
    default: [],
    required: false 
  },
  id: { type: String },
});

export default mongoose.model("User", userSchema);