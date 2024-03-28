import { Schema, model, models } from "mongoose";
import { TThumbnail } from "@/core/types/types";

const thumbnailSchema = new Schema<TThumbnail>({
  imageId: {
    type: String,
    required: true,
  },
  albumId: {
    type: String,
    required: true,
  },

  size: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const Thumbnail = models.Thumbnail || model("Thumbnail", thumbnailSchema);

export default Thumbnail;
