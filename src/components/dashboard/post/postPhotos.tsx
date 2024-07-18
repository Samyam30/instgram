"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PostsForm {
  // image_url: any;
  email: string;
}

interface Photos {
  image_url: any;
}

export default function PostPhotos({ image_url }: Photos) {
  console.log("iamge 1 is "+image_url)
  const [formdata, setFormdata] = useState<PostsForm>({email: '' });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  console.log(formdata);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Submitting form", formdata);

    const { email } = formdata;

    try {
      const response = await fetch("/api/dashboard/postPhotos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url, email }),
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input 
          id="email" 
          name="email" 
          type="text" 
          onChange={handleChange} 
          value={formdata.email} 
        /><br />
        {/* <label htmlFor="image_url">Image URL:</label> */}
        {/* <input 
          id="image_url" 
          name="image_url" 
          type="text" 
          onChange={handleChange} 
          value={formdata.image_url} 
        /><br /> */}
        <Button type="submit">Post</Button>
      </form>
    </>
  );
}

