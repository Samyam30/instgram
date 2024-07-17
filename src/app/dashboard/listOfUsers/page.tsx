"use client"
import { useEffect, useState } from "react";
import { number } from "zod";
interface data{
    id:number,
    email:string,
    password:string,
}
export default function listOfUsers(){
  const [data,setData]=useState<data[]>([]);
  const userList=async ()=>{
    try{
      const dat=await fetch('/api/getUsers');
      const users=await dat.json();
      setData(users.data.rows)
    }catch(err){
      console.log("error has occured "+err)
    }
  }
  useEffect(()=>{
    userList();
  },[])
  console.log(data);
    return (
    <>
      this is list of users
  
        {data.map((item)=>{
          return(
            <div key={item.id}>{item.id}: {item.email}</div>
          )
        })}

    </>
  )
}