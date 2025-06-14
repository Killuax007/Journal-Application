import React from "react";
import { useUser } from "../context/user-context";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, PenBoxIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, setUser } = useUser();
  const router = useNavigate();
  async function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("See you soon User 👋");

    router("/login");
  }
  return (
    <div className="w-full flex justify-between max-w-2xl mx-auto h-15 items-center">
      <div>
        <h2 className="md:text-2xl text-xl mx-2 text-gray-100 font-semibold font-serif  ">
          <Link to={user ? "/dashboard" : "/"}>Journal-Application</Link>
        </h2>
      </div>
      <div>
        {user ? (
          <div className="flex space-x-2 mx-2">
            <Link
              to={"/add-journal"}
              className="flex cursor-pointer items-center bg-green-500/80 hover:bg-green-600/60 rounded-lg text-black font-medium px-3 py-1.5 "
            >
              <span className="hidden md:block">Create</span>
              <PenBoxIcon className=" size-4 ml-1 " />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center  rounded-lg ring-1 font-medium px-3 py-1.5 cursor-pointer"
            >
              <span className="hidden md:block">Logout</span>
              <LogOut className=" size-4 ml-1" />
            </button>
          </div>
        ) : (
          <div className="space-x-2 mx-2">
            <Link
              to={"/login"}
              className="bg-gray-100 hover:bg-gray-200/80 rounded-lg text-black font-medium px-3 py-1.5"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-neutral-900/50 hover:bg-neutral-950 border  rounded-lg  font-medium px-3 py-1.5"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
