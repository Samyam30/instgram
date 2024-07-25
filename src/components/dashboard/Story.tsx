"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { string } from "zod";
import Image from "next/image";
type props = {
  propArray: {
    id: any;
    iamge: string;
    email: string;
    created_at: string;
  };
  open: boolean;
  setOpen: any;
  style: string;
  handleCss: () => void;
};
export default function Story({
  propArray,
  open,
  setOpen,
  style,
  handleCss,
}: props) {
  return (
    <Dialog key={propArray.id} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="border-1 border-solid border-purple-600 h-[90px] w-[90px] bg-pink-400 rounded-full mt-[6px] flex items-center justify-center mr-[10px] ml-[17px] hover:bg-violet-500"
          onClick={handleCss}
        >
          <div className="storyCircle text-black " key={propArray.id}>
            {propArray.id}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="container text-white h-[500px] w-[400px] ">
        <DialogHeader>
          <DialogTitle>{propArray.email}</DialogTitle>
          <DialogDescription className="flex items-center justify-center">
            <img
              alt="its image"
              src={propArray.iamge}
              className="h-[300px] w-[200px] mt-[20px]"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
