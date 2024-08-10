import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { send, loading } = useSendMessage();
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
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
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
