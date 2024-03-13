import { TImage, TThumbnail } from "@/core/types";
import { PutObjectCommand, S3Client   } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import Image from "../database/models/Image";
import { getAlbum, getClient } from "@/app/actions";
import Jimp from "jimp";
import Thumbnail from "../database/models/Thumbnail";



//storage usage
//file input validation on server and client side
//error handling
//ui progress bar
//watermark images
//image compression
//extension validation

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



export async function uploadToS3(key: string, fileBuffer: Buffer){
    try {
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: fileBuffer,
        };
        
        
        const data = await s3.send(new PutObjectCommand(params));
        
        return data;
    } catch (error) {
        console.log("faild to upload to S3 ", error);
    }
}

export async function pushImageToDatabase(file: TImage, ){
       
        try {
            const image = new Image(file); 
            await image.save();
            console.log("image has been saved successfuly! ",image);
            
        } catch (error) {
            console.log("Something went wrong and we could not save the image to database",error);
            return 
        }


}
export async function pushThumbnailToDatabase(file: TThumbnail ){
       
    try {
        const thumbnail = new Thumbnail(file); 
        await thumbnail.save();
        console.log("thumbnail has been saved successfuly! ", thumbnail);
        
    } catch (error) {
        console.log("Something went wrong and we could not save the Thumbnail to database",error);
        return 
    }


}

export async function uploadFiles(files : File[], albumId: string,thumbnails: boolean = false, watermark: boolean = false){
    
    try {
        if(files[0].size === 0 ) throw new Error("No files to upload"); 

        const uploadPromises = Array.from(files).map(async (file) => {
            
            
            checkMimeType(file); // Validate file type
            
            const thumbnail  = await createThumbnail(file); // thumbnail file
            const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());
            
            const imageId = uuidv4();
            
            const fileBuffer = Buffer.from(await file.arrayBuffer()); // Original file
            const album = await  getAlbum(albumId);
            const client = await  getClient(album.clientId);

            // Creating the Image object for the database
            const databaseFileInfo : TImage = {
                imageId,
                albumId,
                readableTitle: file.name,
                size: file.size,
                extension: file.type,
                createdDate: new Date(file.lastModified),
                uploadDate: new Date(),
                path: `${client.photographerId}/${client.clientName}/${album.title}/${imageId}} `
            }

            // Creating the Thumbnail object for the database
            const databaseThumbnailInfo : TThumbnail  = {
                imageId,
                albumId,
                size: thumbnail.size,
                path: `${client.photographerId}/${client.clientName}/${album.title}/thumbnails/${imageId}} `
            }; 

            await pushThumbnailToDatabase(databaseThumbnailInfo); 
            await pushImageToDatabase(databaseFileInfo);

           
            await uploadToS3(`${client.photographerId}/${client.clientName}/${album.title}/thumbnails/${imageId}.${file.type.replace('image/','')}`, thumbnailBuffer);
            

            return await uploadToS3(`${client.photographerId}/${client.clientName}/${album.title}/${imageId}.${file.type.replace('image/','')} `, fileBuffer);

        });

        const result = await Promise.all(uploadPromises);
        return result;

    } catch (error) {
        console.log(error );
    }
}


// export async function createThumbnails(files : File[]){
//          console.log("create thumbnails FILES", files);
//         if( files[0].size === 0 ) throw new Error("No files to upload");
        
        
//     //create thumbnails
//     const uploadPromises = Array.from(files).map(async (file) => {
        
//         //validate file type
//         checkMimeType(file); 

//         const fileBuffer = Buffer.from(await file.arrayBuffer());

//         let resizedImage = await Jimp.read(fileBuffer);
//          resizedImage.resize(300, Jimp.AUTO).quality(60);

//         const thumbnail = await resizedImage.getBufferAsync(file.type);

//         const updatedFile = new File([thumbnail], file.name, { type: file.type });

//         return updatedFile
//         //create thumbnail
//         //upload to s3
//     });

//     const result = await Promise.all(uploadPromises);
//     return result;
//     //upload to s3
//     //save to database
//     //return
// }

export async function createThumbnail(file : File){
    console.log("create thumbnail FILE", file);
   if( file.size === 0 ) throw new Error("No files to upload");

   //validate file type
   checkMimeType(file); 

   const fileBuffer = Buffer.from(await file.arrayBuffer());

   let resizedImage = await Jimp.read(fileBuffer);
    resizedImage.resize(300, Jimp.AUTO).quality(60);

   const thumbnail = await resizedImage.getBufferAsync(file.type);
   const updatedFile = new File([thumbnail], file.name, { type: file.type });
   return updatedFile

}


export function checkMimeType(file: File){
    if(file.type !== "image/jpg" && file.type !== "image/jpeg" && file.type !== "image/png") throw new Error("Invalid file type");
}
