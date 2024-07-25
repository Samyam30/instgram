"use client";

import LeftBar from "@/components/dashboard/leftBar/LeftBar";
import { useSession, getSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    redirect("/auth/login");
  }
  return (
    <div>
      <div className="left bg-white h-screen flex flex-column justify-between  border-r-solid border-r-[1.5px] border-r-stone-500 fixed">
        <LeftBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
