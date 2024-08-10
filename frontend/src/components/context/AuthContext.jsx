import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

//provider which children should use the data   we will wrap it the our app
export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children} // app.js
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  return useContext(AuthContext);
};

export default AuthContext;
