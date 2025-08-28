// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { addData } from './Redux/UrlSlice';
// const URL = () => {
//   const [formData, setFormData] = useState({ URL: '' });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     let tempErrors = {};

//     if (!formData.URL.trim()) {
//       tempErrors.URL = 'Course URL is required';
//       valid = false;
//     } else if (!/^https?:\/\/.+\..+/.test(formData.URL)) {
//       tempErrors.URL = 'Please enter a valid URL';
//       valid = false;
//     }

//     setErrors(tempErrors);
//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       // const response = await axios.post('http://localhost:8000/url/create', formData);
//       if (newItemTitle.trim() && newItemBody.trim()) {
//       const newItem = {
//         title: newItemTitle,
//         body: newItemBody,
//         userId: 1, // Required by JSONPlaceholder
//       };
//       dispatch(addData(newItem));
//       setNewItemTitle('');
//       setNewItemBody('');
//     }
//       toast.success('Course URL submitted successfully!');
//       setFormData({ URL: '' });
//     } catch (error) {
//       console.error('Error submitting course URL:', error);
//       toast.error(error.response?.data?.message || 'Failed to submit course URL');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md"
//       >
//         <ToastContainer position="top-center" autoClose={3000} />

//         <div className="space-y-1 mb-6">
//           <label className="block text-sm font-medium text-gray-700">
//             Course URL <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="URL"
//             value={formData.URL}
//             onChange={handleInputChange}
//             placeholder="https://example.com"
//             className={`w-full p-2 border ${errors.URL ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//           />
//           {errors.URL && (
//             <p className="text-red-500 text-xs mt-1">{errors.URL}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Submitting...' : 'Submit Course URL'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default URL;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { addUrl } from './Redux/UrlSlice';

// const URL = () => {
//   const [formData, setFormData] = useState({ URL: '' });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     let tempErrors = {};

//     if (!formData.URL.trim()) {
//       tempErrors.URL = 'Course URL is required';
//       valid = false;
//     } else if (!/^https?:\/\/.+\..+/.test(formData.URL)) {
//       tempErrors.URL = 'Please enter a valid URL';
//       valid = false;
//     }

//     setErrors(tempErrors);
//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       // Redux के through API call
//       await dispatch(addUrl({ URL: formData.URL })).unwrap();

//       toast.success('Course URL submitted successfully!');
//       setFormData({ URL: '' });
//     } catch (error) {
//       console.error('Error submitting course URL:', error);
//       toast.error(error.message || 'Failed to submit course URL');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md"
//       >
//         <ToastContainer position="top-center" autoClose={3000} />

//         <div className="space-y-1 mb-6">
//           <label className="block text-sm font-medium text-gray-700">
//             Course URL <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="URL"
//             value={formData.URL}
//             onChange={handleInputChange}
//             placeholder="https://example.com"
//             className={`w-full p-2 border ${errors.URL ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//           />
//           {errors.URL && (
//             <p className="text-red-500 text-xs mt-1">{errors.URL}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Submitting...' : 'Submit Course URL'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default URL;

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { addUrl } from "./Redux/UrlSlice";

const URL = () => {
  const [formData, setFormData] = useState({ URL: "", altText: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = {};

    if (!formData.URL.trim()) {
      tempErrors.URL = "Course URL is required";
      valid = false;
    } else if (!/^https?:\/\/.+\..+/.test(formData.URL)) {
      tempErrors.URL = "Please enter a valid URL";
      valid = false;
    }

    if (!formData.altText.trim()) {
      tempErrors.altText = "Alt text is required";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Redux के through API call
      await dispatch(
        addUrl({ URL: formData.URL, altText: formData.altText })
      ).unwrap();

      toast.success("Course URL submitted successfully!");
      setFormData({ URL: "", altText: "" });
    } catch (error) {
      console.error("Error submitting course URL:", error);
      toast.error(error.message || "Failed to submit course URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md'
      >
        <ToastContainer position='top-center' autoClose={3000} />

        <div className='space-y-1 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Course URL <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='URL'
            value={formData.URL}
            onChange={handleInputChange}
            placeholder='https://example.com'
            className={`w-full p-2 border ${
              errors.URL ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.URL && (
            <p className='text-red-500 text-xs mt-1'>{errors.URL}</p>
          )}
        </div>

        <div className='space-y-1 mb-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Alt Text <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='altText'
            value={formData.altText}
            onChange={handleInputChange}
            placeholder='Enter descriptive text for the video'
            className={`w-full p-2 border ${
              errors.altText ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.altText && (
            <p className='text-red-500 text-xs mt-1'>{errors.altText}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed'
        >
          {loading ? "Submitting..." : "Submit Course URL"}
        </button>
      </form>
    </div>
  );
};

export default URL;
