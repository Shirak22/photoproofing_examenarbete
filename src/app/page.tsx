import NewClientForm from "@/components/NewClientForm";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Hello World</h1>
      <NewClientForm />
      {/* <NewAlbumForm /> */}
    </main>
  );
}
