import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiEdit,
  FiTrash2,
  FiX,
  FiSave,
  FiPlus,
  FiExternalLink,
  FiEye,
} from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchcategory } from "../pages/BlogCategory/api";

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null); // New state for viewing blog
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    excerpt: "",
    Description: "",
    category: "",
    URL: "",
    Alttage: "",
    LastDate: "",
    blogUrl: "",
    images: [],
    newImages: null,
    previewImages: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaCanonical: "",
  });

  // Clean up blob URLs when component unmounts or form closes
  useEffect(() => {
    return () => {
      editFormData.previewImages.forEach((img) => {
        if (img.startsWith("blob:")) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [editFormData.previewImages]);

  // Fetch categories
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

  // const API_BASE_URL = "https://backend.aashayeinjudiciary.com/blog";
  const API_BASE_URL = "https://backend.aashayeinjudiciary.com/blog";

  const fetchBlogs = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/display`);
      const blogsArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      const formattedBlogs = blogsArray.map((blog) => ({
        ...blog,
        images: blog.images
          ? Array.isArray(blog.images)
            ? blog.images.map((img) =>
                img.startsWith("http")
                  ? img
                  : `${API_BASE_URL.replace("/blog", "")}/${img}`
              )
            : [`${API_BASE_URL.replace("/blog", "")}/${blog.images}`]
          : [],
      }));

      setBlogs(formattedBlogs);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
      toast.error("Error fetching blogs");
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting blog");
    }
  };

  const handleViewClick = (blog) => {
    setViewingBlog(blog);
  };

  const handleEditClick = (blog) => {
    setEditFormData({
      title: blog.title,
      author: blog.author,
      excerpt: blog.excerpt,
      Description: blog.Description || "",
      category: blog?.BlogCategory?._id || "",
      URL: blog.URL || "",
      blogUrl: blog.blogUrl || "",
      Alttage: blog.Alttage,
      LastDate: blog.LastDate?.split("T")[0] || "",
      images: blog.images || [],
      newImages: null,
      previewImages: blog.images || [],
      metaTitle: blog.seo?.title || "",
      metaDescription: blog.seo?.description || "",
      metaKeywords: blog.seo?.keywords || "",
      metaCanonical: blog.seo?.canonical || "",
    });
    setEditingBlog(blog._id);
    setIsEditFormOpen(true);
  };

  const handleAddNew = () => {
    setEditFormData({
      title: "",
      author: "",
      excerpt: "",
      Description: "",
      category: "",
      URL: "",
      blogUrl: "",
      Alttage: "",
      LastDate: "",
      images: [],
      newImages: null,
      previewImages: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaCanonical: "",
    });
    setEditingBlog(null);
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", editFormData.title);
      formData.append("author", editFormData.author);
      formData.append("excerpt", editFormData.excerpt);
      formData.append("Description", editFormData.Description);
      formData.append("category", editFormData.category);
      formData.append("Alttage", editFormData.Alttage);

      if (editFormData.URL) {
        formData.append("URL", editFormData.URL);
        formData.append("blogUrl", editFormData.blogUrl);
      }

      formData.append("LastDate", editFormData.LastDate);

      if (editingBlog) {
        formData.append("id", editingBlog);
      }

      // Append SEO fields
      formData.append("metaTitle", editFormData.metaTitle);
      formData.append("metaDescription", editFormData.metaDescription);
      formData.append("metaKeywords", editFormData.metaKeywords);
      formData.append("metaCanonical", editFormData.metaCanonical);

      if (editFormData.newImages && editFormData.newImages.length > 0) {
        Array.from(editFormData.newImages).forEach((file) => {
          formData.append("images", file);
        });
      }

      if (
        editingBlog &&
        editFormData.images &&
        editFormData.images.length > 0
      ) {
        editFormData.images.forEach((img) => {
          if (!img.startsWith("blob:")) {
            formData.append("images", img);
          }
        });
      }

      const endpoint = editingBlog
        ? `${API_BASE_URL}/editsave`
        : `${API_BASE_URL}/create`;

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchBlogs();
      toast.success(`Blog ${editingBlog ? "updated" : "created"} successfully`);
      setIsEditFormOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      toast.error(
        `Error ${editingBlog ? "updating" : "creating"} blog: ${err.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditFormData((prev) => ({
      ...prev,
      Description: data,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    const previewUrls = [];
    for (let i = 0; i < files.length; i++) {
      previewUrls.push(URL.createObjectURL(files[i]));
    }

    setEditFormData((prev) => ({
      ...prev,
      newImages: files,
      previewImages: [...prev.images, ...previewUrls],
    }));
  };

  const removeImage = (index, isNew = false) => {
    if (isNew) {
      const updatedFiles = Array.from(editFormData.newImages).filter(
        (_, i) => i !== index
      );
      const updatedPreviews = editFormData.previewImages.filter(
        (_, i) => i !== index
      );

      setEditFormData((prev) => ({
        ...prev,
        newImages: updatedFiles,
        previewImages: updatedPreviews,
      }));
    } else {
      const updatedImages = editFormData.images.filter((_, i) => i !== index);

      setEditFormData((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const columns = [
    {
      name: "Sr. No",
      cell: (row, index) => index + 1,
      width: "80px",
      sortable: false,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => <div className='font-medium'>{row.title}</div>,
      width: "200px",
    },
    {
      name: "Alttage",
      selector: (row) => row.Alttage,
      sortable: true,
      cell: (row) => <div className='font-medium'>{row.Alttage}</div>,
      width: "200px",
    },
    {
      name: "Author",
      selector: (row) => row.author,
      sortable: true,
      width: "150px",
    },
    {
      name: "BlogCategory",
      selector: (row) => row?.BlogCategory?.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Excerpt",
      cell: (row) => (
        <div className='text-gray-600 line-clamp-2'>{row.excerpt}</div>
      ),
      width: "250px",
    },
    {
      name: "URL",
      cell: (row) =>
        row.URL ? (
          <a
            href={row.URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline flex items-center gap-1 truncate'
            title={row.URL}
          >
            <FiExternalLink size={14} />
            <span className='truncate'>{row.URL}</span>
          </a>
        ) : (
          <span className='text-gray-400'>No URL</span>
        ),
      width: "200px",
    },
    {
      name: "Last Updated",
      cell: (row) => (
        <div className='text-gray-600'>{formatDate(row.LastDate)}</div>
      ),
      width: "120px",
    },
    {
      name: "Images",
      cell: (row) => (
        <div className='flex gap-2'>
          {row.images?.[0] ? (
            <div className='relative group'>
              <img
                src={row.images[0]}
                alt='Blog thumbnail'
                className='w-16 h-12 object-cover rounded border hover:shadow-md transition-all'
              />
              {row.images.length > 1 && (
                <div className='absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  +{row.images.length - 1}
                </div>
              )}
            </div>
          ) : (
            <div className='w-16 h-12 border-2 border-dashed rounded flex items-center justify-center text-gray-400'>
              <FaImage size={16} />
            </div>
          )}
        </div>
      ),
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex gap-2'>
          <button
            onClick={() => handleViewClick(row)}
            className='p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors'
            title='View'
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={() => handleEditClick(row)}
            className='p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors'
            title='Edit'
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className='p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors'
            title='Delete'
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  const filteredBlogs = blogs.filter(
    (item) =>
      item.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.author?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.Alttage?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.Description?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.BlogCategory?.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className='p-4 md:p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4'>
          <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>
            Blog Management
          </h1>
          <div className='flex gap-3'>
            <input
              type='text'
              placeholder='Search blogs...'
              className='w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <button
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap'
              onClick={handleAddNew}
            >
              <FiPlus size={18} />
              Add Blog
            </button>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8'>
          {loading ? (
            <div className='p-8 flex justify-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : error ? (
            <div className='p-8 text-center text-red-500'>
              Error loading blogs: {error}
              <button
                onClick={fetchBlogs}
                className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              >
                Retry
              </button>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredBlogs}
              noDataComponent={
                <div className='p-8 text-center text-gray-500'>
                  No blogs found.{" "}
                  {filterText
                    ? "Try a different search."
                    : "Add your first blog to get started."}
                </div>
              }
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 20, 50]}
              highlightOnHover
              responsive
              striped
              persistTableHead
              customStyles={{
                headCells: {
                  style: {
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    backgroundColor: "#f9fafb",
                    color: "#374151",
                  },
                },
                cells: {
                  style: {
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                  },
                },
              }}
            />
          )}
        </div>

        {/* View Blog Modal */}
        {viewingBlog && (
          <div className='fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg shadow-lg w-full max-w-4xl mt-10 max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Blog Details
                  </h2>
                  <button
                    onClick={() => setViewingBlog(null)}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <FiX size={24} />
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
                          Title
                        </p>
                        <p className='mt-1 text-sm text-gray-900 font-medium'>
                          {viewingBlog.title || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Alttage
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewingBlog.Alttage || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Author
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewingBlog.author || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Category
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewingBlog.BlogCategory?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>URL</p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {viewingBlog.URL ? (
                            <a
                              href={viewingBlog.URL}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-blue-600 hover:underline'
                            >
                              {viewingBlog.URL}
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Last Updated
                        </p>
                        <p className='mt-1 text-sm text-gray-900'>
                          {formatDate(viewingBlog.LastDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      Excerpt
                    </h3>
                    <div className='bg-gray-50 p-4 rounded-md'>
                      <p className='text-gray-700'>
                        {viewingBlog.excerpt || "No excerpt available"}
                      </p>
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      Description
                    </h3>
                    <div
                      className='prose max-w-none text-gray-700'
                      dangerouslySetInnerHTML={{
                        __html: viewingBlog.Description || "No description",
                      }}
                    />
                  </div>

                  {viewingBlog.images && viewingBlog.images.length > 0 && (
                    <div className='md:col-span-2'>
                      <h3 className='text-lg font-medium text-gray-900 mb-2'>
                        Images
                      </h3>
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {viewingBlog.images.map((image, index) => (
                          <div key={index} className='relative'>
                            <img
                              src={image}
                              alt={`Blog ${index + 1}`}
                              className='w-full h-48 object-cover rounded-lg shadow-sm'
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className='mt-6 flex justify-end'>
                  <button
                    onClick={() => setViewingBlog(null)}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEditFormOpen && (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {editingBlog ? "Edit Blog" : "Add New Blog"}
              </h2>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Title*
                  </label>
                  <input
                    type='text'
                    name='title'
                    value={editFormData.title}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Blog URL
                  </label>
                  <input
                    type='text'
                    name='blogUrl'
                    value={editFormData.blogUrl}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Do Something'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Alttage*
                  </label>
                  <input
                    type='text'
                    name='Alttage'
                    value={editFormData.Alttage}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Author*
                  </label>
                  <input
                    type='text'
                    name='author'
                    value={editFormData.author}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Category*
                  </label>
                  <select
                    name='category'
                    value={editFormData.category}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Short Description*
                  </label>
                  <textarea
                    name='excerpt'
                    value={editFormData.excerpt}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    rows='3'
                    required
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <div className='border border-gray-300 rounded-md overflow-hidden'>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editFormData.Description}
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

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Video URL (Optional)
                  </label>
                  <input
                    type='url'
                    name='URL'
                    value={editFormData.URL}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='https://example.com'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Last Updated
                  </label>
                  <input
                    type='date'
                    name='LastDate'
                    value={editFormData.LastDate}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
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
                      value={editFormData.metaTitle}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Meta Keywords
                    </label>
                    <input
                      type='text'
                      name='metaKeywords'
                      value={editFormData.metaKeywords}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Meta Description
                    </label>
                    <textarea
                      name='metaDescription'
                      value={editFormData.metaDescription}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                      value={editFormData.metaCanonical}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {editingBlog ? "Update Images" : "Upload Images"}
                </label>
                <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                  <div className='space-y-1 text-center'>
                    <div className='flex text-gray-600 justify-center'>
                      <FaImage size={24} />
                    </div>
                    <div className='flex text-sm text-gray-600'>
                      <label className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none'>
                        <span>Upload files</span>
                        <input
                          type='file'
                          multiple
                          onChange={handleImageChange}
                          className='sr-only'
                          accept='image/*'
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>

                {editFormData.images?.length > 0 && (
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Current Images
                    </label>
                    <div className='flex flex-wrap gap-2'>
                      {editFormData.images.map((img, index) => (
                        <div
                          key={`existing-${index}`}
                          className='relative group'
                        >
                          <img
                            src={img}
                            alt={`Current ${index}`}
                            className='w-20 h-16 object-cover rounded border'
                          />
                          <button
                            type='button'
                            onClick={() => removeImage(index)}
                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {editFormData.newImages &&
                  editFormData.previewImages.length >
                    editFormData.images.length && (
                    <div className='mt-4'>
                      <h4 className='text-sm font-medium text-gray-700 mb-2'>
                        New Images to Upload:
                      </h4>
                      <div className='flex flex-wrap gap-2'>
                        {editFormData.previewImages
                          .filter((img) => img.startsWith("blob:"))
                          .map((preview, index) => (
                            <div
                              key={`new-${index}`}
                              className='relative group'
                            >
                              <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className='w-20 h-16 object-cover rounded border'
                              />
                              <button
                                type='button'
                                onClick={() => removeImage(index, true)}
                                className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                              >
                                <FiX size={14} />
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
              <div className='flex justify-end gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsEditFormOpen(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70'
                  disabled={isSubmitting}
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      {editingBlog ? "Update Blog" : "Create Blog"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default BlogDisplay;
