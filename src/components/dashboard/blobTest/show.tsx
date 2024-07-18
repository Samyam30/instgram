"use client"
import PostPhotos from '@/components/dashboard/post/postPhotos';
import { list } from '@vercel/blob';
import { useEffect } from 'react';

interface params{
  iamge:any ,
}
 
export default function show({iamge}:params) {
  console.log(iamge);
  // useEffect(()=>{
  //   async function calc() {
  //     const response = await list();
  //     console.log("h1")
  //     const data=response.blobs[response.blobs.length-1].url;
  //     console.log(data);
  //     console.log("samyam");
  //   }
  //   calc();
  // },[])
  // const response = await list();
  // console.log("h1")
  // const data=response.blobs[response.blobs.length-1].url;
  // console.log(data);
  // console.log("samyam");
// const searchParams=useSearchParams();
// const data=searchParams.get('image_url')
//   console.log(data);

  return (
    <>

      < PostPhotos image_url={iamge}/>
    </>
  );
}