"use server";

import { getImageUrl, uploadFiles } from "@/services/S3/upload-tools";
import Album from "@/services/database/models/Album";
import Client from "@/services/database/models/Client";
import Thumbnail from "@/services/database/models/Thumbnail";
import { validateEmail } from "@/utils/helpers";
import Image from "@/services/database/models/Image";
import { v4 as uuidv4 } from "uuid";
import User from "@/services/database/models/User";
import { TAlbum, TClient } from "@/core/types";
import { getServerSession } from "next-auth";
import crypto from "crypto";

export async function createClient(
  prevState: { message: string },
  formData: FormData
) {
  const getUser = await getServerSession();
  const photographer = await User.findOne({ email: getUser?.user?.email });

  // checks if the user is authenticated
  if (!getUser) return { message: "The user is not authenticated" };
  if (!photographer) return { message: "Photographer not found" };
  const photographerId = photographer.userId;

  try {
    const client = {
      clientId: uuidv4(),
      clientName: formData.get("name"),
      address: formData.get("address"),
      photographerId,
      contact: {
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
    };

    const newClient = new Client(client);

    // Check if client email already exists on this photographers clients
    // This does not apply to other photographers, meaning the same email can be used by different photographers
    const clientEmailExists = await Client.findOne({
      "contact.email": formData.get("email"),
      photographerId: photographerId,
    });

    if (clientEmailExists) {
      return {
        message: `The client with email '${formData.get(
          "email"
        )}' already exists`,
      };
    }
    const emailIsValid = validateEmail(formData.get("email") as string);

    if (!emailIsValid) {
      return { message: "Invalid email!" };
    }

    await newClient.save();

    return {
      message: `The client '${formData.get(
        "name"
      )}' has been created successfully `,
    };
  } catch (err) {
    console.log("Error:", err);
    return { message: "Failed!" };
  }
}

export async function getAllClients(photographerId: string) {
  try {
    const clients = await Client.find({ photographerId });
    return clients;
  } catch (err) {
    return { message: "Failed!" };
  }
}

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

// export interface TAlbum {
//   albumId: string,
//   clientId: string,
//   title:string,
//   description:string,
//   password:string,
//   createdDate: Date,
//   selectedLimit: number,
//   images: string[]  ,
//   confirmed: boolean,
//   proofing: boolean,
// }

export async function createAlbum(
  // MAKE SURE TO CHANGE TO CLIENTID LATER
  prevState: { message: string; clientId: string },
  formData: FormData
) {
  const album = {
    title: formData.get("title"),
    albumId: uuidv4(),
    description: formData.get("description"),
    selectedLimit: formData.get("selectedLimit"),
    noOfSelected: 0,
    proofing: Boolean(formData.get("proofing")),
    clientId: prevState.clientId,
    password: crypto.randomBytes(4).toString("hex"),
  };

  try {
    const newAlbum = new Album(album);
    await newAlbum.save();

    return { message: `Album "${formData.get("title")}" created` };
  } catch (err) {
    console.log(err);
    return { message: "Failed!" };
  }
}

export async function getAllAlbums(clientId: string) {
  try {
    const albums = await Album.find({ clientId });
    return albums;
  } catch (err) {
    return { message: "Failed!" };
  }
}

export async function getAlbum(albumId: string) {
  try {
    const album = await Album.findOne({ albumId })
      .select("-_id")
      .select("-__v");
    console.log("Album:", album);

    return album._doc;
  } catch (err) {
    return { message: "Failed!" };
  }
}

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

export async function uploadImages(formData: FormData, albumId: string) {
  let files = formData.getAll("file") as File[];

  try {
    //resizeing
    //watermarking
    await uploadFiles(files, albumId);
  } catch (error) {
    console.log(error);
  }
}

// export interface TAlbum {
//   albumId: string,
//   clientId: string,
//   title:string,
//   description:string,
//   password:string,
//   createdDate: Date,
//   selectedLimit: number,
//   images: string[]  ,
//   confirmed: boolean,
//   proofing: boolean,
//   albumUrl: string,
// }

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

export async function getImage(imageId: string) {
  try {
    const imageFromDb = await Image.findOne({ imageId });
    if (!imageFromDb) return null;
    const image = {
      imageId: imageFromDb.imageId,
      selected: imageFromDb.selected,
      path: await getImageUrl(imageFromDb.path),
    };

    return image;
  } catch (error) {
    console.log(error);
  }
}

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
