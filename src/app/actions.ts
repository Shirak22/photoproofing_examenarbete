"use server";

import {  uploadFiles } from "@/services/S3/upload-tools";
import Album from "@/services/database/models/Album";
import Client from "@/services/database/models/Client";
import { validateEmail } from "@/utils/helpers";
import { log } from "console";
import { useParams } from "next/navigation";

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
      "photographerId": photographerId
    });

    if (clientEmailExists ) {
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
    description: formData.get("description"),
    selectedLimit: formData.get("selectedLimit"),
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



export async function uploadImages(
  formData: FormData,
  albumId: string
) {
  let files =  formData.getAll("file") as File[]; 

  try {
    //resizeing 
    //watermarking
    await uploadFiles(files, albumId);
    
  } catch (error) {
    console.log(error);
    
  }
}