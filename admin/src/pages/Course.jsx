import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, X } from "lucide-react";
import { fetchcategory, fetchSubcategory, fetchSubsubcategory } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Course = () => {
  const initialFormState = {
    Coursename: "",
    category: "",
    subCategory: "",
    subsubCategory: "",
    Seat: "",
    Semester: "",
    Price: "",
    URL: "",
    StateCourse: "",
    TrainerName: "",
    TotalStudent: "",
    language: "",
    Lessons: "",
    Instructor: "",
    Durations: "",
    Certification: "",
    CourseDescription: "",
    InstructorCourse: "",
    Review: "",
    Alttage: "",
    LastDate: "",
    payNow: "",
    staticUrl: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaCanonical: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch all categories
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

  // Fetch all subcategories
  useEffect(() => {
    const fetchsubCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchSubcategory();
        if (response.data) {
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to load subcategories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchsubCategories();
  }, []);

  // Fetch all subsubcategories (independent fetch)
  useEffect(() => {
    const fetchAllSubsubcategories = async () => {
      try {
        const response = await fetchSubsubcategory();
        if (response.data) {
          setSubsubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching subsubcategories:", error);
        toast.error("Failed to load subsubcategories. Please try again.");
      }
    };
    fetchAllSubsubcategories();
  }, []);

  // Filter subcategories based on selected category
  useEffect(() => {
    if (formData.category && subCategories.length > 0) {
      const filtered = subCategories.filter(
        (subCat) => subCat.category === formData.category
      );
      setFilteredSubCategories(filtered);
      setFormData((prev) => ({ ...prev, subCategory: "" }));
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.category, subCategories]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Coursename) newErrors.Coursename = "Course name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.Price) newErrors.Price = "Price is required";
    if (imageFiles.length === 0)
      newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleEditorChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      setErrors((prev) => ({
        ...prev,
        images: "You can upload a maximum of 5 images",
      }));
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
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    imageFiles.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      const response = await axios.post(
        "https://backend.aashayeinjudiciary.com/api/course",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Course created successfully!");
      setFormData(initialFormState);
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  // Field configurations
  const basicInfoFields = [
    {
      name: "Coursename",
      label: "Course Name/Type",
      type: "text",
      required: true,
    },
    { name: "Price", label: "Price", type: "number", required: true },
    { name: "URL", label: "Course URL", type: "text" },
    { name: "Alttage", label: "Alt tag", type: "text" },
    { name: "payNow", label: "Pay Now Url", type: "text" },
    { name: "staticUrl", label: "Static Url", type: "text" },
  ];

  const courseDetailsFields = [
    { name: "TrainerName", label: "Faculty", type: "text" },
    { name: "Durations", label: "Validity", type: "text" },
  ];

  const descriptionFields = [
    { name: "CourseDescription", label: "Description", type: "editor" },
    { name: "InstructorCourse", label: "Published/Unpublished", type: "text" },
  ];

  const otherFields = [
    { name: "LastDate", label: "Last Date to Enroll", type: "date" },
  ];
  const seoFields = [
    { name: "metaTitle", label: "Meta Title", type: "text" },
    { name: "metaDescription", label: "Meta Description", type: "text" },
    { name: "metaKeywords", label: "Meta Keywords", type: "text" },
    { name: "metaCanonical", label: "Meta Canonical", type: "text" },
  ];

  // Render category select dropdown
  const renderCategorySelect = () => (
    <div className='space-y-1'>
      <label className='block text-sm font-medium text-gray-700'>
        Category <span className='text-red-500'>*</span>
      </label>
      <select
        name='category'
        value={formData.category}
        onChange={handleInputChange}
        className={`w-full p-2 border ${
          errors.category ? "border-red-500" : "border-gray-300"
        } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      >
        <option value=''>Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className='text-red-500 text-xs mt-1'>{errors.category}</p>
      )}
    </div>
  );

  // Render subcategory select dropdown
  const renderSubCategorySelect = () => (
    <div className='space-y-1'>
      <label className='block text-sm font-medium text-gray-700'>
        Subcategory
      </label>
      <select
        name='subCategory'
        value={formData.subCategory}
        onChange={handleInputChange}
        className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        disabled={!formData.category}
      >
        <option value=''>Select a subcategory</option>
        {filteredSubCategories.map((subCategory) => (
          <option key={subCategory._id} value={subCategory._id}>
            {subCategory.name}
          </option>
        ))}
      </select>
    </div>
  );

  // Render subsubcategory select dropdown (independent dropdown)
  const renderSubsubCategorySelect = () => (
    <div className='space-y-1'>
      <label className='block text-sm font-medium text-gray-700'>
        Sub-subcategory
      </label>
      <select
        name='subsubCategory'
        value={formData.subsubCategory}
        onChange={handleInputChange}
        className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      >
        <option value=''>Select a sub-subcategory (optional)</option>
        {subsubCategories.map((subsubCategory) => (
          <option key={subsubCategory._id} value={subsubCategory._id}>
            {subsubCategory.name}
          </option>
        ))}
      </select>
    </div>
  );

  // Render input field based on type
  const renderInputField = (field) => {
    if (field.type === "editor") {
      return (
        <div key={field.name} className='space-y-1'>
          <label className='block text-sm font-medium text-gray-700'>
            {field.label}
            {field.required && <span className='text-red-500'>*</span>}
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={formData[field.name]}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleEditorChange(field.name, data);
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
          {errors[field.name] && (
            <p className='text-red-500 text-xs mt-1'>{errors[field.name]}</p>
          )}
        </div>
      );
    }

    return (
      <div key={field.name} className='space-y-1'>
        <label className='block text-sm font-medium text-gray-700'>
          {field.label}
          {field.required && <span className='text-red-500'>*</span>}
        </label>
        {field.textarea ? (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            rows={3}
          />
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className={`w-full p-2 border ${
              errors[field.name] ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        )}
        {errors[field.name] && (
          <p className='text-red-500 text-xs mt-1'>{errors[field.name]}</p>
        )}
      </div>
    );
  };

  // Check if selected category is 'test series'
  const isTestSeries = categories.find(
    (cat) =>
      cat._id === formData.category && cat.name.toLowerCase() === "test series"
  );

  // Dynamically filter Course URL field
  const basicInfoFieldsToRender = basicInfoFields.filter((field) => {
    if (field.name === "URL" && isTestSeries) return false;
    return true;
  });

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md'
      >
        <ToastContainer position='top-center' autoClose={3000} />
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Course Registration
        </h2>

        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
            Basic Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {renderCategorySelect()}
            {renderSubCategorySelect()}
            {renderSubsubCategorySelect()}
            {/* //{basicInfoFields.map(renderInputField)} */}
            {basicInfoFieldsToRender.map(renderInputField)}
          </div>
        </div>

        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
            Course Details
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {courseDetailsFields.map(renderInputField)}
          </div>
        </div>

        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
            Descriptions
          </h3>
          <div className='grid grid-cols-1 gap-6'>
            {descriptionFields.map(renderInputField)}
          </div>
        </div>

        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
            Other Information
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {otherFields.map(renderInputField)}
          </div>
        </div>

        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
            SEO
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {seoFields.map(renderInputField)}
          </div>
        </div>

        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Banner Images <span>(Recommended: Width 1200px, Height 650px)</span>
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
            className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 ${
              errors.images ? "border-red-500" : "border-gray-300"
            } border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-500 focus:outline-none ${
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
              type='file'
              name='images'
              accept='image/*'
              multiple
              onChange={handleImageChange}
              className='hidden'
              disabled={imageFiles.length >= 5}
            />
          </label>
          {errors.images && (
            <p className='text-red-500 text-xs mt-1'>{errors.images}</p>
          )}
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center'
        >
          {loading ? (
            <>
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
            </>
          ) : (
            "Create Course"
          )}
        </button>
      </form>
    </div>
  );
};

export default Course;
