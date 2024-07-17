"use client"
import Navbar from "@/components/header/Navbar";
import PostDisp from "@/components/dashboard/postDisp" 
import ProfileIcon from "@/components/dashboard/profileIcon";
import { useEffect, useState } from "react";
export default function dashboard(){
  // const data2=[{id:'1'},{id:'2'}];
  const [postInfo,setPostinfo]=useState([]);
  const data1=async()=>{
    try{
      const posts=await fetch('/api/dashboard/postPhotos/getPosts');
      const res=await posts.json();
      setPostinfo(res.data.rows);
    }catch(err){
      console.log("error in fetch "+err);
    }
  }
  useEffect(()=>{
    data1();
  },[])
  console.log(postInfo);
  return(
    <div className=" h-auto flex flex-row justify-between -mt-4 ">
      <div className="left bg-white h-auto flex flex-column justify-between  border-r-solid border-r-[1.5px] border-r-stone-500">

      </div>
      <div className="middle h-full  border-r-solid border-r-[1.5px] border-r-stone-500">
        <Navbar />
        <PostDisp arrayProp={postInfo}/>
      </div>
      <div className="right h-auto flex flex-column justify-between">
        < ProfileIcon />
      </div>
    </div>
  )
}