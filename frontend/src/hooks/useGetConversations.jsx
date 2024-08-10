import React, { useEffect, useState } from "react";

export default function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchConversation = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setConversation(data);
    };
    fetchConversation();
  }, []);
  return { loading, conversation };
}
