// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {
//   fetchcategory,
//   fetchSubcategory,
//   fetchSubsubcategory,
// } from "../../api";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const CourseForm = () => {
//   const [formData, setFormData] = useState({
//     Price: "",
//     testmodule: "",
//     Durations: "",
//     category: "",
//     subcategory: "",
//     altText: "",
//     subsubcategory: "",
//     CourseDescription: "",
//     LastDate: "",
//     images: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [subsubCategories, setSubsubCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);
//   const [filteredSubsubCategories, setFilteredSubsubCategories] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [imagePreview, setImagePreview] = useState("");

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchcategory();
//         if (response.data) {
//           setCategories(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         toast.error("Failed to load categories. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch all subcategories
//   useEffect(() => {
//     const fetchAllSubcategories = async () => {
//       try {
//         const response = await fetchSubcategory();
//         if (response.data) {
//           setSubCategories(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//         toast.error("Failed to load subcategories. Please try again.");
//       }
//     };
//     fetchAllSubcategories();
//   }, []);

//   // Fetch all subsubcategories
//   useEffect(() => {
//     const fetchAllSubsubcategories = async () => {
//       try {
//         const response = await fetchSubsubcategory();
//         if (response.data) {
//           setSubsubCategories(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subsubcategories:", error);
//         toast.error("Failed to load subsubcategories. Please try again.");
//       }
//     };
//     fetchAllSubsubcategories();
//   }, []);

//   // Filter subcategories based on selected category
//   useEffect(() => {
//     if (formData.category && subCategories.length > 0) {
//       const filtered = subCategories.filter(
//         (subCat) => subCat.category === formData.category
//       );
//       setFilteredSubCategories(filtered);
//       // Reset subcategory and subsubcategory when category changes
//       setFormData((prev) => ({ ...prev, subcategory: "", subsubcategory: "" }));
//     } else {
//       setFilteredSubCategories([]);
//       setFilteredSubsubCategories([]);
//     }
//   }, [formData.category, subCategories]);

//   // Filter subsubcategories based on selected subcategory
//   useEffect(() => {
//     if (formData.subcategory && subsubCategories.length > 0) {
//       const selectedSubCategory = subCategories.find(
//         (sub) => sub._id === formData.subcategory
//       );

//       if (selectedSubCategory) {
//         const filtered = subsubCategories.filter(
//           (subsubCat) => subsubCat.subCategory === selectedSubCategory.name
//         );
//         setFilteredSubsubCategories(filtered);

//         if (!filtered.some((item) => item._id === formData.subsubcategory)) {
//           setFormData((prev) => ({ ...prev, subsubcategory: "" }));
//         }
//       }
//     } else {
//       setFilteredSubsubCategories([]);
//       setFormData((prev) => ({ ...prev, subsubcategory: "" }));
//     }
//   }, [formData.subcategory, subsubCategories, subCategories]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files[0],
//     }));

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (name === "images") {
//         setImagePreview(reader.result);
//       }
//     };
//     if (files[0]) {
//       reader.readAsDataURL(files[0]);
//     }
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setFormData((prev) => ({
//       ...prev,
//       CourseDescription: data,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.subcategory)
//       newErrors.subcategory = "Subcategory is required";
//     if (!formData.Price) newErrors.Price = "Price is required";
//     if (!formData.testmodule) newErrors.testmodule = "Module name is required";
//     if (!formData.CourseDescription)
//       newErrors.CourseDescription = "Description is required";
//     if (!formData.images) newErrors.images = "Image is required";
//     // if(!formData.altText) newErrors.altText = "altText"

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const data = new FormData();
//     data.append("Price", formData.Price);
//     data.append("testmodule", formData.testmodule);
//     data.append("Durations", formData.Durations);
//     data.append("category", formData.category);
//     data.append("subcategory", formData.subcategory);
//     data.append("subsubcategory", formData.subsubcategory);
//     data.append("CourseDescription", formData.CourseDescription);
//     data.append("LastDate", formData.LastDate);
//     data.append("images", formData.images);
//     data.append("altText", formData.altText);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://localhost:8000/test/create",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           timeout: 30000,
//         }
//       );

//       toast.success("Course created successfully!");
//       setFormData({
//         Price: "",
//         testmodule: "",
//         Durations: "",
//         category: "",
//         subcategory: "",
//         subsubcategory: "",
//         CourseDescription: "",
//         altText: "",
//         LastDate: "",
//         images: null,
//       });
//       setImagePreview("");
//       setErrors({});
//     } catch (err) {
//       console.error("Submission error:", err);
//       if (err.response) {
//         toast.error(
//           `Failed to create course: ${
//             err.response.data.message || "Server error"
//           }`
//         );
//       } else if (err.code === "ECONNABORTED") {
//         toast.error("Request timed out. Please try again.");
//       } else {
//         toast.error("Failed to create course. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white shadow rounded-lg p-6 sm:p-8">
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Create New Pre test
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Fill in the details below to create a new course
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <label
//                   htmlFor="Price"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   id="Price"
//                   name="Price"
//                   value={formData.Price}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border ${
//                     errors.Price ? "border-red-500" : "border-gray-300"
//                   } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   required
//                 />
//                 {errors.Price && (
//                   <p className="mt-1 text-sm text-red-600">{errors.Price}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="Price"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   altText
//                 </label>
//                 <input
//                   type="text"
//                   id="altText"
//                   name="altText"
//                   value={formData.altText}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border ${
//                     errors.Price ? "border-red-500" : "border-gray-300"
//                   } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                 />
//                 {errors.Price && (
//                   <p className="mt-1 text-sm text-red-600">{errors.altText}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="testmodule"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Test type
//                 </label>
//                 <input
//                   type="text"
//                   id="testmodule"
//                   name="testmodule"
//                   value={formData.testmodule}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border ${
//                     errors.testmodule ? "border-red-500" : "border-gray-300"
//                   } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   required
//                 />
//                 {errors.testmodule && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.testmodule}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="Durations"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Duration
//                 </label>
//                 <input
//                   type="text"
//                   id="Durations"
//                   name="Durations"
//                   value={formData.Durations}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="LastDate"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Last Date
//                 </label>
//                 <input
//                   type="date"
//                   id="LastDate"
//                   name="LastDate"
//                   value={formData.LastDate}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Image Upload Field */}
//             <div>
//               <label
//                 htmlFor="images"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Main Image <span>( Width:510px Height:334px )</span>
//               </label>
//               <input
//                 type="file"
//                 id="images"
//                 name="images"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className={`w-full px-4 py-2 border ${
//                   errors.images ? "border-red-500" : "border-gray-300"
//                 } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                 required
//               />
//               {errors.images && (
//                 <p className="mt-1 text-sm text-red-600">{errors.images}</p>
//               )}
//               {imagePreview && (
//                 <div className="mt-2">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="h-32 object-cover rounded"
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//               <div>
//                 <label
//                   htmlFor="category"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border ${
//                     errors.category ? "border-red-500" : "border-gray-300"
//                   } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   required
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && (
//                   <p className="mt-1 text-sm text-red-600">{errors.category}</p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="subcategory"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Subcategory
//                 </label>
//                 <select
//                   id="subcategory"
//                   name="subcategory"
//                   value={formData.subcategory}
//                   onChange={handleChange}
//                   disabled={!formData.category}
//                   className={`w-full px-4 py-2 border ${
//                     errors.subcategory ? "border-red-500" : "border-gray-300"
//                   } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   required
//                 >
//                   <option value="">Select a subcategory</option>
//                   {filteredSubCategories.map((subcategory) => (
//                     <option key={subcategory._id} value={subcategory._id}>
//                       {subcategory.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.subcategory && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.subcategory}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="subsubcategory"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Sub-subcategory
//                 </label>
//                 <select
//                   id="subsubcategory"
//                   name="subsubcategory"
//                   value={formData.subsubcategory}
//                   onChange={handleChange}
//                   disabled={!formData.subcategory}
//                   className={`w-full px-4 py-2 border ${
//                     errors.subsubcategory ? "border-red-500" : "border-gray-300"
//                   } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                 >
//                   <option value="">Select a sub-subcategory</option>
//                   {filteredSubsubCategories.map((subsubcategory) => (
//                     <option key={subsubcategory._id} value={subsubcategory._id}>
//                       {subsubcategory.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.subsubcategory && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.subsubcategory}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="CourseDescription"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Description
//               </label>
//               <CKEditor
//                 editor={ClassicEditor}
//                 data={formData.CourseDescription}
//                 onChange={handleEditorChange}
//                 config={{
//                   toolbar: [
//                     "heading",
//                     "|",
//                     "bold",
//                     "italic",
//                     "link",
//                     "bulletedList",
//                     "numberedList",
//                     "blockQuote",
//                     "insertTable",
//                     "undo",
//                     "redo",
//                   ],
//                 }}
//               />
//               {errors.CourseDescription && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.CourseDescription}
//                 </p>
//               )}
//             </div>

//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                   loading ? "opacity-70 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Creating...
//                   </>
//                 ) : (
//                   "Create Course"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchcategory,
  fetchSubcategory,
  fetchSubsubcategory,
} from "../../api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    Price: "",
    testmodule: "",
    Durations: "",
    category: "",
    subcategory: "",
    altText: "",
    subsubcategory: "",
    CourseDescription: "",
    LastDate: "",
    images: null,
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

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
    const fetchAllSubcategories = async () => {
      try {
        const response = await fetchSubcategory();
        if (response.data) {
          setSubCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to load subcategories. Please try again.");
      }
    };
    fetchAllSubcategories();
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
      setFormData((prev) => ({ ...prev, subcategory: "" }));
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.category, subCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === "images") {
        setImagePreview(reader.result);
      }
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({
      ...prev,
      CourseDescription: data,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subcategory)
      newErrors.subcategory = "Subcategory is required";
    if (!formData.Price) newErrors.Price = "Price is required";
    if (!formData.testmodule) newErrors.testmodule = "Module name is required";
    if (!formData.CourseDescription)
      newErrors.CourseDescription = "Description is required";
    if (!formData.images) newErrors.images = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append("Price", formData.Price);
    data.append("testmodule", formData.testmodule);
    data.append("Durations", formData.Durations);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("subsubcategory", formData.subsubcategory);
    data.append("CourseDescription", formData.CourseDescription);
    data.append("LastDate", formData.LastDate);
    data.append("images", formData.images);
    data.append("altText", formData.altText);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/test/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        }
      );

      toast.success("Pre-test created successfully!");
      setFormData({
        Price: "",
        testmodule: "",
        Durations: "",
        category: "",
        subcategory: "",
        subsubcategory: "",
        CourseDescription: "",
        altText: "",
        LastDate: "",
        images: null,
      });
      setImagePreview("");
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response) {
        toast.error(
          `Failed to create pre-test: ${
            err.response.data.message || "Server error"
          }`
        );
      } else if (err.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("Failed to create pre-test. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white shadow rounded-lg p-6 sm:p-8'>
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Create New Pre-test
            </h2>
            <p className='text-gray-600 mt-2'>
              Fill in the details below to create a new pre-test
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Category
                </label>
                <select
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value=''>Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className='mt-1 text-sm text-red-600'>{errors.category}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='subcategory'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Subcategory
                </label>
                <select
                  id='subcategory'
                  name='subcategory'
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  className={`w-full px-4 py-2 border ${
                    errors.subcategory ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value=''>Select a subcategory</option>
                  {filteredSubCategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
                {errors.subcategory && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.subcategory}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='subsubcategory'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Sub-subcategory
                </label>
                <select
                  id='subsubcategory'
                  name='subsubcategory'
                  value={formData.subsubcategory}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.subsubcategory ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value=''>Select a sub-subcategory (optional)</option>
                  {subsubCategories.map((subsubcategory) => (
                    <option key={subsubcategory._id} value={subsubcategory._id}>
                      {subsubcategory.name}
                    </option>
                  ))}
                </select>
                {errors.subsubcategory && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.subsubcategory}
                  </p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <div>
                <label
                  htmlFor='testmodule'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Test type
                </label>
                <input
                  type='text'
                  id='testmodule'
                  name='testmodule'
                  value={formData.testmodule}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.testmodule ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.testmodule && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.testmodule}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='Price'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Price
                </label>
                <input
                  type='number'
                  id='Price'
                  name='Price'
                  value={formData.Price}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.Price ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.Price && (
                  <p className='mt-1 text-sm text-red-600'>{errors.Price}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='altText'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Alt Text
                </label>
                <input
                  type='text'
                  id='altText'
                  name='altText'
                  value={formData.altText}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.altText ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.altText && (
                  <p className='mt-1 text-sm text-red-600'>{errors.altText}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='Durations'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Duration
                </label>
                <input
                  type='text'
                  id='Durations'
                  name='Durations'
                  value={formData.Durations}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='LastDate'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Last Date
                </label>
                <input
                  type='date'
                  id='LastDate'
                  name='LastDate'
                  value={formData.LastDate}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>
            </div>

            {/* Image Upload Field */}
            <div>
              <label
                htmlFor='images'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Main Image{" "}
                <span>(Recommended: Width 1200px, Height 650px)</span>
              </label>
              <input
                type='file'
                id='images'
                name='images'
                accept='image/*'
                onChange={handleFileChange}
                className={`w-full px-4 py-2 border ${
                  errors.images ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.images && (
                <p className='mt-1 text-sm text-red-600'>{errors.images}</p>
              )}
              {imagePreview && (
                <div className='mt-2'>
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='h-32 object-cover rounded'
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor='CourseDescription'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Description
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.CourseDescription}
                onChange={handleEditorChange}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "insertTable",
                    "undo",
                    "redo",
                  ],
                }}
              />
              {errors.CourseDescription && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.CourseDescription}
                </p>
              )}
            </div>

            <div className='pt-4'>
              <button
                type='submit'
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
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
                    Creating...
                  </>
                ) : (
                  "Create Pre-test"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
