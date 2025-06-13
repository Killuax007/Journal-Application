import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [submit, setSubmit] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const router = useNavigate();
  const [formdata, setFormdata] = useState({
    userName: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formdata);
    try {
      setSubmit(true);
      if (!formdata.userName && !formdata.password) {
        toast.error("please Provides some credentials..");
      }
      const response = await axios.post(`${baseUrl}/public/login`, {
        userName: formdata.userName,
        password: formdata.password,
      });
      if (response.status == 200) {
        const data = await response.data;
        localStorage.setItem("token", data);

        toast.success("Successfully logged in  ✅");
        setSubmit(false);
        router("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto   ">
      <div className="flex justify-center items-center h-screen bg-[#0A0A0A] ">
        <div className="  p-4 rounded-lg w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="border dark:focus:ring-gray-700 dark:focus:border-gray-800 text-gray-900  rounded-md text-sm  block w-full py-1.5 px-2  dark:bg-neutral-800/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="John doe"
                value={formdata.userName}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                className="border dark:focus:ring-gray-700 dark:focus:border-gray-800 text-gray-900  rounded-md text-sm  block w-full py-1.5 px-2  dark:bg-neutral-800/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="******"
                value={formdata.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-full max-w-[27rem] mx-auto">
              <button
                disabled={submit}
                type="submit"
                className="text-black text-[14px] font-medium bg-gray-200  hover:bg-gray-400 py-1.5 px-4  rounded-md w-full transition-all hover:scale-101 duration-200 cursor-pointer "
              >
                {submit ? (
                  <span className="flex justify-center text-center">
                    <Loader2 className=" size-4 mr-2 my-1 animate-spin" />
                    Logged In...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <p className="text-sm text-center my-2">
            New User try{" "}
            <Link className="hover:text-green-500" to={"/register"}>
              register
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
