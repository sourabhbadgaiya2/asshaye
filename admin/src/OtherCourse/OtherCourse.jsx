import React, { useState } from "react";
import axios from "axios";
import {
  FiDollarSign,
  FiClock,
  FiUser,
  FiCalendar,
  FiLink,
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    Price: "",
    Durations: "",
    TrainerName: "",
    LastDate: "",
    CourseDescription: "",
    Coursename: "",
    altText: "",
    InstructorCourse: "Published",
    URL: "",
    staticUrl: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (name, value) => {
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreviews([event.target.result]);
    };
    reader.readAsDataURL(file);

    setImageFiles([file]);
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append all course data fields
      Object.entries(courseData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append image files
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post("http://localhost:8000/othercourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      // Reset form after successful submission
      setCourseData({
        Price: "",
        Durations: "",
        TrainerName: "",
        LastDate: "",
        CourseDescription: "",
        altText: "",
        Coursename: "",
        InstructorCourse: "Published",
        URL: "",
        staticUrl: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Create New Course
      </h2>

      {success && (
        <div className='mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded'>
          Course created successfully!
        </div>
      )}

      {error && (
        <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
          Error: {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className='space-y-6'
        encType='multipart/form-data'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              Price (₹)
            </label>
            <input
              type='number'
              name='Price'
              value={courseData.Price}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              <FiClock className='mr-2' /> Coursename
            </label>
            <input
              type='text'
              name='Coursename'
              value={courseData.Coursename}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              <FiClock className='mr-2' /> Duration
            </label>
            <input
              type='text'
              name='Durations'
              value={courseData.Durations}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              <FiUser className='mr-2' /> Trainer Name
            </label>
            <input
              type='text'
              name='TrainerName'
              value={courseData.TrainerName}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              <FiUser className='mr-2' /> AltText
            </label>
            <input
              type='text'
              name='altText'
              value={courseData.altText}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              required
            />
          </div>

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              <FiCalendar className='mr-2' /> Last Date to Enroll
            </label>
            <input
              type='date'
              name='LastDate'
              value={courseData.LastDate}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              <FiLink className='mr-2' /> Course URL
            </label>
            <input
              type='url'
              name='URL'
              value={courseData.URL}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='https://example.com'
            />
          </div>
          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700 flex items-center'>
              <FiLink className='mr-2' /> Static URL
            </label>
            <input
              type='text'
              name='staticUrl'
              value={courseData.staticUrl}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Static_Url'
            />
          </div>

          <div className='space-y-1'>
            <label className='block text-sm font-medium text-gray-700'>
              Status
            </label>
            <select
              name='InstructorCourse'
              value={courseData.InstructorCourse}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            >
              <option value='Published'>Published</option>
              <option value='Unpublished'>Unpublished</option>
            </select>
          </div>
        </div>

        <div className='space-y-1'>
          <label className='block text-sm font-medium text-gray-700'>
            Course Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={courseData.CourseDescription}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleEditorChange("CourseDescription", data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",

                "blockQuote",
                "insertTable",
                "undo",
                "redo",
              ],
            }}
          />
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Images
            <span>(Recommended: Width 1200px, Height 650px)</span>
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100'
          />
          {errors.images && (
            <p className='mt-2 text-sm text-red-600'>{errors.images}</p>
          )}

          {/* Image previews */}
          <div className='flex flex-wrap gap-4 mt-4'>
            {imagePreviews.map((preview, index) => (
              <div key={index} className='relative'>
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className='h-24 w-24 object-cover rounded'
                />
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={submitting}
            className='px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {submitting ? "Submitting..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
