"use client";
import { useEffect, useState } from "react";
import { number } from "zod";
import WebSocket from "@/app/dashboard/[webSocket]/page";
import { useRouter } from "next/navigation";
interface data {
  id: number;
  email: string;
  password: string;
}
export default function ListOfUsers() {
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
    <div className="page">
      this is list of users
      {data.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => {
              chat(item.email);
            }}
          >
            {item.id}: {item.email}
          </div>
        );
      })}
      Want to send messages???
    </div>
  );
}
