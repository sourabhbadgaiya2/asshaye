import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, X } from "lucide-react";
import { fetchcategory } from "../../api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class MyUploadAdapter {
  constructor(loader, handleImageUpload) {
    this.loader = loader;
    this.handleImageUpload = handleImageUpload;
  }

  upload() {
    return this.loader.file.then((file) => this.handleImageUpload(file));
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

const WhatsNewForm = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [category, setCategory] = useState("");
  const [altText, setAltText] = useState("");
  const [staticUrl, setStaticUrl] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaCanonical, setMetaCanonical] = useState("");
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

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, handleEditorImageUpload);
    };
  }

  const handleEditorImageUpload = async (file) => {
    return new Promise((resolve, reject) => {
      if (imageFiles.length >= 5) {
        toast.error("You can upload a maximum of 5 images");
        reject(new Error("Maximum image limit reached"));
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPEG and PNG images are allowed");
        reject(new Error("Invalid image type"));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        reject(new Error("Image too large"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFiles((prev) => [...prev, file]);
        setImagePreviews((prev) => [...prev, e.target.result]);
        resolve({ default: URL.createObjectURL(file) });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error(
          `Invalid file: ${file.name}. Only JPEG and PNG are allowed.`
        );
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length + imageFiles.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    setImageFiles((prev) => [...prev, ...validFiles.slice(0, 5 - prev.length)]);
    const newPreviews = [];
    validFiles.slice(0, 5 - imageFiles.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        if (
          newPreviews.length === validFiles.length ||
          newPreviews.length === 5 - imageFiles.length
        ) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

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

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", courseName);
    formData.append("description", courseDescription);
    formData.append("category", category);
    formData.append("altText", altText);
    formData.append("staticUrl", staticUrl);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("metaKeywords", metaKeywords);
    formData.append("metaCanonical", metaCanonical);

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    if (pdfFile) {
      formData.append("PDFbrochure", pdfFile);
    }

    for (let [key, value] of formData.entries()) {
      console.log(
        `FormData: ${key} = ${value instanceof File ? value.name : value}`
      );
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://backend.aashayeinjudiciary.com/whatsnew/create",
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
    setStaticUrl("");
    setCourseDescription("");
    setCategory("");
    setAltText("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setMetaCanonical("");
    setImageFiles([]);
    setImagePreviews([]);
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
        <label className='block mb-1 font-medium'>Static Url</label>
        <input
          type='text'
          value={staticUrl}
          onChange={(e) => setStaticUrl(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Meta Title</label>
        <input
          type='text'
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Meta Canonical</label>
        <input
          type='text'
          value={metaCanonical}
          onChange={(e) => setMetaCanonical(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Meta Description</label>
        <input
          type='text'
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Meta Keywords</label>
        <input
          type='text'
          value={metaKeywords}
          onChange={(e) => setMetaKeywords(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Description</label>
        <div className='ckeditor-container border border-gray-300 rounded'>
          <CKEditor
            editor={ClassicEditor}
            data={courseDescription}
            onChange={(event, editor) => {
              const data = editor.getData();
              setCourseDescription(data);
            }}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
              toolbar: {
                items: [
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
              },
              image: {
                toolbar: [
                  "imageTextAlternative",
                  "toggleImageCaption",
                  "imageStyle:inline",
                  "imageStyle:block",
                  "imageStyle:side",
                ],
              },
            }}
          />
        </div>
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
          Course Images ({imageFiles.length}/5)
          <span>(Recommended: Width 1200px, Height 650px)</span>
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
              Drop images or
              <span className='text-primary-600 underline ml-1'>browse</span>
            </span>
            <span className='text-xs text-gray-500'>
              {imageFiles.length >= 5
                ? "Maximum 5 images reached"
                : `Upload up to 5 JPEG/PNG images (${imageFiles.length}/5)`}
            </span>
          </div>
          <input
            type='file'
            accept='image/jpeg,image/png'
            multiple
            onChange={handleImageChange}
            className='hidden'
            disabled={imageFiles.length >= 5}
          />
        </label>
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
          <div className='flex flex-col items-center space-y-2'>
            <Upload className='w-6 h-6 text-gray-500' />
            <span className='font-medium text-gray-600'>
              Drop PDF or
              <span className='text-primary-600 underline ml-1'>browse</span>
            </span>
            <span className='text-xs text-gray-500'>
              {pdfFile ? "Maximum 1 PDF reached" : "Upload 1 PDF"}
            </span>
          </div>
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
        className='w-full py-3 mt-6 bg-blue-800 text-black bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50'
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

export default WhatsNewForm;
