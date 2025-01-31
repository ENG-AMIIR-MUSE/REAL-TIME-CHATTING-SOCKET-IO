import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useUser } from "../context/AuthContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // console.log("selction converstion", selectedConversation);
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[1000px] flex flex-col">
      <>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {" "}
            {/* Header */}
            <div className="bg-slate-100 px-4 py-2 mb-2">
              <span className="label-text">To:</span>{" "}
              <span className="text-black font-bold">
                {selectedConversation.fullName}
              </span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </>
    </div>
  );
};
const NoChatSelected = () => {
  const { userAuth } = useUser();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {userAuth.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
export default MessageContainer;
