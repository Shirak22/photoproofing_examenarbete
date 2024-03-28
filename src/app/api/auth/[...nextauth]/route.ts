
import authOptions from "@/core/authOptions/authOptions";
import NextAuth from "next-auth/next";
//the handler is the function that will be called when the NextAuth api is hit
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
