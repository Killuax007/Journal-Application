import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/user-context";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateJournal() {
  const [submit, setSubmit] = useState(false);
  const { id } = useParams();
  const router = useNavigate();
  const { updateJournal, setJournals, fetchJournalById } = useUser();

  const [formdata, setFormdata] = useState({
    title: "",
    content: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchJournalById(id).then((data) => {
      setFormdata(data);
    });
  }, [fetchJournalById, id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmit(true);
      if (!formdata.title && !formdata.content) {
        toast.error("please Provides some credentials..");
      }
      const data = await updateJournal(id, formdata.title, formdata.content);
      setJournals((prev) =>
        prev.map((journal) => (journal.id === id ? data : journal))
      );

      toast.success("Existing  entry Updated Successfully 📋");
      setSubmit(false);
      setFormdata({
        title: "",
        content: "",
      });
      router("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto   ">
      <div className="flex justify-center items-center h-[80vh] bg-[#0A0A0A] ">
        <div className="  p-4 rounded-lg w-full max-w-md">
          <h2 className="text-3xl font-serif font-medium text-center my-4">
            Update Journal
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border font-medium dark:focus:ring-gray-700 dark:focus:border-gray-800 text-gray-900  rounded-md text-sm  block w-full py-1.5 px-2  dark:bg-neutral-800/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="John doe"
                value={formdata.title}
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-5 relative">
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>

              <textarea
                type="textarea"
                id="content"
                name="content"
                rows="4"
                className="border font-medium dark:focus:ring-gray-700 dark:focus:border-gray-800 text-gray-900  rounded-md text-sm  block w-full py-1.5 px-2  dark:bg-neutral-800/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="Your Content goes here ..."
                value={formdata.content}
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
                    Updating...
                  </span>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
