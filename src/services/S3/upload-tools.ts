import { TImage, TThumbnail } from "@/core/types/types";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import Image from "../database/models/Image";
import Thumbnail from "../database/models/Thumbnail";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createThumbnail } from "../image-manipulation/create-thumbnails";
import { getAlbum, getClient } from "@/app/actions/get-actions";
import { createWatermark } from "../image-manipulation/create-watermark";




interface TS3Client {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
} as TS3Client);


//upload image to s3
export async function uploadToS3(key: string, fileBuffer: Buffer) {
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

export async function pushImageToDatabase(file: TImage) {
  try {
    const image = new Image(file);
    await image.save();
    
  } catch (error) {
    console.log(
      "Something went wrong and we could not save the image to database",
      error
    );
    return;
  }
}

export async function pushThumbnailToDatabase(file: TThumbnail) {
  try {
    const thumbnail = new Thumbnail(file);
    await thumbnail.save();
  } catch (error) {
    console.log(
      "Something went wrong and we could not save the Thumbnail to database",
      error
    );
    return;
  }
}



//upload multiple files to s3 and save them to database after creating thumbnails and watermarks
export async function uploadFiles(
  files: File[],
  albumId: string,
) {
  try {
    if (files[0].size === 0) throw new Error("No files to upload");

    const uploadPromises = Array.from(files).map(async (file) => {
      checkMimeType(file); // Validate file type

      const thumbnail = await createThumbnail(file); // thumbnail file
      const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer());

      const imageId = uuidv4();

      const fileBuffer = Buffer.from(await file.arrayBuffer()); // Original file
      const album = await getAlbum(albumId);
      const client = await getClient(album.clientId);

      // Creating the Image object for the database
      const databaseFileInfo: TImage = {
        imageId,
        albumId,
        readableTitle: file.name,
        size: file.size,
        extension: file.type,
        createdDate: new Date(file.lastModified),
        uploadDate: new Date(),
        path: `${client.photographerId}/${client.clientName}/${
          album.title
        }/${imageId}.${file.type.replace("image/", "")}`,
      };

      // Creating the Thumbnail object for the database
      const databaseThumbnailInfo: TThumbnail = {
        imageId,
        albumId,
        size: thumbnail.size,
        path: `${client.photographerId}/${client.clientName}/${
          album.title
        }/thumbnails/${imageId}.${file.type.replace("image/", "")}`,
      };
      let watermarked = fileBuffer;
      if (album.proofing) {
        watermarked = await createWatermark(fileBuffer, client.photographerId);
      }
      await pushThumbnailToDatabase(databaseThumbnailInfo);
      await pushImageToDatabase(databaseFileInfo);

      await uploadToS3(`${databaseThumbnailInfo.path}`, thumbnailBuffer);

      return await uploadToS3(`${databaseFileInfo.path}`, watermarked);
    });

    const result = await Promise.all(uploadPromises);
    return result;
  } catch (error) {
    console.log(error);
  }
}



export function checkMimeType(file: File) {
  if (
    file.type !== "image/jpg" &&
    file.type !== "image/jpeg" &&
    file.type !== "image/png"
  )
    throw new Error("Invalid file type");
}

export async function getImageUrl(filepath: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filepath,
  };

  try {
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.log("Failed to get image url", error);
  }
}

