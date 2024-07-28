// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import like1 from "@/components/images/like.png";
// import liked from "@/components/images/liked.png";
// interface lik {
//   email: string;
//   photo_id: any;
// }
// interface likeSchema {
//   likeid: any;
//   email: string;
//   photo_id: any;
//   created_at: string;
// }
// export default function Like({ email, photo_id }: lik) {
//   const [like, setLike] = useState<likeSchema[]>([]);
//   const [flagq, setFlagq] = useState(false);
//   var count = 0;
//   const [likeStat,setLikeStat]=useState(false)
//   const [click, setClick] = useState<boolean>(false);
//   console.log(email, photo_id);
//   useEffect(() => {
//     const fetching = async () => {
//       try {
//         const data = await fetch("/api/dashboard/likes/getLikes", {
//           next: { revalidate: 1 },
//         });
//         const res = await data.json();
//         setLike(res.data.rows);
//         console.log("fetching");
//       } catch (err) {
//         console.log("error has occured while fetching Likes " + err);
//       }
//     };
//     fetching();
//   }, [click]);
//   console.log(Like);
//   like.forEach((item) => {
//     if (item.photo_id === photo_id) {
//       count++;
//     }
//   });
//   async function handleLike1() {
//     try {
//       const response = await fetch("/api/dashboard/likes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, photo_id }),
//       });
//       console.log(response);
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           `Network response was not ok: ${errorData.message || "Unknown error"}`
//         );
//       }

//       // Process response here
//       console.log("Registration Successful", await response.json());
//       setClick(!click);
//     } catch (error: any) {
//       console.error("Registration Failed:", error);
//     }
//   }

//   return (
//     <div>
//       {flagq ? (
//         <Image
//           src={liked}
//           alt="liked"
//           className="h-[25px] w-[25px] mt-[3px]"
//           onClick={() => {
//             count--;
//           }}
//         />
//       ) : (
//         <Image
//           src={like1}
//           alt="like"
//           className="h-[20px] w-[25px] mt-[3px]"
//           onClick={handleLike1}
//         />
//       )}
//       <h1 className="ml-[7px]">{count}</h1>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import like1 from "@/components/images/like.png";
import liked from "@/components/images/liked.png";

interface lik {
  email: string;
  photo_id: any;
}

interface likeSchema {
  likeid: any;
  email: string;
  photo_id: any;
  created_at: string;
}

export default function Like({ email, photo_id }: lik) {
  const [like, setLike] = useState<likeSchema[]>([]);
  const [count, setCount] = useState(0);
  const [likeStat, setLikeStat] = useState(false);
  const [click, setClick] = useState<boolean>(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await fetch("/api/dashboard/likes/getLikes", {
          next: { revalidate: 1 },
        });
        const res = await data.json();
        setLike(res.data.rows);
        console.log("fetching");
      } catch (err) {
        console.log("error has occurred while fetching Likes " + err);
      }
    };
    fetching();
  }, [click]);

  useEffect(() => {
    const item = like.filter((item) => item.photo_id === photo_id);
    if (item) {
      const fla = item.find((it) => it.email === email);
      if (fla) {
        setLikeStat(true);
        setCount(item.length);
      } else {
        setLikeStat(false);
        setCount((prevCount) => Math.max(prevCount - 1, 0));
      }
      // setLikeStat(true);
      // setCount(item.length+1);
    }
  }, [like, photo_id]);

  async function handleLike1() {
    if (likeStat === false) {
      try {
        const response = await fetch("/api/dashboard/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, photo_id }),
        });
        console.log(response);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Network response was not ok: ${
              errorData.message || "Unknown error"
            }`
          );
        }

        console.log("Like action successful", await response.json());
        setClick(!click);
      } catch (error: any) {
        console.error("Like action failed:", error);
      }
    } else {
      console.log("already liked");
    }
  }

  return (
    <div onClick={handleLike1}>
      {likeStat ? (
        <Image
          src={liked}
          alt="liked"
          className="h-[25px] w-[25px] mt-[3px] "
        />
      ) : (
        <Image src={like1} alt="like" className="h-[20px] w-[25px] mt-[3px]" />
      )}
      <h1 className="ml-[7px]">{count}</h1>
    </div>
  );
}
