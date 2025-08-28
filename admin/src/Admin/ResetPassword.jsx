import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const resetToken = localStorage.getItem("resetToken");
      const res = await axios.post(
        "http://localhost:8000/admin/reset-password",
        {
          resetToken,
          newPassword: password,
        }
      );
      toast.success(res.data.message || "Password reset successfully");
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <ToastContainer />
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              New Password
            </label>
            <input
              type='password'
              className='w-full border px-3 py-2 rounded-lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Confirm Password
            </label>
            <input
              type='password'
              className='w-full border px-3 py-2 rounded-lg'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition'
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
