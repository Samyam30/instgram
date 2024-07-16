import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/header/Navbar';
import  SessionProvider  from '@/components/auth/Provider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOption';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en' className="-p-2">
      <body >
        <SessionProvider session={session}>
          <div className='max-w-6xl mx-auto'>
            <NavBar />
            <main className='my-4'>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
