import React, { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocket } from "../components/context/SocketContext";

export default function useGetNot() {
  const { not, setNot } = useConversation();
  const { socket } = useSocket();
  useEffect(() => {
    socket?.on("GetNot", (newNot) => {
      console.log("newNotifcation--------------------", newNot);

      setNot([...not,newNot]);
    });

    return () => socket?.off("GetNot");
  }, [socket, setNot, not]);
}
