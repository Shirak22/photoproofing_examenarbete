"use server";
import Image from "@/services/database/models/Image";
import User from "@/services/database/models/User";
import { TAlbum, TClient } from "@/core/types/types";
import { getAllAlbums, getAllClients } from "./get-actions";



//this action calculates the disk usage of the photographer and updates the used storage in the database
export async function calcDiskUsage(photographerId: string) {
    let diskUsage = 0;
    try {
      const clients = (await getAllClients(photographerId)) as TClient[];
      for (const client of clients) {
        const albums = (await getAllAlbums(client.clientId)) as TAlbum[];
        for (const album of albums) {
          const images = await Image.find({ albumId: album.albumId });
          for (const image of images) {
            diskUsage += image.size;
          }
        }
      }
      const photographer = await User.findOne({ userId: photographerId });
      const diskUsageinMB = diskUsage / 1000000;
      const diskUsageInMbOrGb =
        diskUsageinMB > 999
          ? (diskUsage / 1000000000).toFixed(2) + "GB"
          : diskUsageinMB.toFixed(2) + "MB";
  
      if (photographer.usedStorage !== diskUsageinMB) {
        photographer.usedStorage = diskUsageinMB; // in MB
        await photographer.save();
      }
  
      return diskUsageInMbOrGb;
    } catch (error) {
      console.log(error);
    }
  }
  
  //this action calculates the disk usage of the album and returns the disk usage in MB or GB
  export async function calcAlbumDiskUsage(albumId: string) {
    let diskUsage = 0;
    try {
      const images = await Image.find({ albumId });
      for (const image of images) {
        diskUsage += image.size;
      }
      return diskUsage / 1000000 > 999
        ? (diskUsage / 1000000000).toFixed(2) + "GB"
        : (diskUsage / 1000000).toFixed(2) + "MB";
    } catch (error) {
      console.log(error);
    }
  }
  