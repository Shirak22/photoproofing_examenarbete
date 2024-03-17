// import NextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPhotographer } from "@/app/actions";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // Display name on the sign in form (e.g. "Sign in with [name]")
      name: "Email",
      // `credentials` is used to generate a form on the sign in page.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      // Authorize function to validate credentials and return a user
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Gets the photographer with the given email from the database
        const photographer = await getPhotographer(email);

        // Check if the photographer exists in the database
        if (photographer) {
          // Create a user object to be returned
          const user = {
            id: photographer.userId,
            email: photographer.email,
            name: photographer.userName,
          };

          // Password check
          if (user && photographer.password === password) {
            return user;
          }
        }

        // If no user is found, return null
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/signout",
    // error: "/login-error",
    // newUser: "/new-user",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
