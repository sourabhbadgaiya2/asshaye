import React, { useEffect, useState } from "react";
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
} from "react-icons/fi";
import { FaImage } from "react-icons/fa";

const Bannerdisplay = () => {
  const [banners, setBanners] = useState([]);
  const [editingBanner, setEditingBanner] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const api = "http://localhost:8000/banner/alldisplay";

  console.log(editingBanner, "aaaaaaaaaaaaaaaaaaaaaaaa");
  // Load banners
  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(api);
      setBanners(response.data);
    } catch (error) {
      toast.error("Failed to load banners. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteBanner = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/banner/deleted/${id}`);
      toast.success("Banner deleted successfully");
      loadData();
    } catch (error) {
      toast.error("Failed to delete banner");
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/banner/editdisplay?id=${id}`
      );
      setEditingBanner(response.data);
      setIsEditFormOpen(true);
      // Scroll to the form at the bottom
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      toast.error("Failed to load banner details");
    }
  };

  const handleAddNew = () => {
    setEditingBanner({ URL: "", altText: "", images: [] });
    setIsEditFormOpen(true);
    // Scroll to the form at the bottom
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("id", editingBanner._id || "");
      formData.append("URL", editingBanner.URL);
      formData.append("altText", editingBanner.altText);

      if (editingBanner.newImages) {
        Array.from(editingBanner.newImages).forEach((file) => {
          formData.append("images", file);
        });
      }

      const endpoint = editingBanner._id
        ? "http://localhost:8000/banner/editsave"
        : "http://localhost:8000/banner/create";

      await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        `Banner ${editingBanner._id ? "updated" : "created"} successfully`
      );
      setIsEditFormOpen(false);
      loadData();
    } catch (error) {
      toast.error(
        `Failed to ${editingBanner._id ? "update" : "create"} banner`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingBanner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setEditingBanner((prev) => ({
      ...prev,
      newImages: e.target.files,
    }));
  };

  // Columns for table
  const columns = [
    {
      name: "Sr. No",
      cell: (row, index) => index + 1,
      width: "80px",
      sortable: false,
    },
    {
      name: "Images",
      selector: (row) => row.images,
      cell: (row) => (
        <div className='flex gap-2 flex-wrap'>
          {row.images.length > 0 ? (
            row.images.map((img, index) => (
              <div key={index} className='relative group'>
                <img
                  src={img}
                  alt={`Banner ${index}`}
                  className='w-24 h-16 object-cover rounded border hover:shadow-md transition-all'
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100'>
                  <a
                    href={img}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white p-1 bg-black bg-opacity-50 rounded-full'
                  >
                    <FiExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className='w-24 h-16 border-2 border-dashed rounded flex items-center justify-center text-gray-400'>
              <FaImage size={20} />
            </div>
          )}
        </div>
      ),
      sortable: false,
    },
    {
      name: "URL",
      selector: (row) => row.URL,
      cell: (row) =>
        row.URL ? (
          <a
            href={row.URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline flex items-center gap-1'
          >
            {row.URL.length > 30 ? `${row.URL.substring(0, 30)}...` : row.URL}
            <FiExternalLink size={14} />
          </a>
        ) : (
          <span className='text-gray-400'>No URL</span>
        ),
      sortable: true,
    },
    {
      name: "Alt Text",
      selector: (row) => row.altText,
      cell: (row) =>
        row.altText || <span className='text-gray-400'>No alt text</span>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex gap-2'>
          <button
            onClick={() => handleEditClick(row._id)}
            className='p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors'
            title='Edit'
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => deleteBanner(row._id)}
            className='p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors'
            title='Delete'
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className='p-4 md:p-6 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>
            Banner Management
          </h1>
          <button
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            onClick={handleAddNew}
          >
            <FiPlus size={18} />
            Add Banner
          </button>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8'>
          <DataTable
            columns={columns}
            data={banners}
            progressPending={isLoading}
            progressComponent={
              <div className='p-8 flex justify-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
              </div>
            }
            noDataComponent={
              <div className='p-8 text-center text-gray-500'>
                No banners found. Add your first banner to get started.
              </div>
            }
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20]}
            highlightOnHover
            responsive
            striped
            customStyles={{
              headCells: {
                style: {
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  backgroundColor: "#f9fafb",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
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
        </div>

        {/* Edit/Add Form - Appears at the bottom */}
        {isEditFormOpen && (
          <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {editingBanner?._id ? "Edit Banner" : "Add New Banner"}
              </h2>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Destination URL
                </label>
                <input
                  type='url'
                  name='URL'
                  value={editingBanner?.URL || ""}
                  onChange={handleInputChange}
                  placeholder='https://example.com'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Alt Text
                </label>
                <input
                  type='text'
                  name='altText'
                  value={editingBanner?.altText || ""}
                  onChange={handleInputChange}
                  placeholder='Enter alternative text for the banner'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {editingBanner?.images?.length > 0 && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Current Images
                  </label>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {editingBanner.images.map((img, index) => (
                      <div key={index} className='relative group'>
                        <img
                          src={img}
                          alt={`Current ${index}`}
                          className='w-20 h-14 object-cover rounded border hover:shadow-md transition-all'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {editingBanner?._id ? "Update Images" : "Upload Images"}
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
                          required={!editingBanner?._id}
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
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
                      {editingBanner?._id ? "Update Banner" : "Create Banner"}
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
          theme='light'
        />
      </div>
    </div>
  );
};

export default Bannerdisplay;
