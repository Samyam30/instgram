interface DispMsgProps {
  messageReceived: {
    text: string;
    email: string;
  };
  id: string;
  sessionEmail: string | null | undefined;
}

export default function DispMsg({
  messageReceived,
  id,
  sessionEmail,
}: DispMsgProps) {
  const isSent = messageReceived.email === sessionEmail;

  return (
    <div
      className={`border-[1.5px] border-solid rounded-lg h-auto max-h-[100px] mt-4 ${
        isSent
          ? "border-blue-500 bg-blue-500 ml-auto mr-4 p-2"
          : "border-zinc-500 bg-zinc-500 mr-auto ml-5 p-2"
      }`}
      style={{ maxWidth: "300px", width: "auto" }}
    >
      <div key={id}>
        {isSent ? (
          <div className="text-right">{messageReceived.text}</div>
        ) : (
          <div>
            {messageReceived.email}: {messageReceived.text}
          </div>
        )}
      </div>
    </div>
  );
}
