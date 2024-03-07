import {Schema,model, models} from "mongoose";
import  {v4 as uuidv4}  from "uuid"; 
import { TImage } from "@/app/core/types";


const imageSchema = new Schema<TImage>({
    imageId: {
        type: String,
        default:uuidv4(),
        required: true,
    },
    albumId: {
        type: String,
        required: true,
    },
    uploadDate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    createdDate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size:{
        type: Number,
        required: true,
    },
    readableTitle:{
        type: String,
        required: true,
    },
    selected:{
        type: Boolean,
        default: false,
        required: true,
    },
    extension:{
        type: String,
        required: true,
    }
});

const Image = models.Image || model('Image', imageSchema);



export default Image;
