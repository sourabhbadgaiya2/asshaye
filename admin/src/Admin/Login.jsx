// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaUser, FaLock, FaEye, FaEyeSlash, FaAt } from "react-icons/fa";

// const Login = () => {
//   const [name, setname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'name'
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [resetData, setResetData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//     id: ""
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:8000/admin/login", {
//         [loginMethod]: loginMethod === "email" ? email : name,
//         password,
//       });

//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("name", response.data.name); // Store name
//       localStorage.setItem("id", response.data.id); // Store id for reset password

//       toast.success("Login successful! Redirecting...", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);

//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "An error occurred during login";
//       setError(errorMessage);
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

// const handleResetPassword = async (e) => {
//   e.preventDefault();

//   if (resetData.newPassword !== resetData.confirmPassword) {
//     toast.error("New passwords don't match!", {
//       position: "top-right",
//       autoClose: 5000,
//     });
//     return;
//   }

//   if (resetData.newPassword.length < 6) {
//     toast.error("Password must be at least 6 characters", {
//       position: "top-right",
//       autoClose: 5000,
//     });
//     return;
//   }

//   try {
//     setIsLoading(true);
//     const response = await axios.post("http://localhost:8000/admin//resetpassword", {
//       oldPassword: resetData.oldPassword,
//       newPassword: resetData.newPassword,
//       id: localStorage.getItem("id")
//     }, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem("token")}`
//       }
//     });

//     toast.success(response.data.message || "Password reset successfully!", {
//       position: "top-right",
//       autoClose: 3000,
//     });

//     setShowResetModal(false);
//     setResetData({
//       oldPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//       id: ""
//     });

//   } catch (err) {
//     const errorMessage = err.response?.data?.message ||
//                        err.message ||
//                        "An error occurred during password reset";
//     toast.error(errorMessage, {
//       position: "top-right",
//       autoClose: 5000,
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleLoginMethod = () => {
//     setLoginMethod(prev => prev === "email" ? "name" : "email");
//     setError("");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <ToastContainer />

//       <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//           <p className="text-gray-600 mt-2">Please enter your credentials to login</p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
//             <p>{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex justify-center mb-4">
//             <button
//               type="button"
//               onClick={toggleLoginMethod}
//               className="text-sm text-blue-600 hover:text-blue-500 font-medium"
//             >
//               {loginMethod === "email"
//                 ? "Login with name instead"
//                 : "Login with email instead"}
//             </button>
//           </div>

//           {loginMethod === "email" ? (
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaAt className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">name</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                   value={name}
//                   onChange={(e) => setname(e.target.value)}
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? (
//                   <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
//                 ) : (
//                   <FaEye className="text-gray-400 hover:text-gray-600" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <button
//                 type="button"
//                 onClick={() => setShowResetModal(true)}
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Reset password
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </span>
//             ) : "Login"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{" "}
//             <a href="/admin/register" className="font-medium text-blue-600 hover:text-blue-500">
//               Register here
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Reset Password Modal */}
//       {showResetModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">Reset Password</h3>
//             <form onSubmit={handleResetPassword}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
//                   <input
//                     type="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                     value={resetData.oldPassword}
//                     onChange={(e) => setResetData({...resetData, oldPassword: e.target.value})}
//                     placeholder="Enter old password"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//                   <input
//                     type="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                     value={resetData.newPassword}
//                     onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
//                     placeholder="Enter new password"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
//                   <input
//                     type="password"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                     value={resetData.confirmPassword}
//                     onChange={(e) => setResetData({...resetData, confirmPassword: e.target.value})}
//                     placeholder="Confirm new password"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowResetModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Resetting..." : "Reset Password"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaAt } from "react-icons/fa";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/admin/login", {
        [loginMethod]: loginMethod === "email" ? email : name,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred during login";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error("New passwords don't match!", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (resetData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:8000/admin/resetpassword",
        {
          email: resetData.email,
          oldPassword: resetData.oldPassword,
          newPassword: resetData.newPassword,
          confirmPassword: resetData.confirmPassword,
        }
      );

      toast.success(response.data.message || "Password reset successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setShowResetModal(false);
      setResetData({
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred during password reset";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginMethod = () => {
    setLoginMethod((prev) => (prev === "email" ? "name" : "email"));
    setError("");
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <ToastContainer />

      <div className='p-8 bg-white shadow-xl rounded-2xl w-full max-w-md'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>Welcome Back</h2>
          <p className='text-gray-600 mt-2'>
            Please enter your credentials to login
          </p>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700'>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-center mb-4'>
            <button
              type='button'
              onClick={toggleLoginMethod}
              className='text-sm text-blue-600 hover:text-blue-500 font-medium'
            >
              {loginMethod === "email"
                ? "Login with name instead"
                : "Login with email instead"}
            </button>
          </div>

          {loginMethod === "email" ? (
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FaAt className='text-gray-400' />
                </div>
                <input
                  type='email'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                />
              </div>
            </div>
          ) : (
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FaUser className='text-gray-400' />
                </div>
                <input
                  type='text'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter your name'
                  required
                />
              </div>
            </div>
          )}

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaLock className='text-gray-400' />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className='text-gray-400 hover:text-gray-600' />
                ) : (
                  <FaEye className='text-gray-400 hover:text-gray-600' />
                )}
              </button>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-700'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <button
                type='button'
                onClick={() => setShowResetModal(true)}
                className='font-medium text-blue-600 hover:text-blue-500'
              >
                Reset password
              </button>
            </div>
          </div>

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
                Processing...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/admin/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </a>
          </p>
        </div> */}
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h3 className='text-xl font-bold mb-4'>Reset Password</h3>
            <form onSubmit={handleResetPassword}>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <FaAt className='text-gray-400' />
                    </div>
                    <input
                      type='email'
                      className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                      value={resetData.email}
                      onChange={(e) =>
                        setResetData({ ...resetData, email: e.target.value })
                      }
                      placeholder='Enter your email'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Old Password
                  </label>
                  <input
                    type='password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                    value={resetData.oldPassword}
                    onChange={(e) =>
                      setResetData({
                        ...resetData,
                        oldPassword: e.target.value,
                      })
                    }
                    placeholder='Enter old password'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    New Password
                  </label>
                  <input
                    type='password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                    value={resetData.newPassword}
                    onChange={(e) =>
                      setResetData({
                        ...resetData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder='Enter new password'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Confirm New Password
                  </label>
                  <input
                    type='password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                    value={resetData.confirmPassword}
                    onChange={(e) =>
                      setResetData({
                        ...resetData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder='Confirm new password'
                    required
                  />
                </div>
              </div>
              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setShowResetModal(false)}
                  className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
