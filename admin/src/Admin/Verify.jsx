import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/admin/verify-otp", {
        email,
        otp,
      });
      localStorage.setItem("resetToken", res.data.resetToken);
      localStorage.setItem("resetEmail", email);
      toast.success("OTP verified. Proceed to reset password.");
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <ToastContainer />
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Verify OTP</h2>
        <form onSubmit={handleVerify}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              className='w-full border px-3 py-2 rounded-lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              OTP
            </label>
            <input
              type='text'
              className='w-full border px-3 py-2 rounded-lg'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition'
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
