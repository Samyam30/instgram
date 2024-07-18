"use client"
import SignOutButton from "@/components/header/signoutButton"
import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function profile(){
  const router=useRouter();
  return(
    <>
    <Header />
    {/* <SignOutButton />  */}
    <Button onClick={()=>{
      router.push('/dashboard/blobTest')}} > Add posts</Button>
    </>
  )
}