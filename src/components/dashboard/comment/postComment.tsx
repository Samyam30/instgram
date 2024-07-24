"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface data {
  email: string;
  photo_id: string;
}
export default function postComment({ email, photo_id }: data) {
  const [comment, setComment] = useState<string>("");
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
        body: JSON.stringify({ comment, email, photo_id }),
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

  console.log(comment);
  return (
    <div className="mb-0 mr-0 ml-0 border-1 border-solid border-zinc-900 ">
      <form
        onSubmit={handleSubmit}
        className="border-1 border-solid border-zinc-200 flex flex-row"
      >
        <input
          type="text"
          id="comment"
          value={comment}
          className=" border-t-solid border-t-[1.5px] border-t-black "
          placeholder="Add a comment"
          onChange={handleChange}
        ></input>
        <Button
          type="submit"
          id="postComment"
          className="border-t-[1.5px] border-t-solid border-t-black rounded-none bg-white text-blue-500 font-bold hover:bg-white"
        >
          Post
        </Button>
      </form>
    </div>
  );
}
