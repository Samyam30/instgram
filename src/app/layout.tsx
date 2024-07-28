import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Headerq from "@/components/header/header";
import SessionProvider from "@/components/auth/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOption";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="-p-2">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body>
        <SessionProvider session={session}>
          {/* <Headerq /> */}
          <main className="my-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
