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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Hello World</h1>
      <NewClientForm />
      {/* <NewAlbumForm /> */}
    </main>
  );
}
