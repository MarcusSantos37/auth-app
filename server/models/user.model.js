import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String },
  },
  {
    collection: "user-data",
  }
);

const User = mongoose.model("UserData", UserSchema);

export default User;
