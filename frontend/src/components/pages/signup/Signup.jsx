import React, { useState } from "react";
import Gender from "./Gender";
import useSignup from "../../../hooks/useSignup";
import GenderCheckbox from "./Gender";

export default function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    // ??????????????????????????????????????????????>>>>><<<<<<<<><><><><><><><</></></></></>
    gender: "",
  });
  // const [loading,setLoading] = useState(false)
  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    
    await signup(inputs);
  };
  return (
    <div className="max-w-lg m-auto mt-32 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  bg-white rounded-lg p-5"
      >
        <span className="font-bold text-xl text-black ">
          User Registration{" "}
        </span>
        <div className="flex items-center gap-5 ">
          <div className="flex flex-col">
            <label className="label">Username</label>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              className="input bg-white/30 input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Full Name</label>
            <input
              type="text"
              placeholder="Fullname"
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              className="input bg-white/30 input-bordered w-full "
            />
          </div>
        </div>
        <label className="label">password</label>

        <input
          type="password"
          placeholder="Type here"
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          className="input bg-white/30 input-bordered w-full "
        />
        <label className="label">Confirm Password</label>

        <input
          type="password"
          onChange={(e) =>
            setInputs({ ...inputs, confirmPassword: e.target.value })
          }
          placeholder="Type here"
          className="input bg-white/30 input-bordered w-full "
        />
        <GenderCheckbox
          onCheckboxChange={handleCheckboxChange}
          selectedGender={inputs.gender}
        />

        <button
          type="submit"
          className="px-5 rounded-lg py-2 mt-5  bg-blue-500 text-white "
        >
         {loading ? 'Loading ...': 'submit'}
        </button>
        <div className="flex items-center  gap-5 justify-between">
          <p>Doesn't Have an account ? </p>
          <label htmlFor="" className="label">
            Login
          </label>
        </div>
      </form>
    </div>
  );
}
