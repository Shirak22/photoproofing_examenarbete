import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAlbum, getPhotographer } from "@/app/actions";
import { AuthOptions } from "next-auth";


export const authOptions : AuthOptions  = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        id: "Dashboard Login",
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
      CredentialsProvider({
        // New credentials provider for password-only authentication
        id: "Client Login",
        name: "Client Password",
  
        credentials: {
          password: { label: "Password", type: "password" },
          albumId: { label: "Album ID", type: "text" }, 
        },
    
        async authorize(credentials, req) {
          const {albumId, password } = credentials as {
            password: string;
            albumId: string;
          };
  
          // Get the album from the database
          const album = await getAlbum(albumId);
          if(album && password === album.password){
            return {id: albumId, name: albumId};
          }else {
            return null;
          }
        },
      }),
      
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
    ],
    pages: {
       signIn: "/login",
       //signOut: "/signout",
        // error: "/login-error",
      // newUser: "/new-user",
    },
    
  };
  