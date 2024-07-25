"use client";
import PostPhotos from "@/components/dashboard/post/PostPhotos";
import { list } from "@vercel/blob";
import { useEffect } from "react";

interface params {
  iamge: any;
}

export default function Show({ iamge }: params) {
  console.log(iamge);
  return (
    <>
      <PostPhotos image_url={iamge} />
    </>
  );
}
