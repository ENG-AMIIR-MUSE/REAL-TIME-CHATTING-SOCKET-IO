import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  not: [],
  setNot: (not) => set({ not }),
  typing: [],
  setTyping: (typing) => set({ typing }),
}));

export default useConversation;
