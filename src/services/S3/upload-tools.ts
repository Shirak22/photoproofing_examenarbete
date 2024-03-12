import { TImage } from "@/core/types";
import { PutObjectCommand, S3Client   } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import Image from "../database/models/Image";

interface TS3Client  {
    region: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    }
}

const s3  = new S3Client({
    region : process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY ,
        secretAccessKey: process.env.AWS_SECRET_KEY 
    } 
} as TS3Client);


export async function uploadFilesToS3(files : File[], albumId: string) {
       try {
        const uploadPromises = Array.from(files).map(async (file) => {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            
            const databaseFileInfo : TImage = {
                imageId: uuidv4(),
                albumId,
                readableTitle: file.name,
                size: file.size,
                extension: file.type,
                createdDate: new Date(file.lastModified),
                uploadDate: new Date(),
            } 

            try {
                const image = new Image(databaseFileInfo); 
                await image.save();
                console.log("image has been saved successfuly! ",image);
                
            } catch (error) {
                console.log("Something went wrong and we could not save to database",error);
                return 
            }
           

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: databaseFileInfo.imageId,
                Body: fileBuffer,
            };
            
            
            const data = await s3.send(new PutObjectCommand(params));
            
            return data;
        });

        const result = await Promise.all(uploadPromises);
        return result;

       } catch (error) {
        console.log(error);
        
       } 
}


