import { connectToDB } from "../app/services/database/db";
import User from "../app/services/database/models/User";
import Album from "../app/services/database/models/Album";
import Image from "../app/services/database/models/Image";
import { TAlbum, TClient, TImage, TUser } from "./core/types";
import Client from "./services/database/models/Client";
import NewClientForm from "./components/NewClientForm";
import NewAlbumForm from "./components/NewAlbumForm";
connectToDB();

export default async function Home() {
  // const photographer: TUser = await User.create({
  //   userName: "Shirak",
  //   role: "photographer",
  //   storageLimit: 1000,
  //   companyName: "Berat Photography",
  //   address: "123 Main St",
  //   usedStorage: 50,
  // });

  // const album: TAlbum = await Album.create({
  //   clientId: "33821903892djwiadjwioa321",
  //   title: "Wedding Berat",
  //   description: "Wedding photos of Berat",
  //   password: "berat123",
  //   selectedLimit: 100,
  //   images: [],
  // });

  // const client: TClient = await Client.create({
  //   clientName: "Berat",
  //   address: "123 Main St",
  //   photographerId: photographer.userId,
  //   Albums: [album.albumId],
  //   contact: {
  //     email: "berat@itsberat.se",
  //     phone: "123-456-7890",
  //   },
  // });

  // const image: TImage = await Image.create({
  //   albumId: album.albumId,
  //   path: "images/berat-wedding/berat-wedding-42.jpg",
  //   size: 40,
  //   readableTitle: "Portrait 42",
  //   extension: "jpg",
  // });

  // console.log(photographer);
  // console.log(client);
  // console.log(album);
  // console.log(image);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Hello World</h1>
      {/* <NewClientForm /> */}
      <NewAlbumForm />
    </main>
  );
}
