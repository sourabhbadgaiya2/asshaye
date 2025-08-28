import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/admin/send-otp", {
        email,
      });
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <ToastContainer />
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Forgot Password</h2>
        <form onSubmit={handleSendOTP}>
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
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
          >
            Send OTP
          </button>
        </form>
        {otpSent && (
          <div className='text-green-600 mt-4 text-sm text-center'>
            OTP has been sent. Please check your email.
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
