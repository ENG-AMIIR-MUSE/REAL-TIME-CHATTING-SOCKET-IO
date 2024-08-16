import React, { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocket } from "../components/context/SocketContext";
import not from "../assets/not.mp3";

export default function useListenMessage() {
  const { messages, setMessages } = useConversation();
  const { socket } = useSocket();
  useEffect(() => {
    // console.log("Running useeffect");
    socket?.on("newMessage", (newMessage) => {
      // newMessage.shouldShake = true;
      // const sound = new Audio(notificationSound);
      newMessage.shouldShake = true;
      const sound = new Audio(not);
      sound.play();

      // sound.play();
      // console.log("something useffect  newmessage");
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
}
