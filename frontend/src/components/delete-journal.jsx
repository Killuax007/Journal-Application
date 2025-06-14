import React from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/user-context";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function DeleteJournal() {
  const { deleteJournal } = useUser();
  const { id } = useParams();
  const router = useNavigate();
  async function handleDeleteJournal(id) {
    const data = await deleteJournal(id);
    toast.success(data);
    router("/dashboard");
  }
  return (
    <div className=" flex flex-col justify-center items-center h-[80vh]">
      <div>
        <h2 className="text-2xl">
          Are you sure You want to delete this Journal :
        </h2>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => router(-1)}
          className="bg-blue-600 hover:bg-blue-800 rounded-md py-1.5 px-3 cursor-pointer"
        >
          Cancel
        </button>
        <button
          className="bg-rose-500 hover:bg-red-800 cursor-pointer rounded-md py-1.5 px-3 "
          onClick={() => handleDeleteJournal(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
