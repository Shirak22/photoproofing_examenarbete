import { TUser } from "@/core/types";
import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema<TUser>({
  userId: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  joindDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  storageLimit: {
    type: Number,
    required: true,
  },
  usedStorage: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
