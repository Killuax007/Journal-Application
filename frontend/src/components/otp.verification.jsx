import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
export default function Otpverification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value[0];
      setOtp(newOtp);

      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6).split("");
    const newOtp = [...otp];

    pasteData.forEach((char, idx) => {
      if (idx < 6) newOtp[idx] = char;
    });

    setOtp(newOtp);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmit(true);
      const enteredOtp = otp.join("");
      console.log("Submitted OTP:", enteredOtp);
      await axios.post(`${baseUrl}/public/otp-verify`, {
        otp: enteredOtp,
      });

      toast.success("Account verified Successfully");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid OTP! Try again.");
      } else {
        toast.error("Something went wrong. Please try later.");
      }

      console.log(error);
    } finally {
      setSubmit(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-col justify-center items-center h-[80vh] bg-[#0A0A0A] ">
        <h2 className="text-4xl my-3 font-semibold">OTP Verification </h2>
        <h2 className="text-gray-500 text-sm  text-center ">
          Please enter the OTP (One-Time Password) sent to your registered email
          number to complete your verification.{" "}
          <span className="text-rose-500/70">
            check spam folder if didn't receive{" "}
          </span>
        </h2>
        <div className="space-y-4 my-8">
          <div className="flex">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="border font-medium dark:focus:ring-gray-700 dark:focus:border-gray-800 text-gray-900  rounded-md text-sm  block w-10 h-10 mr-1 py-1 px-1 text-center  dark:bg-neutral-800/50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              />
            ))}
          </div>

          <div className="w-full max-w-[15rem] mx-auto">
            <button
              disabled={submit}
              onClick={handleSubmit}
              type="submit"
              className="text-black text-[14px] font-medium bg-gray-200  hover:bg-gray-400 py-1.5 px-4  rounded-md w-full transition-all hover:scale-101 duration-200 cursor-pointer "
            >
              {submit ? (
                <span className="flex justify-center text-center">
                  <Loader2 className=" size-4 mr-2 my-1 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
