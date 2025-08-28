import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiSave,
  FiClock,
  FiDollarSign,
  FiUser,
  FiCalendar,
  FiLink,
  FiImage,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

const OtherCourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [viewingCourse, setViewingCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize DOMPurify
  const sanitize = DOMPurify.sanitize;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/othercourse");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/othercourse/${id}`);
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error("Error deleting course");
      console.error("Error deleting course:", error);
    }
  };

  const handleView = (course) => {
    setViewingCourse(course);
    setIsViewModalOpen(true);
  };

  const handleEdit = (course) => {
    setEditingCourse({
      ...course,
      images: Array.isArray(course.images)
        ? course.images
        : [course.images].filter(Boolean),
    });
    setImagePreviews(
      Array.isArray(course.images)
        ? course.images
        : [course.images].filter(Boolean)
    );
    setNewImages([]);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditingCourse((prev) => ({
      ...prev,
      CourseDescription: data,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + editingCourse.images.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    const newPreviews = [];
    const validFiles = files.slice(0, 5 - editingCourse.images.length);

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

    setNewImages((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (index, isNew) => {
    if (isNew) {
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index, 1);
      setNewImages(updatedNewImages);

      const updatedPreviews = [...imagePreviews];
      updatedPreviews.splice(index + editingCourse.images.length, 1);
      setImagePreviews(updatedPreviews);
    } else {
      const updatedImages = [...editingCourse.images];
      updatedImages.splice(index, 1);
      setEditingCourse((prev) => ({
        ...prev,
        images: updatedImages,
      }));

      const updatedPreviews = [...imagePreviews];
      updatedPreviews.splice(index, 1);
      setImagePreviews(updatedPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append all course data fields
      Object.entries(editingCourse).forEach(([key, value]) => {
        if (key !== "images" && value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      // Append new image files
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      // Try both PUT and POST methods with different endpoints
      try {
        // First try PUT request to standard endpoint
        await axios.put(
          `http://localhost:8000/othercourse/${editingCourse._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (putError) {
        // If PUT fails, try POST to update endpoint
        console.log("PUT failed, trying POST...");
        await axios.post(
          `http://localhost:8000/othercourse/update/${editingCourse._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success("Course updated successfully");
      setIsEditModalOpen(false);
      fetchCourses();
    } catch (error) {
      console.error("Full error:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status code:", error.response?.status);

      toast.error(
        error.response?.data?.message ||
          "Failed to update course. Please verify the endpoint and method."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Image",
      cell: (row) => (
        <div className='flex items-center justify-center'>
          {row.images && row.images[0] ? (
            <img
              src={Array.isArray(row.images) ? row.images[0] : row.images}
              alt={row.altText || "Course"}
              className='w-12 h-12 object-cover rounded-md'
            />
          ) : (
            <div className='w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center'>
              <FiImage className='text-gray-400' />
            </div>
          )}
        </div>
      ),
      width: "80px",
    },
    {
      name: "Course Name",
      selector: (row) => row.Coursename,
      sortable: true,
      cell: (row) => (
        <div className='font-medium text-gray-800'>
          {row.Coursename || "N/A"}
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      cell: (row) => (
        <div className='flex items-center'>
          <FiDollarSign className='mr-1 text-gray-500' />
          <span>{row.Price || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Trainer",
      selector: (row) => row.TrainerName,
      cell: (row) => (
        <div className='flex items-center'>
          <FiUser className='mr-1 text-gray-500' />
          <span>{row.TrainerName || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.Durations,
      cell: (row) => (
        <div className='flex items-center'>
          <FiClock className='mr-1 text-gray-500' />
          <span>{row.Durations || "N/A"}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => (
        <div className='flex flex-col'>
          <div className='flex items-start'>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(
                  expandedDescriptions[row._id]
                    ? row.CourseDescription || "No description"
                    : row.CourseDescription
                    ? row.CourseDescription.length > 100
                      ? row.CourseDescription.substring(0, 100) + "..."
                      : row.CourseDescription
                    : "No description"
                ),
              }}
              className='prose prose-sm max-w-none'
              style={{ maxWidth: "300px", overflowWrap: "break-word" }}
            />
          </div>
          {row.CourseDescription && row.CourseDescription.length > 100 && (
            <button
              onClick={() => toggleDescription(row._id)}
              className='text-blue-600 text-sm mt-1 flex items-center self-end'
            >
              {expandedDescriptions[row._id] ? (
                <>
                  <span>Show Less</span>
                  <FiChevronUp className='ml-1' />
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <FiChevronDown className='ml-1' />
                </>
              )}
            </button>
          )}
        </div>
      ),
      width: "300px",
    },
    {
      name: "Last Date",
      selector: (row) => row.LastDate,
      cell: (row) => (
        <div className='flex items-center'>
          <FiCalendar className='mr-1 text-gray-500' />
          <span>
            {row.LastDate ? new Date(row.LastDate).toLocaleDateString() : "N/A"}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex gap-2'>
          <button
            onClick={() => handleView(row)}
            className='flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-600 text-sm px-3 py-1 rounded transition-colors'
            title='View Details'
          >
            <FiEye size={14} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className='flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded transition-colors'
            title='Edit'
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className='flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm px-3 py-1 rounded transition-colors'
            title='Delete'
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    if (!course) return false;
    const searchString = filterText.toLowerCase();
    return (
      (course.Coursename?.toLowerCase() || "").includes(searchString) ||
      (course.TrainerName?.toLowerCase() || "").includes(searchString) ||
      (course.Durations?.toLowerCase() || "").includes(searchString) ||
      (course.CourseDescription?.toLowerCase() || "").includes(searchString)
    );
  });

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Other Courses
          </h1>

          <div className='relative w-full md:w-96'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiEye className='text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search courses...'
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>

        {/* View Modal */}
        {isViewModalOpen && viewingCourse && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-bold text-gray-800'>
                    {viewingCourse.Coursename}
                  </h2>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      toast.info("Course details closed");
                    }}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='md:col-span-2'>
                    {viewingCourse.images &&
                      viewingCourse.images.length > 0 && (
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
                          {Array.isArray(viewingCourse.images) ? (
                            viewingCourse.images.map((img, index) => (
                              <div key={index} className='relative'>
                                <img
                                  src={img}
                                  alt={`${viewingCourse.altText || "Course"} ${
                                    index + 1
                                  }`}
                                  className='w-full h-48 object-cover rounded-lg'
                                />
                              </div>
                            ))
                          ) : (
                            <div className='relative'>
                              <img
                                src={viewingCourse.images}
                                alt={viewingCourse.altText || "Course"}
                                className='w-full h-48 object-cover rounded-lg'
                              />
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiDollarSign className='mr-2' /> Price
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse.Price || "N/A"}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiUser className='mr-2' /> Trainer
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse.TrainerName || "N/A"}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiClock className='mr-2' /> Duration
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse.Durations || "N/A"}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiCalendar className='mr-2' /> Last Date to Enroll
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse.LastDate
                          ? new Date(
                              viewingCourse.LastDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        Alt Text
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse.altText || "N/A"}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiLink className='mr-2' /> Course URL
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse.URL ? (
                          <a
                            href={viewingCourse.URL}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 hover:underline'
                          >
                            {viewingCourse.URL}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        Status
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse.InstructorCourse || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        Static Url
                      </h3>
                      <p className='text-gray-600'>
                        {viewingCourse?.staticUrl || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-semibold text-gray-700 mb-2'>
                      Description
                    </h3>
                    <div
                      className='prose max-w-none bg-gray-50 p-4 rounded-lg'
                      dangerouslySetInnerHTML={{
                        __html: sanitize(
                          viewingCourse.CourseDescription ||
                            "No description available"
                        ),
                      }}
                    />
                  </div>
                </div>

                <div className='mt-6 flex justify-end'>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      toast.info("Course details closed");
                    }}
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editingCourse && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-bold text-gray-800'>
                    Edit Course: {editingCourse.Coursename}
                  </h2>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Course Name*
                      </label>
                      <input
                        type='text'
                        name='Coursename'
                        value={editingCourse.Coursename || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Price (₹)*
                      </label>
                      <input
                        type='number'
                        name='Price'
                        value={editingCourse.Price || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Trainer Name*
                      </label>
                      <input
                        type='text'
                        name='TrainerName'
                        value={editingCourse.TrainerName || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Duration*
                      </label>
                      <input
                        type='text'
                        name='Durations'
                        value={editingCourse.Durations || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Alt Text
                      </label>
                      <input
                        type='text'
                        name='altText'
                        value={editingCourse.altText || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Last Date to Enroll
                      </label>
                      <input
                        type='date'
                        name='LastDate'
                        value={
                          editingCourse.LastDate
                            ? new Date(editingCourse.LastDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Course URL
                      </label>
                      <input
                        type='url'
                        name='URL'
                        value={editingCourse.URL || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='https://example.com (optional)'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Static URL
                      </label>
                      <input
                        type='text'
                        name='staticUrl'
                        value={editingCourse.staticUrl || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Static_Url'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Status
                      </label>
                      <select
                        name='InstructorCourse'
                        value={editingCourse.InstructorCourse || "Published"}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      >
                        <option value='Published'>Published</option>
                        <option value='Unpublished'>Unpublished</option>
                      </select>
                    </div>

                    <div className='md:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Images (Max 5)
                      </label>
                      <div className='flex flex-wrap gap-4 mb-4'>
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className='relative'>
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className='h-24 w-24 object-cover rounded-lg'
                            />
                            <button
                              type='button'
                              onClick={() =>
                                removeImage(
                                  index,
                                  index >= editingCourse.images.length
                                )
                              }
                              className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600'
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={handleImageChange}
                        className='block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100'
                        disabled={imagePreviews.length >= 5}
                      />
                      <p className='mt-1 text-xs text-gray-500'>
                        {imagePreviews.length >= 5
                          ? "Maximum 5 images reached"
                          : `You can upload ${
                              5 - imagePreviews.length
                            } more images`}
                      </p>
                    </div>

                    <div className='md:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Description*
                      </label>
                      <div className='border border-gray-300 rounded-lg overflow-hidden'>
                        <CKEditor
                          editor={ClassicEditor}
                          data={editingCourse.CourseDescription || ""}
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
                              "|",

                              "blockQuote",
                              "insertTable",
                              "undo",
                              "redo",
                            ],
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end gap-3 pt-6'>
                    <button
                      type='button'
                      onClick={() => setIsEditModalOpen(false)}
                      className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50'
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave size={18} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* DataTable */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <DataTable
            columns={columns}
            data={filteredCourses}
            progressPending={loading}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            responsive
            noDataComponent={
              <div className='p-8 text-center text-gray-500'>
                {loading
                  ? "Loading..."
                  : "No courses found. Try adjusting your search."}
              </div>
            }
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#f9fafb",
                  fontWeight: "600",
                  color: "#374151",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                },
              },
              cells: {
                style: {
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherCourseManager;
