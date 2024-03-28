import Jimp from "jimp";
import { checkMimeType } from "../S3/upload-tools";

export async function createThumbnail(file: File) {
  if (file.size === 0) throw new Error("No files to upload");

  //validate file type
  checkMimeType(file);

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  let resizedImage = await Jimp.read(fileBuffer);
  resizedImage.resize(300, Jimp.AUTO).quality(60);

  const thumbnail = await resizedImage.getBufferAsync(file.type);

  const updatedFile = new File([thumbnail], file.name, { type: file.type });
  return updatedFile;
}