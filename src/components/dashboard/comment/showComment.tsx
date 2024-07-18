"use client"

import { useEffect, useState } from "react"
interface comm{
  id:any,
  comment:string,
  email:string,
  photo_id:any,
  created_at:string
}

export default function showComment({photo_id}:any){
  console.log(photo_id);
  const [comments,setComments]=useState<comm[]>([]);
  useEffect(()=>{
    const fetching=async()=>{
      try{
        const data=await fetch('/api/dashboard/comments/getComments');
        const res=await data.json();
        setComments(res.data.rows);
      }catch(err){
        console.log("error has occured while fetching comments "+err);
      }
    }
   fetching();
  },[])
  console.log("comment is ");
  // console.log(comments);
  const arr=comments.filter((item)=>
    item.id==photo_id
  )
  console.log(arr);
  return(<>
    <h1>Comments are shown here:: </h1><br></br>
    {comments.map((item)=>{
      if (photo_id==item.id){
        console.log("id matched");
        return (
          <div key={item.id}>
          <div className="text-red-600">{item.email} : {item.comment}</div>
        </div>
        )
      }
      // return
      // (
      //   <div key={item.id}>
      //     <div className="text-red-600">{item.email} : {item.comment}</div>
      //   </div>
        
      // )  
      }
    )}
    
  </>)
}