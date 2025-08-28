import React, { useState } from "react";
import axios from "axios";
import { Upload, X } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessStory = () => {
  const [input, setInput] = useState({
    StudentName: "",
    Judicial: "",
    altText: "",
    description: "",
    staticUrl: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      setError("You can upload a maximum of 5 images");
      return;
    }

    const newPreviews = [];
    files.slice(0, 5 - imageFiles.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push(event.target.result);
        if (
          newPreviews.length === files.length ||
          newPreviews.length === 5 - imageFiles.length
        ) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImageFiles((prev) => [...prev, ...files.slice(0, 5 - prev.length)]);
    setError("");
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!input.StudentName || !input.Judicial || !input.altText) {
      toast.error("Please fill all required fields");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("StudentName", input.StudentName);
    formData.append("Judicial", input.Judicial);
    formData.append("altText", input.altText);
    formData.append("description", input.description);
    formData.append("staticUrl", input.staticUrl);
    formData.append("metaTitle", input.metaTitle);
    formData.append("metaDescription", input.metaDescription);
    formData.append("metaKeywords", input.metaKeywords);

    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const api = "http://localhost:8000/success/create";
      const response = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Success story submitted successfully!");
      setInput({
        StudentName: "",
        Judicial: "",
        altText: "",
        description: "",
        staticUrl: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-5xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'
    >
      <ToastContainer position='top-center' />
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Success Story Submission
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block mb-1 font-medium capitalize'>
            Student Name
          </label>
          <input
            type='text'
            name='StudentName'
            value={input.StudentName}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block mb-1 font-medium capitalize'>Judicial</label>
          <input
            type='text'
            name='Judicial'
            value={input.Judicial}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block mb-1 font-medium capitalize'>Alt Text</label>
          <input
            type='text'
            name='altText'
            value={input.altText}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block mb-1 font-medium capitalize'>
            Description (optional)
          </label>
          <textarea
            name='description'
            value={input.description}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
            rows={3}
          />
        </div>
        <div>
          <label className='block mb-1 font-medium capitalize'>
            Static Url
          </label>
          <input
            type='text'
            name='staticUrl'
            value={input.staticUrl}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        {/* <div>
          <label className="block mb-1 font-medium capitalize">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={input.metaTitle}
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium capitalize">Meta Description</label>
          <input
            type="text"
            name="metaDescription"
            value={input.metaDescription}
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium capitalize">Meta Keywords</label>
          <input
            type="text"
            name="metaKeywords"
            value={input.metaKeywords}
            onChange={handleInput}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div> */}
      </div>

      <div className='my-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Images (Max 5) <span>( Width: 1250px Height: 1250px )</span>
        </label>

        {imagePreviews.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4'>
            {imagePreviews.map((preview, index) => (
              <div key={index} className='relative group'>
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className='h-24 w-24 object-cover rounded-md border border-gray-300'
                />
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
            imageFiles.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className='flex flex-col items-center space-y-2'>
            <Upload className='w-6 h-6 text-gray-500' />
            <span className='font-medium text-gray-600'>
              Drop files or{" "}
              <span className='text-primary-600 underline ml-1'>browse</span>
            </span>
            <span className='text-xs text-gray-500'>
              {imageFiles.length >= 5
                ? "Maximum 5 images reached"
                : `Upload up to 5 images (${imageFiles.length}/5)`}
            </span>
          </div>
          <input
            type='file'
            name='images'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='hidden'
            disabled={imageFiles.length >= 5}
          />
        </label>
      </div>

      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default SuccessStory;
