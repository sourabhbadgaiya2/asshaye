import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";
import { fetchcategory } from "../pages/SyallbusCategory/api";

const Syllabus = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("");
  const [altText, setAltText] = useState("");
  const [staticUrl, setStaticUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchcategory();
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("PDF size must be less than 10MB");
      return;
    }

    setPdfFile(file);
    setPdfPreview(file.name);
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", courseName);
    formData.append("category", category);
    formData.append("altText", altText);
    formData.append("staticUrl", staticUrl);

    if (pdfFile) {
      formData.append("PDFbrochure", pdfFile);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        // "http://localhost:8000/syllabus/create",
        "http://localhost:8000/syllabus/create",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
          timeout: 30000,
        }
      );

      toast.success("Course created successfully!");
      resetForm();
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response) {
        toast.error(
          `Failed to create course: ${
            err.response.data.error || "Server error"
          }`
        );
      } else if (err.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("Failed to create course. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCourseName("");
    setCategory("");
    setAltText("");
    setPdfFile(null);
    setPdfPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'
    >
      <h2 className='text-2xl font-bold mb-6 text-center'>Add New Course</h2>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Title</label>
        <input
          type='text'
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Category*</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          required
        >
          <option value=''>Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* <div className='mb-4'>
        <label className='block mb-1 font-medium'>Static Url</label>
        <input
          type='text'
          value={staticUrl}
          onChange={(e) => setStaticUrl(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
      </div> */}
      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Alt Text</label>
        <input
          type='text'
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          PDF Brochure {pdfFile ? "(1/1)" : "(0/1)"}
        </label>

        {pdfPreview && (
          <div className='relative group flex items-center bg-white p-2 rounded border border-gray-300 mb-4'>
            <span className='truncate flex-grow'>{pdfPreview}</span>
            <button
              type='button'
              onClick={removePdf}
              className='ml-2 bg-red-500 text-white rounded-full p-1'
            >
              <X size={16} />
            </button>
          </div>
        )}

        <label
          className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
            pdfFile ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className='text-gray-600'>Click to upload PDF</span>
          <input
            type='file'
            accept='application/pdf'
            onChange={handlePdfChange}
            className='hidden'
            disabled={pdfFile !== null}
          />
        </label>
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full py-3 mt-6 bg-blue-800 text-white rounded-md hover:bg-blue-900 disabled:opacity-50'
      >
        {loading ? "Saving..." : "Save Course"}
      </button>

      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme='light'
      />
    </form>
  );
};

export default Syllabus;
