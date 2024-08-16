import React, { useEffect, useState } from "react";
import { useUser } from "../components/context/AuthContext";

export default function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  const { userAuth } = useUser();
  useEffect(() => {
    const fetchConversation = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setConversation(data.filter((d) => d._id != userAuth._id));
    };
    fetchConversation();
  }, []);
  return { loading, conversation };
}
