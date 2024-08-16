import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";
import { useSocket } from "../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useUser } from "../context/AuthContext";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedConversation } = useConversation();
  const { userAuth } = useUser();
  const { socket } = useSocket();
  const { send, loading } = useSendMessage();
  const handleonChange = (e) => {
    setMessage(e.target.value);
    // Client-side code
    socket?.emit("typing", {
      senderId: userAuth._id,
      senderName: userAuth.fullName,
      receiverId: selectedConversation._id,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      toast.error("Message Cannot be Empty!");
      return;
    }
    await send(message);
    setMessage("");
  };
  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={handleonChange}
          className="border text-sm rounded-lg outline-none  block w-full p-2.5  bg-white border-gray-600 text-black"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
