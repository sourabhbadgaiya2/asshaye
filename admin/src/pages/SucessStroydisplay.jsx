import React, { useState, useEffect } from "react";
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

const SuccessStoryDisplay = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingStory, setEditingStory] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editFormData, setEditFormData] = useState({
    StudentName: "",
    Judicial: "",
    altText: "",
    description: "",
    images: [],
    newImages: null,
  });

  const fetchStories = async () => {
    try {
      setLoading(true);
        // setLoading(true);
      const response = await axios.get(
        "https://backend.aashayeinjudiciary.com/success/display"
        // "http://localhost:8000/success/display"
      );
      const storiesArray = Array.isArray(response.data) ? response.data : [];
      const formattedStories = storiesArray.map((story) => ({
        ...story,
        images: story.images
          ? Array.isArray(story.images)
            ? story.images.map((img) =>
                img.startsWith("http")
                  ? img
                  : `https://backend.aashayeinjudiciary.com/${img}`
              )
            : [`https://backend.aashayeinjudiciary.com/${story.images}`]
          : [],
      }));
      setStories(formattedStories);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const resetForm = () => {
    setEditFormData({
      StudentName: "",
      Judicial: "",
      altText: "",
      description: "",
      images: [],
      newImages: null,
    });
    setEditingStory(null);
    setIsEditFormOpen(false);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this success story?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `https://backend.aashayeinjudiciary.com/success/${id}`
      );
      await fetchStories();
      toast.success("Success story deleted successfully");
    } catch (err) {
      toast.error("Error deleting success story: " + err.message);
    }
  };

  const handleEditClick = (story) => {
    setEditFormData({
      StudentName: story.StudentName,
      Judicial: story.Judicial,
      altText: story.altText || "",
      description: story.description || "",
      images: story.images || [],
      newImages: null,
    });
    setEditingStory(story._id);
    setIsEditFormOpen(true);
  };

  const handleAddNew = () => {
    resetForm();
    setIsEditFormOpen(true);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("StudentName", editFormData.StudentName);
      formData.append("Judicial", editFormData.Judicial);
      formData.append("altText", editFormData.altText);
      formData.append("description", editFormData.description);

      if (editingStory) {
        formData.append("id", editingStory);
      }

      if (editFormData.newImages) {
        Array.from(editFormData.newImages).forEach((file) => {
          formData.append("images", file);
        });
      }

      const endpoint = editingStory
        ? `https://backend.aashayeinjudiciary.com/success/editsave/${editingStory}`
        : "https://backend.aashayeinjudiciary.com/success/create";

      await axios.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchStories();
      toast.success(
        `Success story ${editingStory ? "updated" : "created"} successfully`
      );
      resetForm();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error(
        `Error ${editingStory ? "updating" : "creating"} success story: ${
          err.response?.data?.message || err.message
        }`
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

  const handleImageChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      newImages: e.target.files,
    }));
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "80px",
      cell: (row, index) => <div className='text-gray-500'>{index + 1}</div>,
    },
    {
      name: "Student Name",
      selector: (row) => row.StudentName,
      sortable: true,
      cell: (row) => <div className='font-medium'>{row.StudentName}</div>,
    },
    {
      name: "Alt Text",
      selector: (row) => row.altText,
      sortable: true,
      cell: (row) => <div className='font-medium'>{row.altText}</div>,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
      cell: (row) => <div className='text-gray-600'>{row.description}</div>,
    },
    {
      name: "Judicial",
      selector: (row) => row.Judicial,
      sortable: true,
      cell: (row) => <div className='text-gray-600'>{row.Judicial}</div>,
    },
    {
      name: "Images",
      cell: (row) => (
        <div className='flex gap-2 flex-wrap'>
          {row.images && row.images.length > 0 ? (
            row.images.map((img, index) => (
              <div key={index} className='relative group'>
                <img
                  src={img}
                  alt={row.altText || `Story ${index}`}
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
      name: "Actions",
      cell: (row) => (
        <div className='flex gap-2'>
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
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredStories = stories.filter(
    (item) =>
      item.StudentName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.Judicial?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.altText?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className='p-4 md:p-6 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>
            Success Stories Management
          </h1>
          <button
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            onClick={handleAddNew}
          >
            <FiPlus size={18} />
            Add Story
          </button>
        </div>

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search by student name, judicial or alt text...'
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8'>
          <DataTable
            columns={columns}
            data={filteredStories}
            progressPending={loading}
            noDataComponent={
              <div className='p-8 text-center text-gray-500'>
                No success stories found.
              </div>
            }
            pagination
            paginationPerPage={10}
            highlightOnHover
            responsive
          />
        </div>

        {isEditFormOpen && (
          <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>
                {editingStory ? "Edit Success Story" : "Add New Success Story"}
              </h2>
              <button
                onClick={handleCancelEdit}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className='space-y-4'>
              <div className='grid grid-cols-1 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Student Name
                  </label>
                  <input
                    type='text'
                    name='StudentName'
                    value={editFormData.StudentName}
                    onChange={handleInputChange}
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
                    value={editFormData.altText}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Judicial
                  </label>
                  <input
                    type='text'
                    name='Judicial'
                    value={editFormData.Judicial}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <textarea
                    name='description'
                    value={editFormData.description}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    rows={3}
                  />
                </div>
              </div>

              {editFormData.images?.length > 0 && (
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Current Images
                  </label>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {editFormData.images.map((img, index) => (
                      <div key={index} className='relative group'>
                        <img
                          src={img}
                          alt={editFormData.altText || `Current ${index}`}
                          className='w-20 h-14 object-cover rounded border hover:shadow-md transition-all'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {editingStory ? "Update Images" : "Upload Images"}
                </label>
                <input
                  type='file'
                  multiple
                  onChange={handleImageChange}
                  className='block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100'
                  accept='image/*'
                />
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <button
                  type='button'
                  onClick={handleCancelEdit}
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
                  {isSubmitting
                    ? "Processing..."
                    : editingStory
                    ? "Update Story"
                    : "Create Story"}
                  {!isSubmitting && <FiSave size={18} />}
                </button>
              </div>
            </form>
          </div>
        )}

        <ToastContainer position='top-right' autoClose={3000} />
      </div>
    </div>
  );
};

export default SuccessStoryDisplay;
