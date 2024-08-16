import React, { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocket } from "../components/context/SocketContext";

export default function useGetTyping() {
  const { typing, setTyping } = useConversation();
  const { socket } = useSocket();
  useEffect(() => {
    console.log("Typing Execution Started");
    socket?.on("displayingTyping", (display) => {
      console.log("display--------------------", display);

      // newMessage.shouldShake = true;
      // const sound = new Audio(notificationSound);

      // sound.play();

      //   setTyping([...typing, display]);
    });

    return () => socket?.off("displayingTyping");
  }, [socket, typing, setTyping]);
}
