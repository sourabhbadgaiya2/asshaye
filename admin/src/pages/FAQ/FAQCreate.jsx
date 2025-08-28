// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const FAQCreate = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     response: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:8000/faq/', formData);
//       console.log('FAQ created:', response.data);
//       toast.success('FAQ created successfully!');
//       setTimeout(() => {
//         navigate('/faqshow');
//       }, 1500);
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to create FAQ';
//       setError(errorMessage);
//       toast.error(errorMessage);
//       console.error('Error creating FAQ:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <h1 className="text-2xl font-bold mb-6">Create New FAQ</h1>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Question
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div>
//           <label htmlFor="response" className="block text-sm font-medium text-gray-700">
//             Answer
//           </label>
//           <textarea
//             id="response"
//             name="response"
//             value={formData.response}
//             onChange={handleChange}
//             required
//             rows={4}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//           >
//             {isSubmitting ? 'Creating...' : 'Create FAQ'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FAQCreate;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FAQCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    response: "",
    altText: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
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
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/faq/", formData);
      console.log("FAQ created:", response.data);
      toast.success("FAQ created successfully!");
      setTimeout(() => {
        navigate("/faqshow");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create FAQ";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error creating FAQ:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className='text-2xl font-bold mb-6'>Create New FAQ</h1>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Question
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='response'
            className='block text-sm font-medium text-gray-700'
          >
            Answer
          </label>
          <textarea
            id='response'
            name='response'
            value={formData.response}
            onChange={handleChange}
            required
            rows={4}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border'
          />
        </div>

        <div>
          <label
            htmlFor='altText'
            className='block text-sm font-medium text-gray-700'
          >
            Alt Text (for accessibility)
          </label>
          <input
            type='text'
            id='altText'
            name='altText'
            value={formData.altText}
            onChange={handleChange}
            required
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitting
                ? "bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isSubmitting ? "Creating..." : "Create FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FAQCreate;
