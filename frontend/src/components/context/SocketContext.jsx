import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./AuthContext";

const SocketContext = createContext(null);

//provider which children should use the data   we will wrap it the our app
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userAuth } = useUser();
  useEffect(() => {
    // console.log(userAuth);
    if (userAuth) {
      const socket = io("https://real-time-chatting-socket-io.onrender.com", {
        query: { userId: userAuth._id },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        console.log("onlineUsers", users);
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userAuth]);
  return (
    <SocketContext.Provider value={{ socket, setSocket, onlineUsers }}>
      {children} // app.js
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketContext;
