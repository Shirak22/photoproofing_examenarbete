"use server";

import { getImageUrl, uploadFiles } from "@/services/S3/upload-tools";
import Album from "@/services/database/models/Album";
import Client from "@/services/database/models/Client";
import Thumbnail from "@/services/database/models/Thumbnail";
import { validateEmail } from "@/utils/helpers";
import Image from "@/services/database/models/Image";
import { v4 as uuidv4 } from "uuid";
import User from "@/services/database/models/User";
export async function createClient(
  prevState: { message: string },
  formData: FormData
) {
  const data = formData;
  const photographerId = "6c8eff3b-0615-43d6-b6bb-7524512e45fd"; // Berat
  console.log("Formdata:", data.get("name"));

  try {
    const client = {
      clientName: data.get("name"),
      address: data.get("address"),
      photographerId,
      contact: {
        email: data.get("email"),
        phone: data.get("phone"),
      },
    };

    console.log("Client:", client);

    const newClient = new Client(client);

    // Check if client email already exists on this photographers clients
    // This does not apply to other photographers, meaning the same email can be used by different photographers
    const clientEmailExists = await Client.findOne({
      "contact.email": data.get("email"),
      photographerId: photographerId,
    });

    if (clientEmailExists) {
      return {
        message: `The client with email '${data.get("email")}' already exists`,
      };
    }
    const emailIsValid = validateEmail(data.get("email") as string);

    if (!emailIsValid) {
      return { message: "Invalid email!" };
    }

    await newClient.save();

    return {
      message: `The client '${data.get(
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
    const client = await Client.findOne({ clientId });
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
  const data = formData;

  const album = {
    title: formData.get("title"),
    albumId: uuidv4(),
    description: formData.get("description"),
    selectedLimit: formData.get("selectedLimit"),
    noOfSelected: 0,
    proofing: Boolean(formData.get("proofing")),
    clientId: prevState.clientId,
    password: "1234",
  };

  console.log("Album:", album);

  try {
    console.log(data.get("title"));
    const newAlbum = new Album(album);
    await newAlbum.save();

    return { message: `Album "${data.get("title")}" created` };
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
    const album = await Album.findOne({ albumId });
    return album;
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
      throw new Error("Photographer not found in DB");
    }

    return photographer._doc;
  } catch (error) {
    console.log(error);
  }
}
