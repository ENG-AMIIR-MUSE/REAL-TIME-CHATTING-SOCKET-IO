import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../components/context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setUserAuth } = useUser();

  const logout = async () => {
  
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
       
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
   
      localStorage.removeItem("chat-user")
      setUserAuth(null);
      toast.success("User Logout Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
