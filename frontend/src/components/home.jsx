import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div>
        <h2 className="text-3xl">Welcome to Journal Application</h2>
      </div>
      <div className="space-x-2 my-2">
        <Link to={"/login"} className="hover:text-green-500">
          Login
        </Link>
        <Link to={"/register"} className="hover:text-green-500">
          Register
        </Link>
      </div>
    </div>
  );
}
