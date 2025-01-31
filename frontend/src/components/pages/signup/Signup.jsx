import React, { useState } from "react";
import useSignup from "../../../hooks/useSignup";
import { Link } from "react-router-dom";
import Gender from "./Gender";

export default function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

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
    <div className="flex w-full max-w-lg flex-col items-center justify-center min-w-96 mx-auto border border-1 shadow-md">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10 bg-white shadow border border-1"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full input input-bordered h-10 bg-white shadow border border-1"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10 bg-white shadow border border-1"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10 bg-white shadow border border-1"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <Gender
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <div className="mb-4 mt-4">
            <button
              className="btn btn-block bg-cyan-500 hover:bg-cyan-500 text-white border-0 outline-none btn-sm mt-2"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-2">
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
