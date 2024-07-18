"use client"


import { useSession, getSession } from "next-auth/react"
import { redirect } from "next/navigation";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    redirect('/auth/login');
  }
  return (
    <div>
  

      <div>{children}</div>
    </div>
  );}



