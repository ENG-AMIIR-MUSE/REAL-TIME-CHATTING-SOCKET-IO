import { useState } from "react";

import Login from "./components/Login";
import Signup from "./components/pages/signup/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import { useUser } from "./components/context/AuthContext";

function App() {
  const [count, setCount] = useState(0);
  const { userAuth } = useUser();
  // console.log(userAuth);
  return (
    <div className="flex justify-center  items-center h-screen ">
      {/* <Login/> */}
      {/* <Signup/> */}

      <Routes>
        <Route
          path="/"
          element={userAuth ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/register"
          element={userAuth ? <Navigate to={"/"} /> : <Signup />}
        />

        <Route
          path="/login"
          element={userAuth ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
