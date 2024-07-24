"use client";

import io from "socket.io-client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DispMsg from "@/components/dashboard/messaging/dispMsg";
import messages from "@/components/images/Messenger.png";
const socket = io("ws://localhost:5000"); // Ensure this matches your server setup
interface users {
  text: string;
  email: string;
}
interface dat {
  message: any;
  text: string;
  email: string;
}
const App = () => {
  var count = 1;
  const params = useSearchParams();
  const to1 = params.get("to");
  const { data: session, status } = useSession();
  const [msg1, setMsg1] = useState<any>();
  const [message, setMessage] = useState<string>("");
  const [messageReceived, setMessageReceived] = useState<dat[]>([]);

  function sendMessage() {
    socket.emit("private message", {
      content: message,
      room: to1,
      from1: session?.user?.email,
    });
    setMsg1(message);
    setMessage("");
  }

  useEffect(() => {
    // Connection listener
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.on("private message", ({ content, from }) => {
      console.log("effect use main " + content);
      console.log("hello effect" + from);
      setMessageReceived((prev) => [
        ...prev,
        { message: msg1, text: content, email: from },
      ]);
      console.log(messageReceived);
    });
    return () => {
      socket.off("private message");
    };
  }, [socket, message]);
  function reload() {
    window.addEventListener("beforeunload", () => {
      console.log("closing socket");
      socket.close();
    });
  }
  return (
    <div className="page">
      <div className="App">
        <div className="flex flex-col -ml-5 mr-12 my-6 border-[1.5px] rounded-2xl border-solid border-zinc-900 ">
          <div className=" h-[70px] border-b-[1.5px] border-solid border-black">
            <input
              readOnly
              className="w-4/6  mt-[30px] ml-[20px] font-bold text-[20px] border-0 hover:border-0 outline-none"
              placeholder="userName"
              value={to1 ?? ""}
              onChange={() => {
                console.log("change");
              }}
            ></input>
          </div>
          <div className="disp h-[500px]  overflow-y-scroll no-scrollbar border-b-[1.5px] border-b-solid border-b-black">
            <div className="flex flex-col">
              {messageReceived &&
                messageReceived.map((msg) => (
                  <div>
                    <DispMsg
                      messageReceived={msg}
                      message={msg1}
                      id={socket.id}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className=" h-[75px]  mx-[20px] my-[20px] flex flex-row flex-wrap gap-[20px] w-[650px] border-solid border-[1.5px] border-black rounded-xl">
            <input
              className=" w-[420px] h-[70px] hover:border-0 outline-none"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="border-l-[1.5px] border-l-solid border-black h-[70px] text-blue-700 w-[100px] font-bold -ml-5 text-center"
              onClick={sendMessage}
            >
              Send message
            </button>
            <button
              className="border-l-[1.5px] border-l-solid border-black h-[70px] text-red-600 w-[100px] font-bold text-center "
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
