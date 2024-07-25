"use client";

import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DispMsg from "@/components/dashboard/messaging/DispMsg";
import messages from "@/components/images/Messenger.png";

const socket = io("https://socket-server-rose.vercel.app/"); // Ensure this matches your server setup

interface dat {
  text: string;
  email: string;
}

const App = () => {
  const params = useSearchParams();
  const to1 = params.get("to");
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<dat[]>([]);

  function sendMessage() {
    if (!message || !session?.user?.email || !to1) return;
    const newMessage = {
      text: message,
      email: session.user.email,
    };
    socket.emit("private message", {
      content: message,
      room: to1,
      from1: session.user.email,
    });
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("private message", ({ content, from }) => {
      setMessages((prev) => [...prev, { text: content, email: from }]);
    });

    return () => {
      socket.off("private message");
    };
  }, []);

  function reload() {
    window.addEventListener("beforeunload", () => {
      console.log("closing socket");
      socket.close();
    });
  }

  return (
    <div className="page">
      <div className="App">
        <div className="flex flex-col -ml-5 mr-12 my-6 border-[1.5px] rounded-2xl border-solid border-zinc-900">
          <div className="h-[70px] border-b-[1.5px] border-solid border-black">
            <input
              readOnly
              className="w-4/6 mt-[30px] ml-[20px] font-bold text-[20px] border-0 hover:border-0 outline-none"
              placeholder="userName"
              value={to1 ?? ""}
            ></input>
          </div>
          <div className="disp h-[500px] overflow-y-scroll no-scrollbar border-b-[1.5px] border-b-solid border-b-black">
            <div className="flex flex-col">
              {messages.map((msg, index) => (
                <DispMsg
                  key={index}
                  messageReceived={msg}
                  id={socket.id ?? ""}
                  sessionEmail={session?.user?.email}
                />
              ))}
            </div>
          </div>
          <div className="h-[75px] mx-[20px] my-[20px] flex flex-row flex-wrap gap-[20px] w-[650px] border-solid border-[1.5px] border-black rounded-xl">
            <input
              className="w-[420px] h-[70px] hover:border-0 outline-none pl-4"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button
              className="border-l-[1.5px] border-l-solid border-black h-[70px] text-blue-700 w-[100px] font-bold -ml-5 text-center"
              onClick={sendMessage}
            >
              Send message
            </button>
            <button
              className="border-l-[1.5px] border-l-solid border-black h-[70px] text-red-600 w-[100px] font-bold text-center"
              onClick={reload}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
