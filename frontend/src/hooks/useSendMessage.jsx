import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversation();

  try {
    const send = async (message) => {
      setLoading(true);
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.error) {
        throw new Error(data.error);
      }
    };
    return { loading, send };
  } catch (error) {
    console.log("error from sending message", error.message);
    toast.error(error.message);
  }
}
