import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaTimes, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchcategory } from "../pages/SyallbusCategory/api";

const SyllabusDisplay = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    Coursename: "",
    category: "",
    PDFbrochure: "",
    altText: "",
  });
  const [categories, setCategories] = useState([]);
  const [newPdfFile, setNewPdfFile] = useState(null);

  // console.log(syllabusData,"dataaaaaaaaaaaaaaaaaaaaaaaaaa")
  useEffect(() => {
    fetchSyllabus();
    fetchcategory();
  }, []);
// const fetchSyllabus = async () => {

// const fetchSyllabus = async () => {
  const fetchSyllabus = async () => {
    try {
      const response = await fetch(
        "https://backend.aashayeinjudiciary.com/syllabus/alldisplay"
      );
      if (!response.ok) throw new Error("Failed to fetch syllabus data");
      const data = await response.json();
      setSyllabusData(Array.isArray(data.data) ? data.data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      toast.error("Error fetching syllabus data: " + err.message);
      setLoading(false);
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

  const handleEdit = async (id) => {
    try {
      const response = await fetch(
        `https://backend.aashayeinjudiciary.com/syllabus/editdisplay?id=${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch syllabus details");

      const data = await response.json();
      setEditingId(id);
      setEditFormData({
        Coursename: data.record.Coursename || "",
        category: data.record?.category?._id || "",
        PDFbrochure: data.record.PDFbrochure || "",
        altText: data.record.altText || "",
      });

      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (err) {
      toast.error("Error fetching syllabus details: " + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({
      Coursename: "",
      category: "",
      PDFbrochure: "",
    });
    setNewPdfFile(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewPdfFile(e.target.files[0]);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this syllabus entry?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `https://backend.aashayeinjudiciary.com/syllabus/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete syllabus entry");
      }

      setSyllabusData((prev) => prev.filter((item) => item._id !== id));
      toast.success("Syllabus entry deleted successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Error deleting syllabus entry: " + err.message);
    }
  };

  const handleSaveEdit = async () => {
    if (!editFormData.Coursename || !editFormData.category) {
      toast.error("Course name and category are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Coursename", editFormData.Coursename);
      formData.append("category", editFormData.category);
      formData.append("altText", editFormData.altText);

      if (newPdfFile) {
        formData.append("PDFbrochure", newPdfFile);
      } else if (editFormData.PDFbrochure) {
        formData.append("PDFbrochure", editFormData.PDFbrochure);
      }

      const response = await fetch(
        `https://backend.aashayeinjudiciary.com/syllabus/editsave/${editingId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update syllabus entry");
      }

      const updatedData = await response.json();

      setSyllabusData((prev) =>
        prev.map((item) =>
          item._id === editingId ? { ...item, ...updatedData.data } : item
        )
      );

      toast.success("Syllabus entry updated successfully");
      handleCancelEdit();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Error updating syllabus entry: " + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "80px",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Course Name",
      selector: (row) => row.Coursename || "N/A",
      sortable: true,
      cell: (row) => row.Coursename || "N/A",
    },

    {
      name: "altText",
      selector: (row) => row.altText || "N/A",
      sortable: true,
      cell: (row) => row.altText || "N/A",
    },

    {
      name: "Category",
      selector: (row) => row?.category?.name || "N/A",
      sortable: true,
      cell: (row) => row?.category?.name || "N/A",
    },
    {
      name: "PDF Brochure",
      selector: (row) => row.PDFbrochure,
      cell: (row) =>
        row.PDFbrochure ? (
          <a
            href={row.PDFbrochure}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            View PDF
          </a>
        ) : (
          "None"
        ),
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => <div>{formatDate(row.createdAt)}</div>,
    },
    {
      name: "Updated At",
      selector: (row) => row.updatedAt,
      sortable: true,
      cell: (row) => <div>{formatDate(row.updatedAt)}</div>,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex space-x-2'>
          <button
            onClick={() => handleEdit(row._id)}
            className='text-blue-500 hover:text-blue-700'
            title='Edit'
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className='text-red-500 hover:text-red-700'
            title='Delete'
          >
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredSyllabus = syllabusData.filter(
    (item) =>
      item.Coursename?.toLowerCase().includes(filterText.toLowerCase()) ||
      item._id.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-gray-700'>Loading syllabus data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-red-500'>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Syllabus Data</h1>

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search by Course Name or Category...'
            className='w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredSyllabus}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent='No syllabus entries found.'
          className='mb-8'
        />

        {editingId && (
          <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
            <h2 className='text-xl font-semibold mb-4'>Edit Syllabus Entry</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Course Name
                </label>
                <input
                  type='text'
                  name='Coursename'
                  value={editFormData.Coursename}
                  onChange={handleEditChange}
                  className='w-full p-2 border rounded-md'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  altText
                </label>
                <input
                  type='text'
                  name='altText'
                  value={editFormData.altText}
                  onChange={handleEditChange}
                  className='w-full p-2 border rounded-md'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Category
                </label>
                <select
                  name='category'
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className='w-full p-2 border rounded-md'
                >
                  <option value=''>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  PDF Brochure
                </label>
                {editFormData.PDFbrochure && !newPdfFile && (
                  <div className='mb-2'>
                    <span className='text-sm'>Current: </span>
                    <a
                      href={editFormData.PDFbrochure}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline text-sm'
                    >
                      View PDF
                    </a>
                  </div>
                )}
                <input
                  type='file'
                  accept='application/pdf'
                  onChange={handleFileChange}
                  className='text-sm'
                />
                {newPdfFile && (
                  <span className='text-sm ml-2'>{newPdfFile.name}</span>
                )}
              </div>
            </div>
            <div className='flex justify-end space-x-4 mt-6'>
              <button
                onClick={handleCancelEdit}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllabusDisplay;
