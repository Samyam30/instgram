"use client";
import PostPhotos from "@/components/dashboard/post/postPhotos";
import { list } from "@vercel/blob";
import { useEffect } from "react";

interface params {
  iamge: any;
}

export default function show({ iamge }: params) {
  console.log(iamge);
  return (
    <>
      <PostPhotos image_url={iamge} />
    </>
  );
}
