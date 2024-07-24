"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
interface PostsForm {
  email: string;
}

interface Photos {
  iamge: any;
}

export default function PostStory({ iamge }: Photos) {
  const { data: session, status } = useSession();
  console.log("iamge 1 is " + iamge);
  const [formdata, setFormdata] = useState<PostsForm>({
    email: session?.user?.email ?? "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log(formdata);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Submitting form", formdata);

    const { email } = formdata;

    try {
      const response = await fetch("/api/dashboard/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ iamge, email }),
      });
      console.log(response);
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
        />
        <br />
        <Button type="submit">Post</Button>
      </form>
    </>
  );
}
