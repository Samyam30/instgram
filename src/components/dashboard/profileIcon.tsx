"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { redirect } from "next/navigation";
import profile from "@/components/images/User.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import PostStory from "@/components/dashboard/postStory";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function profileIcon({ email }: any) {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const data = new FileReader();
    data.onload = async () => {
      setImage(data.result);
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blobTest",
      });

      setBlob(newBlob);
    };

    data.readAsDataURL(file);
    console.log("test console");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Avatar className="ml-[20px] mt-[55px]  h-[80px] w-[80px]">
          {/* <Link href={`/dashboard/profile/otherProfile?user=${email}`}> */}
          <div>
            <Image src={profile} alt="user" className="h-[80px] w-[80px]" />
            <AvatarFallback>CN</AvatarFallback>
          </div>
          {/* </Link> */}
        </Avatar>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Story</DialogTitle>
          <DialogDescription>Share your story</DialogDescription>
        </DialogHeader>
        <h1>Select photo</h1>
        <form onSubmit={handleSubmit}>
          <input name="file" ref={inputFileRef} type="file" required />
          <button type="submit">Upload</button>
        </form>
        {/* {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )} */}
        {image && (
          <div>
            <img
              src={image as string}
              alt="Avatar"
              className="h-[300px] w-[300px]"
            />
          </div>
        )}
        <PostStory iamge={image} />
      </DialogContent>
    </Dialog>
  );
}
