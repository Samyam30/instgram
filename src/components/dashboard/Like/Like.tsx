"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import like1 from "@/components/images/like.png";
import liked from "@/components/images/liked.png";
interface lik {
  email: string;
  photo_id: any;
}
export default function Like({ email, photo_id }: lik) {
  const [like, setLike] = useState<number>(0);
  const [flagq, setFlagq] = useState(false);
  // console.log(email,photo_id);
  // useEffect(()=>{
  //   const fetching=async()=>{
  //     try{
  //       const data=await fetch('/api/dashboard/likes/getLikes');
  //       const res=await data.json();
  //       setLike(res.data.rows.like);
  //     }catch(err){
  //       console.log("error has occured while fetching Likes "+err);
  //     }
  //   }
  //  fetching();
  // },[like])

  async function handleLike1() {
    setLike((prev) => prev + 1);
    // console.log("no of like is "+like);
    try {
      const response = await fetch("/api/dashboard/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like, email, photo_id }),
      });
      // console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Network response was not ok: ${errorData.message || "Unknown error"}`
        );
      }

      // Process response here
      console.log("Registration Successful", await response.json());
    } catch (error: any) {
      console.error("Registration Failed:", error);
    }
  }

  function handleLike() {
    console.log("docule cliked " + flagq);
    setFlagq(!flagq);
  }

  return (
    <div onClick={handleLike}>
      {flagq ? (
        <Image src={liked} alt="liked" className="h-[25px] w-[25px] mt-[3px]" />
      ) : (
        <Image src={like1} alt="like" className="h-[20px] w-[25px] mt-[3px]" />
      )}
    </div>
  );
}
