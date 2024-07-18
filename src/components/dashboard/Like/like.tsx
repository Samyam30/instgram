"use client"

import { useEffect, useState } from "react"

interface lik{
  email:string,
  photo_id:any
}
export default function like({email,photo_id}:lik){
  const [like,setLike]=useState<number>(0);
  const [flag,setFlag]=useState<number>();
  console.log(email,photo_id);
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



  async function handleLike(){
    setLike((prev)=>(prev+1));
    // console.log("no of like is "+like);
    try {
      const response = await fetch("/api/dashboard/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like , email , photo_id }),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message || 'Unknown error'}`);
      }

      // Process response here
      console.log("Registration Successful", await response.json());

    } catch (error: any) {
      console.error("Registration Failed:", error);
    }
  }

  return (
    <>

      <div className="text-green-600" onClick={handleLike}>this is like</div>
    </>
  )
}