import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/admin/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/admin/login");
        }, 3000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <ToastContainer />

      <div className='p-8 bg-white shadow-xl rounded-2xl w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>Create Account</h2>
          <p className='text-gray-600 mt-2'>Join us today to get started</p>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded'>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Full Name
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaUser className='text-gray-400' />
              </div>
              <input
                type='text'
                name='name'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your full name'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaEnvelope className='text-gray-400' />
              </div>
              <input
                type='email'
                name='email'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                required
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaLock className='text-gray-400' />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                value={formData.password}
                onChange={handleChange}
                placeholder='Create a password'
                required
                minLength='6'
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className='text-gray-400 hover:text-gray-600' />
                ) : (
                  <FaEye className='text-gray-400 hover:text-gray-600' />
                )}
              </button>
            </div>
            <p className='mt-1 text-xs text-gray-500'>Minimum 6 characters</p>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Confirm Password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaLock className='text-gray-400' />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm your password'
                required
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className='text-gray-400 hover:text-gray-600' />
                ) : (
                  <FaEye className='text-gray-400 hover:text-gray-600' />
                )}
              </button>
            </div>
          </div>

          <div className='pt-2'>
            <button
              type='submit'
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{" "}
            <a
              href='/admin/login'
              className='font-medium text-blue-600 hover:text-blue-500 hover:underline'
            >
              Sign in
            </a>
          </p>
        </div>

        <div className='mt-6 border-t border-gray-200 pt-6'>
          <p className='text-xs text-gray-500 text-center'>
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
