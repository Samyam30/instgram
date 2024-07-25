"use client";
import PostComment from "../comment/PostComment";
import ShowComments from "../comment/ShowComment";
import Like from "../Like/Like";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import more from "@/components/images/More.png";
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
import comment from "@/components/images/Comment.png";
import share from "@/components/images/Share.png";
import bookmark from "@/components/images/Bookmark.png";

interface props {
  arrayProp: {
    id: string;
    image_url: string;
    email: string;
    created_at: string;
  }[];
}
const CardPost: React.FC<props> = ({ arrayProp }) => {
  const [flag, setFlag] = React.useState(false);
  return (
    <>
      {arrayProp.map((item) => {
        return (
          <div className="flex justify-center item-center " key={item.id}>
            <Card className="w-4/5 mt-4 mb-4">
              <CardHeader>
                <CardTitle className="font-normal text-sm ml-2 flex flex-row justify-between">
                  <div>{item.email}</div>
                  <Image src={more} alt="more" className="h-[25px] w-[25px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-0 p-[20px] pl-[24px]">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5 ">
                      <Image
                        src={item.image_url}
                        alt="imgPost"
                        className="w-[600px] h-[300px] flex-2 border-[1.5px] border-zinc-200 rounded-lg border-solid p-5"
                      />
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-2">
                          <Like email={item.email} photo_id={item.id} />
                          <Image
                            src={comment}
                            alt="comment"
                            className="h-[20px] w-[25px]"
                            priority
                          />
                          <Image
                            src={share}
                            alt="share"
                            className="h-[20px] w-[25px]"
                            priority
                          />
                        </div>
                        <Image
                          src={bookmark}
                          alt="bookmark"
                          className="h-[25px] w-[25px]"
                          priority
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5"></div>
                  </div>
                </form>
                <div className="flex flex-col gap-3  ">
                  <ShowComments photo_id={item.id} />
                  <PostComment email={item.email} photo_id={item.id} />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </>
  );
};
export default CardPost;
