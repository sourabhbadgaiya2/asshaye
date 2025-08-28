import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EnrollDisplay = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    status: "new",
  });

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("http://localhost:8000/enroll/alldisplay");
      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data = await response.json();
      console.log("Fetched enquiries:", data);

      const enquiriesArray = Array.isArray(data) ? data : data.data || [];

      // to see the new enquiries on top
      enquiriesArray.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setEnquiries(enquiriesArray);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Error fetching enquiries: " + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `http://localhost:8000/enroll/alldelete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete enquiry");
      }

      setEnquiries((prev) =>
        prev.filter((enquiry) => enquiry.id !== id && enquiry._id !== id)
      );
      toast.success("Enquiry deleted successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Error deleting enquiry: " + err.message);
    }
  };

  const handleEdit = (enquiry) => {
    setEditingEnquiry(enquiry._id || enquiry.id);
    setEditFormData({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      city: enquiry.city,
      status: enquiry.status || "new",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/enroll/editsave/${editingEnquiry}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update enquiry");
      }

      const updatedEnquiry = await response.json();
      setEnquiries((prev) =>
        prev.map((enquiry) =>
          enquiry._id === editingEnquiry || enquiry.id === editingEnquiry
            ? updatedEnquiry
            : enquiry
        )
      );
      setEditingEnquiry(null);
      toast.success("Enquiry updated successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Error updating enquiry: " + err.message);
    }
  };

  const cancelEdit = () => {
    setEditingEnquiry(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredEnquiries.map((item, index) => ({
        "S.No": index + 1,
        Name: item.name || "N/A",
        Email: item.email || "N/A",
        Phone: item.phone || "N/A",
        City: item.city || "N/A",
        "Product Name": item?.productId?.Coursename || "N/A",
        "Created At": formatDate(item.createdAt),
        Status: item.status ? item.status.replace("_", " ") : "N/A",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "Enquiries.xlsx");
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Enquiries List", 14, 15);

    // Table data
    const tableData = filteredEnquiries.map((item, index) => [
      index + 1,
      item.name || "N/A",
      item.email || "N/A",
      item.phone || "N/A",
      item.city || "N/A",
      item?.productId?.Coursename || "N/A",
      formatDate(item.createdAt),
      item.status ? item.status.replace("_", " ") : "N/A",
    ]);

    // Table headers
    const headers = [
      [
        "S.No",
        "Name",
        "Email",
        "Phone",
        "City",
        "Product Name",
        "Created At",
        "Status",
      ],
    ];

    // Generate table
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: 20,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
    });

    doc.save("Enquiries.pdf");
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "city",
      selector: (row) => row.city,
    },
    {
      name: "Product Name",
      selector: (row) => row?.productId?.Coursename,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => <div>{formatDate(row.createdAt)}</div>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "new"
              ? "bg-blue-100 text-blue-800"
              : row.status === "in_progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {row.status.replace("_", " ")}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex space-x-2'>
          <button
            onClick={() => handleDelete(row.id || row._id)}
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

  const filteredEnquiries = Array.isArray(enquiries)
    ? enquiries
        .filter(
          (item) =>
            item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.city?.toLowerCase().includes(filterText.toLowerCase()) ||
            item.CourseName?.toLowerCase().includes(filterText.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
    : [];

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-gray-700'>Loading enquiries...</p>
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
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Enroll display</h1>
          <div className='flex space-x-2'>
            <button
              onClick={exportToExcel}
              className='flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors'
            >
              <FaFileExcel />
              <span>Excel</span>
            </button>
            <button
              onClick={exportToPDF}
              className='flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors'
            >
              <FaFilePdf />
              <span>PDF</span>
            </button>
          </div>
        </div>

        {editingEnquiry && (
          <div className='mb-6 bg-white p-6 rounded-lg shadow-md transition-all duration-300'>
            <h2 className='text-xl font-semibold mb-4'>Edit Enquiry</h2>
            <form onSubmit={handleEditSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border rounded-md shadow-sm'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border rounded-md shadow-sm'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={editFormData.phone}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border rounded-md shadow-sm'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    value={editFormData.city}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border rounded-md shadow-sm'
                    required
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Status
                  </label>
                  <select
                    name='status'
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                    className='w-full p-2 border rounded-md shadow-sm'
                  >
                    <option value='new'>New</option>
                    <option value='in_progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </select>
                </div>
              </div>
              <div className='flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={cancelEdit}
                  className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search by Name, Email, city or Product...'
            className='w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredEnquiries}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent='No enquiries found.'
        />
      </div>
    </div>
  );
};

export default EnrollDisplay;
