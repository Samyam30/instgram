"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import UserDet from "@/components/dashboard/profile/UserDet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface post1 {
  id: any;
  image_url: string;
  email: string;
  created_at: string;
}
export default function OtherProfile() {
  const searchParams = useSearchParams();
  const email = searchParams.get("user");
  const followee_email = email;
  const [posts, setPosts] = useState<post1[]>([]);
  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await fetch("/api/dashboard/postPhotos/getPosts");
        const data1 = await data.json();
        setPosts(data1.data.rows);
      } catch (err) {
        console.error(
          "error has occured while fetching posts in otherProfile " + err
        );
      }
    };
    fetching();
  }, []);
  return (
    <div className="page">
      <UserDet followee_email={followee_email} />
      <div className="flex flex-row gap-[20px] flex-wrap ml-[40px] mt-[20px]">
        {posts &&
          posts.map((item) => {
            if (item.email === email) {
              return (
                <Card className="w-[350px] h-[200]" key={item.id}>
                  <CardContent className="flex items-center justify-center">
                    <Image
                      src={item.image_url}
                      alt={item.created_at}
                      className="w-[330px] h-[200px] pt-[5px] "
                    />
                  </CardContent>
                </Card>
              );
            }

            return null;
          })}
      </div>
    </div>
  );
}
