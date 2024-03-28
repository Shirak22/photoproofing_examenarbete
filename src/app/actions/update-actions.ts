"use server";

import Album from "@/services/database/models/Album";
import Image from "@/services/database/models/Image";
import { checkSelectedMaxLimitInDB } from "./check-actions";



//this action updates the selected status of an image in the database
export async function updateSelectedImage(imageId: string, selected: boolean) {
  try {
    const image = await Image.findOne({
      imageId,
    })
      .select("selected")
      .select("albumId");

    if (await checkSelectedMaxLimitInDB(image.albumId, selected)) {
      return { message: "Max limit reached" };
    }

    image.selected = selected;

    await image.save();
  } catch (error) {
    console.log(error);
  }
}



//this action updates the album selection status in the database
export async function confirmAlbumSelection(albumId: string) {
  try {
    const album = await Album.findOne({ albumId });
    album.confirmed = true;
    await album.save();
  } catch (error) {
    console.log(error);
  }
}
