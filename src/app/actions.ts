"use server";

import { validateEmail } from "@/utils/helpers";
import Client from "./services/database/models/Client";

export async function createClient(
  prevState: { message: string },
  formData: FormData
) {
  const data = formData;
  const photographerId = "6c8eff3b-0615-43d6-b6bb-7524512eeab0"; // Berat

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

    const newClient = new Client(client);
    // Check if client email already exists
    const clientEmailExists = await Client.findOne({
      "contact.email": data.get("email"),
    });

    const emailIsValid = validateEmail(data.get("email") as string);

    if (clientEmailExists) {
      return {
        message: `The client with email '${data.get("email")}' already exists`,
      };
    }

    if (emailIsValid) {
      await newClient.save();
      return {
        message: `The client '${data.get(
          "name"
        )}' has been created successfully `,
      };
    }
    return { message: "Invalid email!" };
  } catch (err) {
    return { message: "Failed!" };
  }
}

export async function createAlbum(
  prevState: { message: string },
  formData: FormData
) {
  const data = formData;
  try {
    console.log(data.get("title"));
    return { message: `Album "${data.get("title")}" created` };
  } catch (err) {
    return { message: "Failed!" };
  }
}
