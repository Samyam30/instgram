"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react"
interface data{
  email:string,
  photo_id:string
}
export default function postComment({email,photo_id}:data){
  const [comment,setComment]=useState<string>('');
  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    setComment(event.target.value);
  }


  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Submitting form", comment);
    try {
      const response = await fetch("/api/dashboard/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, email , photo_id }),
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


  console.log(comment);
  return(<>
    <h1>This comment form.</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Enter a comment</label><br></br>
      <input type="text" id="comment" value={comment} className="" onChange={handleChange}></input>
      <Button type="submit">comment</Button>
    </form>
  </>)
}