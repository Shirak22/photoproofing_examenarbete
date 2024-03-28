import ClientTableSSR from "@/components/Dashboard-components/tables/ClientTableSSR";
import { getServerSession } from "next-auth";
import { getAllAlbums, getAllClients, getPhotographer } from "../actions/get-actions";

interface Stat {
  name: string;
  value: string;
  stat?: string;
}
export default async function Dashboard(
  
) {
  const session = await getServerSession();
  const email =  session?.user?.email;
 const stats: Stat[] = [];

  try {
    const photographer = await getPhotographer(email as string) ; 
    const clients = await getAllClients(photographer.userId as string);
    const albumsInfo = [];

    for (let i = 0; i < clients.length; i++) {
      const albums = await getAllAlbums(clients[i].clientId as string);
      albumsInfo.push(albums);
    }

    stats.push(
      {
        name: "Total Clients",
        value: clients.length.toString(),
        
      },
      {
        name: "Total Albums",
        value: albumsInfo.flat().length.toString(),
      },
      {
        name: "Total confirmed Albums",
        value: albumsInfo.flat().filter((album) => album.confirmed).length.toString(),
      },
      {
        name: "Total proofing Albums",
        value: albumsInfo.flat().filter((album) => album.proofing).length.toString(),
      }
    );
    
    

  } catch (error) {
      console.log(error);
      
  }
 
  
  return (
    <>
      <div className="grid grid-cols-2 mt-12 mb-6 gap-6">
        <div className="p-24 bg-white rounded-2xl">
          <h1 className="text-2xl font-bold ">
            Welcome,
            <span className="block text-8xl">{session?.user?.name}</span>
          </h1>
          <p className="text-base text-gray-500 mt-4">
            Manage your clients and albums easy with our dashboard tools. Get a
            quick overview of your stats and start working on your next project.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className=" bg-white px-4 py-6 sm:px-6 lg:px-8 rounded-2xl flex flex-col gap-8"
            >
              <p className="text-sm font-medium leading-6 text-gray-600">
                {stat.name}
              </p>
              <p className=" flex items-baseline gap-x-4 mt-auto ">
                <span className="text-6xl font-semibold tracking-tight text-gray-800">
                  {stat.value}
                </span>
                {stat.stat ? (
                  <span className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-100 bg-green-50">
                    <svg
                      className="h-2 w-2 fill-green-500"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {stat.stat}
                  </span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ClientTableSSR />
    </>
  );
}
