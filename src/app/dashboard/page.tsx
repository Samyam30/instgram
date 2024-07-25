"use client";
import StoryDisp from "@/components/header/StroyDisp";
import PostDisp from "@/components/dashboard/post/postDisp";
import ProfileIcon from "@/components/dashboard/profileIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
interface userin {
  id: number;
  email: string;
  password: string;
}
export default function Dashboard() {
  const [postInfo, setPostinfo] = useState([]);
  const [users, setUsers] = useState<userin[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    const data1 = async () => {
      try {
        const posts = await fetch("/api/dashboard/PostPhotos/GetPosts");
        const res = await posts.json();
        setPostinfo(res.data.rows);
      } catch (err) {
        console.log("error in fetch " + err);
      }
    };
    data1();
  }, []);
  useEffect(() => {
    const data2 = async () => {
      try {
        const posts = await fetch("/api/GetUsers");
        const res = await posts.json();
        setUsers(res.data.rows);
      } catch (err) {
        console.log("error in fetch " + err);
      }
    };
    data2();
  }, []);
  console.log(postInfo);
  return (
    <div className=" h-auto flex flex-row justify-between -mt-4 ">
      <div className="middle h-full  bg-zinc-100 flex-1  ">
        <StoryDisp />
        <PostDisp arrayProp={postInfo} />
      </div>
      <div className="right flex-1 h-auto flex flex-col gap-5 bg-zinc-100">
        <div className=" flex flex-row gap-5">
          <ProfileIcon email={session?.user?.email} />
          <div className="mt-[78px]">
            <Link href="/dashboard/Profile">{session?.user?.email}</Link>
          </div>
        </div>
        <div className="text-zinc-500 ml-[25px]">Suggestions For You</div>
        <div className="text-black flex flex-col flex-wrap gap-5">
          {users &&
            users.map((item) => (
              <div
                className="flex flex-row justify-between ml-[25px]"
                key={item.id}
              >
                <div>{item.email}</div>
                <div className="text-blue-300 mr-[25px]">
                  <Link
                    href={`/dashboard/Profile/OtherProfile?user=${item.email}`}
                  >
                    Folow
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
