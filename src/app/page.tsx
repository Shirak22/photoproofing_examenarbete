import NewClientForm from "@/components/NewClientForm";
import SignInButton from "@/components/LoginNavBar";
import { getServerSession } from "next-auth";
import AuthSignIn from "./auth/signin/page";
import { redirect } from "next/navigation";
import { getPhotographer } from "./actions";

export default async function Home() {
  // const session = await getServerSession();

  // if (!session) {
  //   return <AuthSignIn />;
  // }

  // redirect("/dashboard");
  return <h1 className="text-7xl">HOME PAGE</h1>;
}
