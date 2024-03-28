"use server";

import { getImageUrl } from "@/services/S3/upload-tools";
import Album from "@/services/database/models/Album";
import Client from "@/services/database/models/Client";
import Thumbnail from "@/services/database/models/Thumbnail";
import Image from "@/services/database/models/Image";
import User from "@/services/database/models/User";
import { TAlbum, TClient } from "@/core/types/types";


//get all clients in the database with the photographerId
export async function getAllClients(
    photographerId: string
  ): Promise<TClient[] | any> {
    try {
      const clients = await Client.find({ photographerId });
      return clients;
    } catch (err) {
      return { message: "Failed!" };
    }
  }

  //get client from the database with the clientId
  export async function getClient(clientId: string) {
    try {
      const client = await Client.findOne({ clientId })
        .select("-_id")
        .select("-__v");
      return client;
    } catch (err) {
      return { message: "Failed!" };
    }
  }
  
  //get all albums in the database with the clientId
  export async function getAllAlbums(clientId: string): Promise<TAlbum[] | any> {
    try {
      const albums = await Album.find({ clientId });
      return albums;
    } catch (err) {
      return { message: "Failed!" };
    }
  }

  //get album from the database with the albumId
  export async function getAlbum(albumId: string) {
    try {
      const album = await Album.findOne({ albumId })
        .select("-_id")
        .select("-__v");
  
      return album._doc;
    } catch (err) {
      return { message: "Failed!" };
    }
  }


//get all thumbnails in an album from the database with the image path in the S3 bucket
export async function getAlbumThumbnails(albumId: string) {
    try {
      const images = await Thumbnail.find({ albumId })
        .select("path")
        .select("imageId");
      if (!images || images.length === 0) return;
  
      const ImagePromises = Promise.all(
        images.map(async (image) => {
          const getImageData = await Image.findOne({
            imageId: image.imageId,
          })
            .select("-path")
            .select("-imageId")
            .select("-_id")
            .select("-__v");
  
          const imageInfo = {
            imageId: image.imageId,
            path: await getImageUrl(image.path),
            ...getImageData._doc,
          };
  
          return imageInfo;
        })
      );
  
      return ImagePromises;
    } catch (error) {
      console.log(error);
    }
  }
  
  //get image from the database and retrieve the image path from the S3 bucket with other properties
  export async function getImage(imageId: string) {
    try {
      const imageFromDb = await Image.findOne({ imageId });
      if (!imageFromDb) return null;
      const image = {
        imageId: imageFromDb.imageId,
        albumId: imageFromDb.albumId,
        readableTitle: imageFromDb.readableTitle,
        selected: imageFromDb.selected,
        path: await getImageUrl(imageFromDb.path),
      };
  
      return image;
    } catch (error) {
      console.log(error);
    }
  }
  //get photographer by email from the database to use it in the login action
  export async function getPhotographer(email: string) {
    try {
      const photographer = await User.findOne({ email });
  
      if (!photographer) {
        return { message: "Photographer not found in DB" };
      }
  
      return photographer._doc;
    } catch (error) {
      console.log(error);
    }
  }
  
  //get photographer by id from the database
  export async function getPhotographerById(id: string) {
    try {
      const photographer = await User.findOne({ userId: id });
  
      if (!photographer) {
        return { message: "Photographer not found in DB" };
      }
  
      return photographer._doc;
    } catch (error) {
      console.log(error);
    }
  }
  
  //get all images in an album from the database
  export async function getAllImages(albumId: string) {
    try {
      const images = await Image.find({ albumId }).select("-_id").select("-__v");
  
      return images;
    } catch (error) {
      console.log(error);
    }
  }
  