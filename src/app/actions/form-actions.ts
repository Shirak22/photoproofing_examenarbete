"use server"
import User from "@/services/database/models/User";
import { getServerSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import Client from "@/services/database/models/Client";
import { validateEmail } from "@/utils/helpers";
import Album from "@/services/database/models/Album";
import crypto from "crypto";
import { uploadFiles } from "@/services/S3/upload-tools";



//creating a new client in the database with the data from the form
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
      return { message: "Failed to create a client." };
    }
  }
  

//creates a new album in the database with the data from the form
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
  

//uploads the images to the S3 bucket
  export async function uploadFilesAction(
    prevState: { message: string },
    formData: FormData
  ) {
    const albumId = formData.get("albumId") as string;
    try {
      await uploadImages(formData, albumId);
      return { message: "Files uploaded successfully" };
    } catch (error) {
      console.log(error);
      return { message: "Failed!" };
    }
  }
  
  //uploads the images to the S3 bucket
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