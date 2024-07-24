"use client";
import Image from "next/image";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import Show from "@/components/dashboard/blobTest/show";
import { useState, useRef } from "react";
import logo from "@/components/images/logo.png";
import home from "@/components/images/Home.png";
import search from "@/components/images/search.png";
import reel from "@/components/images/reels.png";
import messages from "@/components/images/Messenger.png";
import notification from "@/components/images/like.png";
import user from "@/components/images/User.png";
import create from "@/components/images/Add.png";
import more from "@/components/images/More.png";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
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
export default function leftBar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>("");

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
    <div>
      <div className="flex flex-column ml-7 mt-10 flex-wrap">
        <Image
          src={logo}
          alt="logo"
          className="w-[100px] h-[50px] mb-[30px]"
          priority
        />
        <div
          className="leftBar-items flex flex-row"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <Image src={home} alt="home" className="w-[30px] h-[30px]" priority />
          <div className="textImg font-bold">Home</div>
        </div>
        <div className="leftBar-items flex flex-row">
          <Image
            src={search}
            alt="search"
            className="w-[30px] h-[30px]"
            priority
          />
          <div className="textImg">Search</div>
        </div>
        <div className="leftBar-items flex flex-row">
          <Image src={reel} alt="reel" className="w-[30px] h-[30px]" priority />
          <div className="textImg">Reel</div>
        </div>
        <div
          className="leftBar-items flex flex-row"
          onClick={() => {
            router.push("/dashboard/[websocket]");
          }}
        >
          <Image
            src={messages}
            alt="messages"
            className="w-[30px] h-[30px]"
            priority
          />
          <div className="textImg">Messages</div>
        </div>
        <div className="leftBar-items flex flex-row">
          <Image
            src={notification}
            alt="notification"
            priority
            className="w-[30px] h-[30px]"
          />
          <div className="textImg">Notification</div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="leftBar-items flex flex-row">
              <Image
                src={create}
                alt="create"
                priority
                className="w-[30px] h-[30px]"
              />
              <div className="textImg">Create</div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Posts</DialogTitle>
              <DialogDescription>Share your post</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <input name="file" ref={inputFileRef} type="file" required />
              <button type="submit">Upload</button>
            </form>
            {blob && (
              <div>
                Blob url: <a href={blob.url}>{blob.url}</a>
              </div>
            )}
            {image && (
              <div>
                Image Preview: <img src={image as string} alt="Avatar" />
              </div>
            )}
            <Show iamge={image} />
          </DialogContent>
        </Dialog>

        <div
          className="leftBar-items flex flex-row"
          onClick={() => {
            router.push(
              `/dashboard/profile/[otherProfile]?user=${session?.user?.email}`
            );
          }}
        >
          <Image src={user} alt="user" priority className="w-[30px] h-[30px]" />
          <div className="textImg">Profie</div>
        </div>
        <div className="leftBar-items flex flex-row ">
          <Image src={more} alt="more" priority className="w-[30px] h-[30px]" />
          <div className="textImg">More</div>
        </div>
      </div>
    </div>
  );
}
