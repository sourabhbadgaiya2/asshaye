import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiDollarSign,
  FiClock,
  FiUser,
  FiCalendar,
  FiHome,
  FiLink,
  FiEye,
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchcategory, fetchSubcategory, fetchSubsubcategory } from "../api";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Use local backend by default; override with VITE_API_BASE in .env
const API_BASE = import.meta.env.VITE_API_BASE || "https://backend.aashayeinjudiciary.com/api";

const CourseDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [editForm, setEditForm] = useState({
    Price: "",
    Durations: "",
    TrainerName: "",
    LastDate: "",
    category: "",
    subCategory: "",
    subsubCategory: "",
    CourseDescription: "",
    InstructorCourse: "",
    URL: "",
    payNow: "",
    staticUrl: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const api = `${API_BASE}/alldisplay`;

  const fetchCourses = async () => {
    try {
      const response = await axios.get(api);
      console.log(response.data, "LOOO");
      setCourses(response.data);
    } catch (error) {
      toast.error("Error fetching course data");
      console.error("Error fetching course data:", error);
    }
  };

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

  useEffect(() => {
    if (editForm.category && subCategories.length > 0) {
      const filtered = subCategories.filter(
        (subCat) => subCat.category === editForm.category
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
      setEditForm((prev) => ({ ...prev, subCategory: "" }));
    }
  }, [editForm.category, subCategories]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const delcourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(
        `${API_BASE}/coursedelte/${id}`
      );
      toast.success("Course deleted successfully");
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      toast.error("Error deleting course");
      console.log("Error deleting course:", error);
    }
  };

  const viewDetails = (id) => {
    const course = courses.find((c) => c._id === id);
    if (course) {
      setViewId(course);
    }
  };

  const startEdit = async (id) => {
    try {
      const res = await axios.get(
        `${API_BASE}/courses/${id}`
      );
      const course = res.data;

      setEditId(id);
      setEditForm({
        Price: course.Price || "",
        Durations: course.Durations || "",
        TrainerName: course.TrainerName || "",
        LastDate: course.LastDate ? course.LastDate.substring(0, 10) : "",
        category: course.category?._id || course.category || "",
        subCategory: course.subCategory?._id || course.subCategory || "",
        subsubCategory:
          course.subsubCategory?._id || course.subsubCategory || "",
        CourseDescription: course.CourseDescription || "",
        InstructorCourse: course.InstructorCourse || "",
        URL: course.URL || "",
        staticUrl: course.staticUrl || "",
        payNow: course.payNow || "",
        images: course.images || [],
        metaTitle: course.metaTitle || "",
        metaDescription: course.metaDescription || "",
        metaKeywords: course.metaKeywords || "",
        metaCanonical: course.metaCanonical || "",
      });

      const categoryId = course.category?._id || course.category;
      if (categoryId) {
        const filteredSubs = subCategories.filter(
          (subCat) => subCat.category == categoryId
        );
        setFilteredSubCategories(filteredSubs);
      }
    } catch (error) {
      toast.error("Error loading course for edit");
      console.error("Error loading course for edit:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (name, value) => {
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = async (id, checked) => {
    const newStatus = !checked;
    try {
      await axios.put(
        `${API_BASE}/${id}/home-visibility`,
        {
          homeVisibility: newStatus,
        }
      );
      fetchCourses();
      toast.success("Visibility updated successfully");
    } catch (error) {
      toast.error("Error updating visibility");
      console.error("Error updating visibility:", error);
    }
  };

  const changeStatus = async (id, homeVisibility) => {
    const confirmToggle = window.confirm(
      "Are you sure you want to change the visibility of this course?"
    );
    if (!confirmToggle) return;

    try {
      await handleToggle(id, homeVisibility);
    } catch (err) {
      console.error("Failed to update course visibility:", err);
      toast.error("Failed to update course visibility. Please try again.");
    }
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();

      Object.keys(editForm).forEach((key) => {
        if (key !== "images") {
          formData.append(key, editForm[key]);
        }
      });

      editForm.images.forEach((image) => {
        formData.append("existingImages", image);
      });

      newImages.forEach((image) => {
        formData.append("images", image);
      });

      imagesToDelete.forEach((image) => {
        formData.append("imagesToDelete", image);
      });

      const response = await axios.put(
        `${API_BASE}/editsave/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Course updated successfully");
      setEditId(null);
      setNewImages([]);
      setImagesToDelete([]);
      fetchCourses();
    } catch (error) {
      toast.error("Error saving course");
      console.error("Error saving course:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      setNewImages(newImages.filter((_, i) => i !== index));
    } else {
      setImagesToDelete([...imagesToDelete, editForm.images[index]]);
      setEditForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const columns = [
     {
    name: "",
    width: "40px",
    cell: () => (
      <div className="cursor-grab text-gray-400 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    ),
  },
    {
      name: "Sr. No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Course Image",
      cell: (row) => (
        <div className='flex items-center justify-center'>
          <img
            src={Array.isArray(row.images) ? row.images[0] : row.images}
            alt='Course'
            className='h-12 w-12 object-cover rounded-lg shadow-sm'
          />
        </div>
      ),
      width: "100px",
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name || "Uncategorized",
      cell: (row) => (
        <span className='px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'>
          {row.category?.name || "Uncategorized"}
        </span>
      ),
    },
    {
      name: "Subcategory",
      selector: (row) => row?.subCategory?.name || "N/A",
      cell: (row) => (
        <span className='px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800'>
          {row.subCategory?.name || "N/A"}
        </span>
      ),
    },
    {
      name: "Judicary",
      selector: (row) => row?.subsubCategory?.name || "N/A",
      cell: (row) => (
        <span className='px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-800'>
          {row.subsubCategory?.name || "N/A"}
        </span>
      ),
    },
    {
      name: "Description",
      cell: (row) => (
        <div
          className='text-sm text-gray-600 line-clamp-2'
          dangerouslySetInnerHTML={{
            __html: row.CourseDescription || "No description",
          }}
        />
      ),
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => row.InstructorCourse,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.InstructorCourse === "Published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.InstructorCourse}
        </span>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      cell: (row) => (
        <div className='flex items-center'>
          <span>₹{row.Price}</span>
        </div>
      ),
    },
    {
      name: "Duration",
      selector: (row) => row.Durations,
      cell: (row) => (
        <div className='flex items-center'>
          <FiClock className='mr-1 text-gray-500' />
          <span>{row.Durations}</span>
        </div>
      ),
    },
    {
      name: "Trainer",
      selector: (row) => row.TrainerName,
      cell: (row) => (
        <div className='flex items-center'>
          <FiUser className='mr-1 text-gray-500' />
          <span>{row.TrainerName}</span>
        </div>
      ),
      width: "150px",
    },
    {
      name: "Static Url",
      selector: (row) => row.staticUrl,
      cell: (row) => (
        <div className='flex items-center'>
          <span>{row.staticUrl.slice(0, 10)}</span>
        </div>
      ),
      width: "150px",
    },
    {
      name: "URL",
      selector: (row) => row.URL,
      cell: (row) => (
        <div className='flex items-center'>
          <FiLink className='mr-1 text-gray-500' />
          <a
            href={row.URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline truncate max-w-xs'
          >
            {row.URL ? "View Link" : "No URL"}
          </a>
        </div>
      ),
      width: "150px",
    },

    {
      name: "Pay Now",
      cell: (row) => (
        <div>
          {row.payNow ? (
            <a
              href={row.payNow}
              target='_blank'
              rel='noopener noreferrer'
              className='text-green-600 hover:underline'
            >
                        Pay Now        {" "}
            </a>
          ) : (
            <span className='text-gray-400'>No Link</span>
          )}
             {" "}
        </div>
      ),
      width: "120px",
    },

    {
      name: "Front display",
      cell: (row) => (
        <button
          onClick={() => changeStatus(row._id, row.homeVisibility)}
          className={`flex items-center gap-1 text-sm px-3 py-1 rounded transition-colors ${
            row.homeVisibility
              ? "bg-green-100 hover:bg-green-200 text-green-800"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          title={row.homeVisibility ? "Visible on home" : "Hidden from home"}
        >
          <FiHome size={14} />
          {row.homeVisibility ? "Visible" : "Hidden"}
        </button>
      ),
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex gap-2'>
          <button
            onClick={() => viewDetails(row._id)}
            className='flex items-center gap-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded transition-colors'
            title='View Details'
          >
            <FiEye size={14} />
          </button>
          <button
            onClick={() => startEdit(row._id)}
            className='flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded transition-colors'
            title='Edit'
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => delcourse(row._id)}
            className='flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm px-3 py-1 rounded transition-colors'
            title='Delete'
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
);

const handleDragEnd = async ({ active, over }) => {
  // Avoid reordering when filtered, to prevent corrupting the full list
  const isFiltered = filterText.trim().length > 0;
  if (isFiltered) {
    toast.warn("Clear search before reordering.");
    return;
  }

  if (!over || active.id === over.id) return;

  // Work from the full list
  const oldIndex = courses.findIndex((c) => c._id === active.id);
  const newIndex = courses.findIndex((c) => c._id === over.id);
  if (oldIndex === -1 || newIndex === -1) return;

  const reordered = arrayMove(courses, oldIndex, newIndex);
  setCourses(reordered);

  // Persist to backend with explicit sortOrder indices
  try {
    const payload = {
      order: reordered.map((c, idx) => ({ id: c._id, sortOrder: idx }))
    };
    await axios.post(
      `${API_BASE}/reorder`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    toast.success("Order saved");
  } catch (err) {
    toast.error("Failed to save order");
    console.error("Reorder error:", err);
  }
};


  const filteredCourses = courses.filter(
    (course) =>
      course.TrainerName?.toLowerCase().includes(filterText.toLowerCase()) ||
      course.category?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      (course.subCategory?.name &&
        course.subCategory.name
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (course.subsubCategory?.name &&
        course.subsubCategory.name
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Course Management
          </h1>

          <div className='relative w-full md:w-96'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FiSearch className='text-gray-400' />
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

        {/* <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <DataTable
            columns={columns}
            data={filteredCourses}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            striped
            responsive
            noDataComponent={
              <div className='p-8 text-center text-gray-500'>
                No courses found. Try adjusting your search.
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
        </div> */}
        

<DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={(filterText.trim() ? filteredCourses : courses).map((c) => c._id)}
    strategy={verticalListSortingStrategy}
  >
    <table className="w-full text-sm text-left text-gray-700">
      <thead className="text-xs uppercase bg-gray-50">
        <tr>
          <th className="px-4 py-3 w-10"></th>
          <th className="px-4 py-3 w-20">Sr. No</th>
          <th className="px-4 py-3">Course Image</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Subcategory</th>
          <th className="px-4 py-3">Judicary</th>
          <th className="px-4 py-3">Description</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Duration</th>
          <th className="px-4 py-3">Trainer</th>
          <th className="px-4 py-3">Static Url</th>
          <th className="px-4 py-3">URL</th>
          <th className="px-4 py-3">Pay Now</th>
          <th className="px-4 py-3">Front display</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(filterText.trim() ? filteredCourses : courses).map((row, idx) => (
          <SortableRow key={row._id} row={row} index={idx} />
        ))}
      </tbody>
    </table>
  </SortableContext>
</DndContext>

{/* simple pagination – replicate DataTable style quickly */}
<div className="flex justify-between items-center p-4 bg-white border-t">
  <span className="text-sm text-gray-600">
    Showing {(filterText.trim() ? filteredCourses : courses).length} courses
  </span>
</div>

        {/* View Details Modal */}
        {viewId && (
          <div className='fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black bg-opacity-50'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-3xl mt-10 max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Course Details
                  </h2>
                  <button
                    onClick={() => setViewId(null)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      Basic Information
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Price
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          ₹{viewId.Price || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Status
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              viewId.InstructorCourse === "Published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {viewId.InstructorCourse}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Duration
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.Durations || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Trainer
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.TrainerName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Last Date
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.LastDate
                            ? new Date(viewId.LastDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>URL</p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.URL ? (
                            <a
                              href={viewId.URL}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-blue-600 hover:underline'
                            >
                              {viewId.URL}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Home Visibility
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.homeVisibility ? "Visible" : "Hidden"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      Category Information
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Category
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.category?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Subcategory
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.subCategory?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Judicary
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewId.subsubCategory?.name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      Course Description
                    </h3>
                    <div
                      className='prose max-w-none text-sm text-gray-900'
                      dangerouslySetInnerHTML={{
                        __html: viewId.CourseDescription || "No description",
                      }}
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      Course Images
                    </h3>
                    <div className='flex flex-wrap gap-4'>
                      {Array.isArray(viewId.images) &&
                      viewId.images.length > 0 ? (
                        viewId.images.map((image, index) => (
                          <div key={index} className='relative'>
                            <img
                              src={image}
                              alt={`Course ${index + 1}`}
                              className='h-32 w-32 object-cover rounded-lg shadow-sm'
                            />
                          </div>
                        ))
                      ) : (
                        <p className='text-sm text-gray-500'>
                          No images available
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mt-6 flex justify-end'>
                  <button
                    onClick={() => setViewId(null)}
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editId && (
          <div className='fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black bg-opacity-50'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-2xl mt-10'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Edit Course Details
                  </h2>
                  <button
                    onClick={() => setEditId(null)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Price (₹)
                    </label>
                    <input
                      type='text'
                      name='Price'
                      value={editForm.Price}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Duration
                    </label>
                    <input
                      type='text'
                      name='Durations'
                      value={editForm.Durations}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Trainer Name
                    </label>
                    <input
                      type='text'
                      name='TrainerName'
                      value={editForm.TrainerName}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Status
                    </label>
                    <select
                      name='InstructorCourse'
                      value={editForm.InstructorCourse}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='Published'>Published</option>
                      <option value='Unpublished'>Unpublished</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Last Date
                    </label>
                    <input
                      type='date'
                      name='LastDate'
                      value={editForm.LastDate}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      URL
                    </label>
                    <input
                      type='url'
                      name='URL'
                      value={editForm.URL}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                      placeholder='https://example.com'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Pay Now
                    </label>
                    <input
                      type='url'
                      name='payNow'
                      value={editForm.payNow}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                      placeholder='https://example.com'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Static Url
                    </label>
                    <input
                      type='text'
                      name='staticUrl'
                      value={editForm.staticUrl}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                      placeholder='do something'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Category
                    </label>
                    <select
                      name='category'
                      value={editForm.category}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
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
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Subcategory
                    </label>
                    <select
                      name='subCategory'
                      value={editForm.subCategory}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                      disabled={!editForm.category}
                    >
                      <option value=''>Select Subcategory</option>
                      {filteredSubCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>
                          {subCategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Judicary
                    </label>
                    <select
                      name='subsubCategory'
                      value={editForm.subsubCategory}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value=''>Select Sub-subcategory</option>
                      {subsubCategories.map((subsubCategory) => (
                        <option
                          key={subsubCategory._id}
                          value={subsubCategory._id}
                        >
                          {subsubCategory.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Course Description
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editForm.CourseDescription}
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
                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      SEO Settings
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Meta Title
                        </label>
                        <input
                          type='text'
                          name='metaTitle'
                          value={editForm.metaTitle}
                          onChange={handleEditChange}
                          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Meta Keywords
                        </label>
                        <input
                          type='text'
                          name='metaKeywords'
                          value={editForm.metaKeywords}
                          onChange={handleEditChange}
                          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Meta Description
                        </label>
                        <textarea
                          name='metaDescription'
                          value={editForm.metaDescription}
                          onChange={handleEditChange}
                          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                          rows='3'
                        />
                      </div>
                      <div className='md:col-span-2'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Canonical URL
                        </label>
                        <input
                          type='text'
                          name='metaCanonical'
                          value={editForm.metaCanonical}
                          onChange={handleEditChange}
                          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Images
                    </label>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {editForm.images.map((image, index) => (
                        <div key={`existing-${index}`} className='relative'>
                          <img
                            src={image}
                            alt={`Course ${index}`}
                            className='h-16 w-16 object-cover rounded'
                          />
                          <button
                            onClick={() => handleRemoveImage(index, false)}
                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                            title='Remove image'
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}

                      {newImages.map((image, index) => (
                        <div key={`new-${index}`} className='relative'>
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`New image ${index}`}
                            className='h-16 w-16 object-cover rounded'
                          />
                          <button
                            onClick={() => handleRemoveImage(index, true)}
                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                            title='Remove image'
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <input
                      type='file'
                      multiple
                      onChange={handleImageUpload}
                      className='block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100'
                      accept='image/*'
                    />
                  </div>
                </div>

                <div className='flex justify-end gap-3'>
                  <button
                    onClick={() => setEditId(null)}
                    className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    <FiSave size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
          theme='colored'
        />
      </div>
    </div>
  );



  function SortableRow({ row, index }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-b hover:bg-gray-50"
    >
      {/* drag handle */}
      <td className="px-2 py-2 cursor-grab">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </td>

      {/* cells copied 1-for-1 from your old columns */}
      <td className="px-2 py-2 text-center">{index + 1}</td>
      <td className="px-2 py-2">
        <img
          src={Array.isArray(row.images) ? row.images[0] : row.images}
          alt="course"
          className="h-12 w-12 object-cover rounded"
        />
      </td>
      <td>
        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          {row.category?.name || "Uncategorized"}
        </span>
      </td>
      <td>
        <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
          {row.subCategory?.name || "N/A"}
        </span>
      </td>
      <td>
        <span className="px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
          {row.subsubCategory?.name || "N/A"}
        </span>
      </td>
      <td
        className="text-sm text-gray-600 line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: row.CourseDescription || "No description",
        }}
      />
      <td>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.InstructorCourse === "Published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.InstructorCourse}
        </span>
      </td>
      <td>₹{row.Price}</td>
      <td>{row.Durations}</td>
      <td>{row.TrainerName}</td>
      <td>{row.staticUrl?.slice(0, 10)}</td>
      <td>
        <a
          href={row.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate"
        >
          {row.URL ? "View Link" : "No URL"}
        </a>
      </td>
      <td>
        {row.payNow ? (
          <a
            href={row.payNow}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            Pay Now
          </a>
        ) : (
          <span className="text-gray-400">No Link</span>
        )}
      </td>
      <td>
        <button
          onClick={() => changeStatus(row._id, row.homeVisibility)}
          className={`flex items-center gap-1 text-sm px-3 py-1 rounded transition-colors ${
            row.homeVisibility
              ? "bg-green-100 hover:bg-green-200 text-green-800"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          <FiHome size={14} />
          {row.homeVisibility ? "Visible" : "Hidden"}
        </button>
      </td>
      <td className="flex gap-2">
        <button
          onClick={() => viewDetails(row._id)}
          className="p-1 text-gray-600 hover:text-gray-800"
          title="View Details"
        >
          <FiEye size={14} />
        </button>
        <button
          onClick={() => startEdit(row._id)}
          className="p-1 text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <FiEdit2 size={14} />
        </button>
        <button
          onClick={() => delcourse(row._id)}
          className="p-1 text-red-600 hover:text-red-800"
          title="Delete"
        >
          <FiTrash2 size={14} />
        </button>
      </td>
    </tr>
  );
}
};

export default CourseDisplay;
