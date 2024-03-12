import { TAlbum } from "@/core/types";
import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const albumSchema = new Schema<TAlbum>({
  albumId: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  selectedLimit: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
  proofing: {
    type: Boolean,
    default: true,
    required: true,
  },
  albumUrl: {
    type: String,
    default: "",
  },
});

albumSchema.pre("save", function (next) {
  this.albumId = uuidv4();
  this.albumUrl = `/client/${this.albumId}`
  next();
});

const Album = models.Album || model("Album", albumSchema);

export default Album;
