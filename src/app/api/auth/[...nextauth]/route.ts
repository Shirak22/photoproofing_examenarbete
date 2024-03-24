// import NextAuth from "next-auth";
 import authOptions from "@/core/authOptions/authOptions";
import NextAuth from "next-auth/next";


export const  handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
