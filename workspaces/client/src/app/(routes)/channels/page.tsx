"use client";

import Header from "@/components/(routes)/channels/Header";
import MessageInput from "@/components/(routes)/channels/message/MessageInput";
import Messages from "@/components/(routes)/channels/message/Messages";

export default function Page() {
  return (
    <>
      <Header />
      <div className="absolute h-full w-full">
        <div className="flex flex-col justify-between h-full gap-4">
          <Messages />
        </div>
        <MessageInput />
      </div>
    </>
  );
}
