import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiX, FiSave } from "react-icons/fi";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const EnquiryDisplay = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("http://localhost:8000/enquiry/allcourse");
      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data = await response.json();
      const enquiriesArray = Array.isArray(data) ? data : data.data || [];
      setEnquiries(enquiriesArray);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Excel Export Function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      enquiries.map((enquiry, index) => ({
        "S.No": index + 1,
        Name: enquiry.name,
        Email: enquiry.email,
        Phone: enquiry.phone,
        City: enquiry.city,
        Status: enquiry.status.replace("_", " "),
        "Created At": formatDate(enquiry.createdAt),
        "Last Updated": formatDate(enquiry.updatedAt),
      }))
    );

    // Set column widths
    const wscols = [
      { wch: 5 }, // S.No
      { wch: 20 }, // Name
      { wch: 25 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // City
      { wch: 15 }, // Status
      { wch: 20 }, // Created At
      { wch: 20 }, // Last Updated
    ];
    worksheet["!cols"] = wscols;

    // Add header style
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4472C4" } }, // Blue background
      alignment: { horizontal: "center" },
    };

    // Apply style to headers
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = { c: C, r: 0 };
      const cell_ref = XLSX.utils.encode_cell(cell_address);
      if (worksheet[cell_ref]) {
        worksheet[cell_ref].s = headerStyle;
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "Enquiries.xlsx");
  };

  // PDF Export Function
  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
    });

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Enquiries Report", 140, 15, { align: "center" });

    // Date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 10, 10);

    // Table data
    const tableData = enquiries.map((enquiry, index) => [
      index + 1,
      enquiry.name,
      enquiry.email,
      enquiry.phone,
      enquiry.city,
      enquiry.status.replace("_", " "),
      formatDate(enquiry.createdAt),
    ]);

    // Table headers
    const headers = [
      "S.No",
      "Name",
      "Email",
      "Phone",
      "City",
      "Status",
      "Created At",
    ];

    // Add table
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
      margin: { horizontal: 10 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: "middle",
      },
      headStyles: {
        fillColor: [65, 105, 225], // Royal Blue
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 8 }, // S.No
        1: { cellWidth: 25 }, // Name
        2: { cellWidth: 35 }, // Email
        3: { cellWidth: 20 }, // Phone
        4: { cellWidth: 20 }, // City
        5: { halign: "center", cellWidth: 15 }, // Status
        6: { cellWidth: 25 }, // Created At
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      didDrawPage: function (data) {
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save("Enquiries_Report.pdf");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `http://localhost:8000/enquiry/coursedelte/${id}`,
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
      toast.error("Error deleting enquiry: " + err.message);
    }
  };

  const handleEditClick = (enquiry) => {
    setEditingEnquiry(enquiry);
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8000/enquiry/editsave/${editingEnquiry._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingEnquiry),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update enquiry");
      }

      toast.success("Enquiry updated successfully");
      setIsEditFormOpen(false);
      fetchEnquiries();
    } catch (err) {
      toast.error("Error updating enquiry: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      sortable: true,
      width: "80px",
      cell: (row, index) => <div className='text-center'>{index + 1}</div>,
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
      name: "City",
      selector: (row) => row.city,
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
          {/* <button
            onClick={() => handleEditClick(row)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <FaEdit />
          </button> */}
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
    ? enquiries.filter(
        (item) =>
          item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.city?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.productName?.toLowerCase().includes(filterText.toLowerCase())
      )
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
          <h1 className='text-3xl font-bold text-gray-900'>Enquiries</h1>
          <div className='flex space-x-3'>
            <button
              onClick={exportToExcel}
              className='flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors'
            >
              <FaFileExcel className='mr-1' />
              Export Excel
            </button>
            <button
              onClick={exportToPDF}
              className='flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors'
            >
              <FaFilePdf className='mr-1' />
              Export PDF
            </button>
          </div>
        </div>

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search by Name, Email, Subject or Product...'
            className='w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <DataTable
            columns={columns}
            data={filteredEnquiries}
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent={
              <div className='p-8 text-center text-gray-500'>
                No enquiries found.
              </div>
            }
            customStyles={{
              headCells: {
                style: {
                  fontWeight: "600",
                  backgroundColor: "#f8fafc",
                  textTransform: "uppercase",
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

        {/* Edit Form */}
        {isEditFormOpen && (
          <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Edit Enquiry
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
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={editingEnquiry?.name || ""}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                    value={editingEnquiry?.email || ""}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                    value={editingEnquiry?.phone || ""}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                    value={editingEnquiry?.city || ""}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Status
                  </label>
                  <select
                    name='status'
                    value={editingEnquiry?.status || "new"}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    <option value='new'>New</option>
                    <option value='in_progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </select>
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
        )}
      </div>
    </div>
  );
};

export default EnquiryDisplay;
