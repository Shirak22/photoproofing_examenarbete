import { TClient } from "@/app/core/types";
import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const clientSchema = new Schema<TClient>({
  clientId: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photographerId: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  Albums: [
    {
      type: String,
      required: true,
    },
  ],
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
});

clientSchema.pre("save", function (next) {
  this.clientId = uuidv4();
  next();
});

const Client = models.Client || model("Client", clientSchema);

export default Client;
