import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { TImage } from "@/core/types/types";

const imageSchema = new Schema<TImage>({
  imageId: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  albumId: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  readableTitle: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  extension: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  
});

imageSchema.pre("save",function(next){
  this.createdDate = new Date();
  next();
}); 

const Image = models.Image || model("Image", imageSchema);

export default Image;
