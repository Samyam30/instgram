"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router=useRouter()  ;
  function handlelog(){
    console.log("clicked");
    router.push('/auth/login')
  }
  console.log("hello")
  return (
   <>
    <h1>This is home page</h1>
    <Button variant="outline" size="lg" className="bg-neutral-950 text-red-600 text-3xl align-middle" onClick={handlelog}>LOGIN</Button>
   </>
  );
}
