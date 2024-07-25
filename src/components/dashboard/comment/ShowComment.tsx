"use client";

import { useEffect, useState } from "react";
interface comm {
  id: any;
  comment: string;
  email: string;
  photo_id: any;
  created_at: string;
}

export default function ShowComment({ photo_id }: any) {
  const [comments, setComments] = useState<comm[]>([]);
  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await fetch("/api/dashboard/comments/getComments", {
          next: { revalidate: 1 },
        });
        const res = await data.json();
        setComments(res.data.rows);
      } catch (err) {
        console.log("error has occured while fetching comments " + err);
      }
    };
    fetching();
  }, []);

  console.log(comments);
  console.log(photo_id);
  return (
    <div>
      <div
        className="overflow-y-scroll no-scrollbar h-[50px] w-[470px] text-zinc-5 00"
        id="showComment"
      >
        {comments &&
          comments.map((item) => {
            if (item.photo_id === 3) {
              console.log("found photo id 3");
            }
            if (photo_id === item.photo_id) {
              return (
                <div key={item.id}>
                  <div>
                    {item.email} : {item.comment}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
