import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessage from "../../hooks/useListenMessage";
import MessageSkeleton from "../skeleton/MessageSkeleton ";
import Message from "./Message";
import useGetNot from "../../hooks/useGetNot";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  const lastMessageRef = useRef();
  useListenMessage();
  // useGetNot();
  // console.log("messages", messages);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  // console.log("messages", messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(5)].map((_, inx) => <MessageSkeleton key={inx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-black">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
