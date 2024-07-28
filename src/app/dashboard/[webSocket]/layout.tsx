"use client";
import { useSession, getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { number } from "zod";
import { useRouter } from "next/navigation";
interface data {
  id: number;
  email: string;
  password: string;
}
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [data, setData] = useState<data[]>([]);
  const userList = async () => {
    try {
      const dat = await fetch("/api/getUsers");
      const users = await dat.json();
      setData(users.data.rows);
    } catch (err) {
      console.log("error has occured " + err);
    }
  };
  useEffect(() => {
    userList();
  }, []);
  console.log(data);
  function chat(email: string) {
    router.push(`/dashboard/webSocket?to=${email}`);
  }
  return (
    <div className="page flex flex-row flex-wrap">
      <div className=" h-screen w-1/4  ">
        <h1 className="ml-[22px] font-bold text-[20px]">Your friends: </h1>
        <div className="flex flex-col gap-3">
          {data.map((item) => {
            return (
              <div
                className=" border-[1.5px]  border-solid border-black rounded-lg min-w-[280px] mr-[20px] ml-[20px] mt-[30px] px-[10px] pt-[12px] h-[60px]  "
                key={item.id}
                id="friends"
                onClick={() => {
                  chat(item.email);
                }}
              >
                {item.id}: {item.email}
              </div>
            );
          })}
        </div>
      </div>
      <div className=" w-3/4">{children}</div>
    </div>
  );
}
