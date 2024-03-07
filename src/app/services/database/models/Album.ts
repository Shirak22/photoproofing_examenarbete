import { TAlbum } from "@/app/core/types";
import {Schema,model, models} from "mongoose";
import  {v4 as uuidv4}  from "uuid"; 


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
  images: [{
    type: String,
    required: true,
  }],
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
    
});

const Album = models.Album || model('Album', albumSchema);



export default Album;
