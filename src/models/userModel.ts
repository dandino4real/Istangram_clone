import { Schema, model } from "mongoose";

export interface UserAtrributes {
  name: string;
  email: string;
  password: string;
  phone: string;
  salt: string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

export const User = model<UserAtrributes>("user", userSchema);
