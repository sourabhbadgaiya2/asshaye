import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Upload, X } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createChoose } from "../Choose/ChooseSlice";

const Choose = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    Title: "",
    keywordone: "",
    keywordtwo: "",
    keywordthree: "",
    keywordfour: "",
    keywordfive: "",
    keywordsix: "",
    altText: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaCanonical: "",
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
    const maxImages = 5;

    if (files.length + imageFiles.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} images`);
      return;
    }

    const validFiles = files.slice(0, maxImages - imageFiles.length);
    const newPreviews = [];

    validFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload only image files");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push(event.target.result);
        if (newPreviews.length === validFiles.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImageFiles((prev) => [...prev, ...validFiles]);
    setError("");
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.Title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!input.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value.trim());
    });
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      await dispatch(createChoose(formData)).unwrap();
      toast.success("Why Choose Us content submitted successfully!");
      setInput({
        Title: "",
        keywordone: "",
        keywordtwo: "",
        keywordthree: "",
        keywordfour: "",
        keywordfive: "",
        keywordsix: "",
        altText: "",
        description: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        metaCanonical: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
    } catch (err) {
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-5xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'
    >
      <ToastContainer position='top-center' autoClose={3000} />
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Why Choose Us Content
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        {[
          "Title",
          "keywordone",
          "keywordtwo",
          "keywordthree",
          "keywordfour",
          "keywordfive",
          "keywordsix",
          "altText",
        ].map((key) => (
          <div className='mb-4' key={key}>
            <label className='block mb-1 font-medium capitalize'>
              {key}
              {key === "Title" && <span className='text-red-500 ml-1'>*</span>}
            </label>
            <input
              type='text'
              name={key}
              value={input[key]}
              onChange={handleInput}
              className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              required={key === "Title"}
            />
          </div>
        ))}
        <div className='md:col-span-2 mb-4'>
          <label className='block mb-1 font-medium capitalize'>
            Description
            <span className='text-red-500 ml-1'>*</span>
          </label>
          <textarea
            name='description'
            value={input.description}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
            rows={4}
          />
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
          SEO
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[
            "metaTitle",
            "metaDescription",
            "metaKeywords",
            "metaCanonical",
          ].map((key) => (
            <div key={key}>
              <label className='block mb-1 font-medium capitalize'>
                {key.replace("meta", "Meta ")}
              </label>
              <input
                type='text'
                name={key}
                value={input[key]}
                onChange={handleInput}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
          ))}
        </div>
      </div>

      <div className='my-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Images (Max 5) <span>( Width: 826px Height:826px )</span>
          <span className='text-red-500 ml-1'>*</span>
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
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          htmlFor='image-upload'
          className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            imageFiles.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className='flex flex-col items-center space-y-2'>
            <Upload className='w-6 h-6 text-gray-500' />
            <span className='font-medium text-gray-600'>
              Drop files or{" "}
              <span className='text-blue-600 underline ml-1'>browse</span>
            </span>
            <span className='text-xs text-gray-500'>
              {imageFiles.length >= 5
                ? "Maximum 5 images reached"
                : `Upload up to 5 images (${imageFiles.length}/5)`}
            </span>
          </div>
          <input
            id='image-upload'
            type='file'
            name='images'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            className='hidden'
            disabled={imageFiles.length >= 5}
          />
        </label>
        {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? (
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
            Submitting...
          </span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default Choose;
