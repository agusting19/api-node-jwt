import { Schema, model } from "mongoose";
import { UserInterface } from "types/User.types";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

export default model<UserInterface>("User", UserSchema);
