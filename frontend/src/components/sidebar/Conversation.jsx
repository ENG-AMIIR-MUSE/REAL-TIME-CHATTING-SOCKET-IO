import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocket } from "../context/SocketContext";

const Conversation = ({ con, index, emoji }) => {
  const { onlineUsers, socket } = useSocket();

  const isOnline = onlineUsers.includes(con._id);
  const [typ, setTyp] = useState(false);

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === con._id;

  useEffect(() => {
    socket?.on("displayingTyping", (display) => {
      if (display.senderId === con._id) {
        setTyp(true);

        // Remove the typing indicator after a short delay
        setTimeout(() => {
          setTyp(false);
        }, 3000);
      }
    });

    return () => socket?.off("displayingTyping");
  }, [socket, con._id]);

  return (
    <>
      <div
        onClick={() => setSelectedConversation(con)}
        className={`flex gap-2 items-center hover:bg-gray-100 ${
          isSelected ? "bg-gray-100" : ""
        } rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={con.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div>
              <p className="font-semibold text-black">{con.fullName}</p>
              <p className="text-green-500">{typ ? "Typing..." : ""}</p>
            </div>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!index && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
