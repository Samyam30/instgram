"use client";
import Image from "next/image";
import user from "@/components/images/User.png";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Navbar from "@/components/header/header";
interface email {
  followee_email: string | null;
}
interface follo {
  follower_email: string;
  followee_email: string;
  created_at: string;
}
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function UserDet({ followee_email }: email) {
  const [followStat, setFollowStat] = useState<follo[]>([]);
  const { data: session, status } = useSession();
  const [flag, setFlag] = useState<boolean[]>([]);
  const follower_email = session?.user?.email;
  const router = useRouter();
  var same = false;
  if (follower_email === followee_email) {
    same = true;
  } else {
    same = false;
  }
  useEffect(() => {
    async function followStatus() {
      try {
        const data = await fetch("/api/UserProfile/getProfile", {
          next: { revalidate: 1 },
        });
        const data1 = await data.json();
        setFollowStat(data1.data.rows);
      } catch (err) {
        console.error(
          "error occured in fetching followe followee status " + err
        );
      }
    }
    followStatus();
  }, [followee_email]);
  console.log(followStat);

  async function follow() {
    console.log(follower_email, followee_email);
    try {
      const response = await fetch("/api/UserProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ follower_email, followee_email }),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Network response was not ok: ${errorData.message || "Unknown error"}`
        );
      }

      // Process response here
      console.log("Registration Successful", await response.json());
    } catch (error: any) {
      console.error("Registration Failed:", error);
    }
  }
  useEffect(() => {
    setFlag(
      followStat.map((item) => {
        if (
          item.followee_email === followee_email &&
          item.follower_email === follower_email
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [followStat]);

  const fla: any = flag.find((stat) => {
    return stat == true;
  });
  console.log(flag);
  return (
    <div>
      {same ? <Navbar /> : null}

      <div className="page1 flex flex-row gap-2 ml-[60px]">
        <Image src={user} alt="user" className="h-[40px] w-[40px]" />
        <div className="ml-[10px]">{followee_email}</div>
        {same ? null : (
          <Button
            className="border-solid border-[1.5px] rounded-lg border-zinc-700 text-zinc-50 bg-zinc-700 w-[70px] h-[40px]"
            onClick={follow}
          >
            {fla ? <span>Following</span> : <span>follow</span>}
          </Button>
        )}
        {same ? null : (
          <Button
            className="border-solid border-[1.5px] rounded-lg border-zinc-700 text-zinc-50 bg-zinc-700 w-[70px] h-[40px]"
            onClick={() => {
              router.push(`/dashboard/webSocket?to=${followee_email}`);
            }}
          >
            Message
          </Button>
        )}
      </div>
    </div>
  );
}
