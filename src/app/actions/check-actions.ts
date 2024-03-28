"use server";

import Album from "@/services/database/models/Album";
import Client from "@/services/database/models/Client";

//this action takes the path segments and checks if the client and album exist in the database and returns the name of the client and album
export async function BreadcrumbsNameCheck(pathSegments: string[]) {
    try {
      if (pathSegments.length === 0) return null;
      const client = await Client.findOne({ clientId: pathSegments[0] });
      const album = await Album.findOne({ albumId: pathSegments[1] });
      let path = [];
  
      if (client) {
        path.push({
          name: client.clientName,
          href: `/dashboard/${client.clientId}`,
        });
      }
      if (album) {
        path.push({
          name: album.title,
          href: `/dashboard/${client.clientId}/${album.albumId}`,
        });
      }
  
      return path;
    } catch (error) {
      console.log(error);
    }
  }
  

  //this action checks if the selected image is within the selected limit and updates the number of selected images in the database
  export async function checkSelectedMaxLimitInDB(
    albumId: string,
    selected: boolean
  ) {
    try {
      const album = await Album.findOne({ albumId });
  
      if (album.noOfSelected > 0 && selected === false) {
        album.noOfSelected -= 1;
        await album.save();
        return false;
      } else if (
        album.noOfSelected === album.selectedLimit &&
        selected === true
      ) {
        return true;
      } else {
        album.noOfSelected += 1;
        await album.save();
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  