import React from "react";

import { useUser } from "../context/user-context";
import { PencilIcon, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, journals } = useUser();

  return (
    <div>
      {user && (
        <div className="w-full max-w-2xl mx-auto p-4">
          <h2 className="text-2xl text-center my-2">
            Welcome back , {user.userName}
          </h2>
          <div className=" flex flex-wrap  mt-6 mx-12 gap-4 ">
            {journals &&
              journals.map((journal, idx) => {
                return (
                  <div key={idx} className="flex border rounded-md py-2 px-6">
                    <div className="w-[10rem]">
                      <h2 className="text-md">{journal.title}</h2>
                      <h2 className="text-md">{journal.content}</h2>
                    </div>
                    <div className="flex space-x-2 items-center p-1">
                      <Link to={`/update-journal/${journal.id}`} className="">
                        <SquarePen className=" size-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
                      </Link>
                      <Link to={`/delete-journal/${journal.id}`} className="">
                        <Trash2 className=" size-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
