// import MessageContainer from "../../components/messages/MessageContainer";

import { useContext } from "react";
// import AuthContext, {  useUser } from "../../context/AuthContext";
import MessageContainer from "../../messages/MessageContainer";
import Sidebar from "../../sidebar/Sidebar";
import { useUser } from "../../context/AuthContext";
// import useAuthContext from "../../context/AuthContext";

const Home = () => {
  const authUser = useUser();
  console.log(authUser);
  return (
    <div className="flex   sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-red-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
