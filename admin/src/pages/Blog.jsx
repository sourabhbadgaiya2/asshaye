import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchcategory } from "../pages/BlogCategory/api";

const Blog = () => {
  const [input, setInput] = useState({
    title: "",
    author: "",
    excerpt: "",
    Alttage: "",
    URL: "",
    LastDate: "",
    Description: "",
    category: "",
    blogUrl: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaCanonical: "",
  });

  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchcategory();
        if (response.data) setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionEditorChange = (event, editor) => {
    const data = editor.getData();
    setInput((prev) => ({ ...prev, Description: data }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      setError("You can upload a maximum of 5 images");
      return;
    }

    const newPreviews = [];
    const validFiles = files.slice(0, 5 - imageFiles.length);

    validFiles.forEach((file) => {
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

    if (
      !input.title ||
      !input.author ||
      !input.Description ||
      !input.category
    ) {
      toast.error(
        "Please fill all required fields (Title, Description, Author, and Category)"
      );
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("author", input.author);
    formData.append("excerpt", input.excerpt);
    formData.append("Alttage", input.Alttage);
    formData.append("Description", input.Description);
    formData.append("LastDate", input.LastDate);
    formData.append("URL", input.URL);
    formData.append("blogUrl", input.blogUrl);
    formData.append("category", input.category);
    formData.append("metaTitle", input.metaTitle);
    formData.append("metaDescription", input.metaDescription);
    formData.append("metaKeywords", input.metaKeywords);
    formData.append("metaCanonical", input.metaCanonical);

    imageFiles.forEach((file) => formData.append("images", file));

    try {
      // const api = "https://backend.aashayeinjudiciary.com/blog/create";
      const api = "http://backend.aashayeinjudiciary.com/blog/create";
      const response = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog post created successfully!");
      setInput({
        title: "",
        author: "",
        excerpt: "",
        Alttage: "",
        Description: "",
        LastDate: "",
        URL: "",
        category: "",
        blogUrl: "",
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
        Create New Blog Post
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <div>
          <label className='block mb-1 font-medium'>Title*</label>
          <input
            type='text'
            name='title'
            value={input.title}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'> Static URL</label>
          <input
            type='text'
            name='blogUrl'
            value={input.blogUrl}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>Alt tag</label>
          <input
            type='text'
            name='Alttage'
            value={input.Alttage}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Author*</label>
          <input
            type='text'
            name='author'
            value={input.author}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Short Description</label>
          <input
            type='text'
            name='excerpt'
            value={input.excerpt}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'> Video URL</label>
          <input
            type='text'
            name='URL'
            value={input.URL}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Last Date</label>
          <input
            type='date'
            name='LastDate'
            value={input.LastDate}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>

        <div>
          <label className='block mb-1 font-medium'>Category*</label>
          <select
            name='category'
            value={input.category}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
            required
          >
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='block mb-1 font-medium'>Meta Title</label>
          <input
            type='text'
            name='metaTitle'
            value={input.metaTitle}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>Meta Description</label>
          <input
            type='text'
            name='metaDescription'
            value={input.metaDescription}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>Meta Keywords</label>
          <input
            type='text'
            name='metaKeywords'
            value={input.metaKeywords}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div>
          <label className='block mb-1 font-medium'>Meta Canonical</label>
          <input
            type='text'
            name='metaCanonical'
            value={input.metaCanonical}
            onChange={handleInput}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
      </div>

      {/* <div className="mb-4">
        <label className="block mb-1 font-medium">Description*</label>
        <div className="ckeditor-container border border-gray-300 rounded">
          <CKEditor
            editor={ClassicEditor}
            data={input.Description}
            onChange={handleDescriptionEditorChange}
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
                "imageUpload",
                "blockQuote",
                "insertTable",
                "undo",
                "redo",
              ],
            }}
          />
        </div>
      </div> */}

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Description*</label>
        <div className='ckeditor-container border border-gray-300 rounded'>
          <CKEditor
            editor={ClassicEditor}
            data={input.Description}
            onChange={handleDescriptionEditorChange}
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
              heading: {
                options: [
                  {
                    model: "paragraph",
                    title: "Paragraph",
                    class: "ck-heading_paragraph",
                  },
                  {
                    model: "heading1",
                    view: "h1",
                    title: "Heading 1",
                    class: "ck-heading_heading1",
                  },
                  {
                    model: "heading2",
                    view: "h2",
                    title: "Heading 2",
                    class: "ck-heading_heading2",
                  },
                  {
                    model: "heading3",
                    view: "h3",
                    title: "Heading 3",
                    class: "ck-heading_heading3",
                  },
                ],
              },
            }}
          />
        </div>
      </div>

      <div className='my-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Images (Max 5)<span> (Recommended: Width 1200px, Height 650px)</span>
        </label>

        {imagePreviews.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4'>
            {imagePreviews.map((preview, index) => (
              <div key={index} className='relative group'>
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className='h-24 w-full object-cover rounded-md border border-gray-300'
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
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400'
      >
        {loading ? "Submitting..." : "Create Blog Post"}
      </button>
    </form>
  );
};

export default Blog;
