import messages from "@/components/images/Messenger.png";
export default function dispMsg({ messageReceived, message, id }: any) {
  return (
    <>
      <div className="border-[1.5px] border-solid border-blue-600 max-w-[300px] w-auto bg-blue-600 rounded-lg h-auto max-h-[100px] ml-96 mr-0 mt-4 ">
        {messageReceived.message}
      </div>

      <div className="border-[1.5px] border-solid border-zinc-700 max-w-[300px] w-auto bg-zinc-500 rounded-lg h-auto max-h-[100px] ml-5 mt-4">
        Message:{" "}
        <div key={id}>
          {messageReceived.email}:{messageReceived.text}
        </div>
      </div>
    </>
  );
}
