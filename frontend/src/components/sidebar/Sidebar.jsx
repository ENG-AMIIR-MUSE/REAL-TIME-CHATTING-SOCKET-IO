import { useState } from "react";
import useGetNot from "../../hooks/useGetNot";
import useGetTyping from "../../hooks/useGetTyping";
import useConversation from "../../zustand/useConversation";
import { useUser } from "../context/AuthContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { FaFacebookMessenger } from "react-icons/fa6";

const Sidebar = () => {
  const { userAuth } = useUser();
  const { not, setNot } = useConversation();

  useGetTyping();
  useGetNot();

  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationClick = () => {
    setShowNotification((prev) => !prev);
  };

  const handleClearNotification = () => {
    setNot(0); // Assuming `setNot` is used to manage notifications count
    setShowNotification(false);
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col w-full relative">
      <div className="flex items-center justify-between mb-2">
        <div className="text-black font-bold capitalize flex items-center justify-between w-full">
          {userAuth.fullName}
          <span
            className="text-xl rounded-full flex items-center justify-center relative cursor-pointer"
            onClick={handleNotificationClick}
          >
            <FaFacebookMessenger size={25} className="text-cyan-500" />

            <span className="bg-red-500 text-white w-5 h-5 absolute top-[-6px] right-[-5px] flex items-center justify-center rounded-full">
              {not.length > 0 ? not.length : "0"}
            </span>
          </span>
        </div>
        {showNotification && (
          <div className="absolute top-[60px] right-[-250px] bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 w-64">
            {!not.length > 0 && (
              <p className="text-black mb-2">
                You Dont Have Any Notification yet!
              </p>
            )}
            {not.length > 0 &&
              not.map((e) => {
                console.log("eeeeeee", e);
                return (
                  <div className="flex flex-col justify-center">
                    <p className="text-black mb-2 font-bold">{e.senderName}</p>
                    <p className="text-black mb-2">{e.message}</p>
                    <div className="border-t border-gray-200 my-4"></div>
                  </div>
                );
              })}

            <button
              className="text-white bg-red-500 rounded px-4 py-2"
              onClick={handleClearNotification}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
