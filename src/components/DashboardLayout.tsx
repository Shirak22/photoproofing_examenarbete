import { getServerSession } from "next-auth";
import DiskUsage from "./Dashboard-components/other/DiskUsage";
import { redirect } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Clients", href: "#", current: false },
  { name: "Albums", href: "#", current: false },
];
const albums = [
  { id: 1, name: "Wedding 2023", href: "#", initial: "W", current: false },
  { id: 2, name: "Student 2023", href: "#", initial: "S", current: false },
  { id: 3, name: "Birthday party", href: "#", initial: "B", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const photographerEmail = session?.user?.email as string;

  if (!photographerEmail) {
    redirect("/login");
  }

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto  bg-gray-900 px-6 pb-4">
            <h1 className="text-2xl font-semibold text-white mt-14">
              Photoproofing
            </h1>
            <nav className="flex flex-1 flex-col ">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400"></div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {albums.map((album) => (
                      <li key={album.name}>
                        <a
                          href={album.href}
                          className={classNames(
                            album.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {album.initial}
                          </span>
                          <span className="truncate">{album.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                {photographerEmail && (
                  <li className="mt-auto">
                    <DiskUsage email={photographerEmail} />
                  </li>
                )}
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="pl-72 ">
          <main className="px-32 bg-gray-100 pb-48">{children}</main>
        </div>
      </div>
    </>
  );
}
