"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { redirect } from "next/navigation"
export default function profileIcon(){
  return(
    <Avatar className="ml-[100px] mt-10">
      <Link href='/dashboard/profile'>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
  </Link>
</Avatar>
  )
}