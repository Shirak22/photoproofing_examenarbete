import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectToDB } from "@/services/database/db";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { GlobalContextProvider } from "./context/store";
connectToDB();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo proofing app",
  description: "Share your images with your clients and get feedback",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <GlobalContextProvider>
            {children}
            {modal}
          </GlobalContextProvider>
          {/* <LoginNavBar />  Handles login */}
        </SessionProvider>
      </body>
    </html>
  );
}
