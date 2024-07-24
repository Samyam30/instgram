"use client";
import { useSession, signIn } from "next-auth/react";
import SignInButton from "./signinButton";
import SignOutButton from "./signoutButton";
import { Button } from "../ui/button";
import Link from "next/link";
import Story from "../dashboard/story";
import { number } from "zod";
import { useEffect, useState } from "react";
import story from "../dashboard/story";
interface story {
  id: any;
  iamge: string;
  email: string;
  created_at: string;
}
export default function StroryDisp() {
  const { data: session, status } = useSession();
  const [storyData, setStoryData] = useState<story[]>([]);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<string>("bg-pink-400");
  function handleCss(): void {
    if (style == "bg-pink-400") setStyle("bg-zinc-200");
  }
  useEffect(() => {
    const callStory = async () => {
      try {
        const data = await fetch("/api/dashboard/story/getStory");
        const dat1 = await data.json();
        setStoryData(dat1.data.rows);
      } catch (err) {
        console.error("Error in fetching story " + err);
      }
    };
    callStory();
  }, []);
  console.log(storyData);

  return (
    <div className="flex justify-center items-center">
      <div className=" storyBar flex flex-row w-4/5 rounded-lg  bg-white h-[100px] border-1 border-solid border-zinc-200  mb-6 mt-10 overflow-scroll no-scrollbar flex-auto">
        {storyData &&
          storyData.map((item) => (
            <Story
              key={item.id}
              propArray={item}
              open={open}
              setOpen={setOpen}
              style={style}
              handleCss={handleCss}
            />
          ))}
      </div>
    </div>
  );
}
