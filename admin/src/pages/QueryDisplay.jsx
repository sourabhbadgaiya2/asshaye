import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit, FiTrash2, FiX, FiSave, FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const QueryDisplay = () => {
  const [queries, setQueries] = useState([]);
  const [editingQuery, setEditingQuery] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const api = "http://localhost:8000/query/display";

  // Load queries
  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(api);
      // setQueries(response.data);
      setQueries(response.data.slice().reverse());
    } catch (error) {
      toast.error("Failed to load queries. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteQuery = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this query?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/query/allquerydelete/${id}`);
      toast.success("Query deleted successfully");
      loadData();
    } catch (error) {
      toast.error("Failed to delete query");
    }
  };

  const handleEditClick = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/query/editdisplay?id=${query._id}`
      );
      setEditingQuery(response.data);
      setIsEditFormOpen(true);
    } catch (error) {
      toast.error("Failed to load query details");
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = `http://localhost:8000/query/editsave/${editingQuery._id}`;
      await axios.put(endpoint, editingQuery);

      toast.success("Query updated successfully");
      setIsEditFormOpen(false);
      loadData();
    } catch (error) {
      toast.error("Failed to update query");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      queries.map((query, index) => ({
        "S.No": index + 1,
        Name: query.Name,
        Phone: query.Phone,
        State: query.State,
        Medium: query.Medium,
        Message: query.message || "No message",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Queries");
    XLSX.writeFile(workbook, "CallBackQueries.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Call Back Queries", 14, 15);

    // Table data
    const tableData = queries.map((query, index) => [
      index + 1,
      query.Name,
      query.Phone,
      query.State,
      query.Medium,
      query.message || "No message",
    ]);

    // Table headers
    const headers = ["S.No", "Name", "Phone", "State", "Medium", "Message"];

    // Add table
    doc.autoTable({
      head: [headers],
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
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save("CallBackQueries.pdf");
  };

  // Columns for table
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "80px",
      center: true,
      cell: (row, index) => <span className='text-gray-600'>{index + 1}</span>,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      cell: (row) => <span className='font-medium'>{row.Name}</span>,
    },
    {
      name: "Phone",
      selector: (row) => row.Phone,
      cell: (row) => (
        <a href={`tel:${row.Phone}`} className='text-blue-600 hover:underline'>
          {row.Phone}
        </a>
      ),
    },
    {
      name: "State",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Medium",
      selector: (row) => row.Medium,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      cell: (row) => (
        <div className='max-w-xs truncate hover:max-w-none hover:whitespace-normal'>
          {row.message || "No message"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex gap-2'>
          {/* <button
            onClick={() => handleEditClick(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit"
          >
            <FiEdit size={18} />
          </button> */}
          <button
            onClick={() => deleteQuery(row._id)}
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
            Call Back Queries
          </h1>
          <div className='flex gap-3'>
            <button
              onClick={exportToExcel}
              className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
            >
              <FiDownload size={18} />
              Excel
            </button>
            <button
              onClick={exportToPDF}
              className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              <FiDownload size={18} />
              PDF
            </button>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8'>
          <DataTable
            columns={columns}
            data={queries}
            progressPending={isLoading}
            progressComponent={
              <div className='p-8 flex justify-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
              </div>
            }
            noDataComponent={
              <div className='p-8 text-center text-gray-500'>
                No queries found.
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

        {/* Edit Form */}
        {isEditFormOpen && (
          <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Edit Query
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
                  Name
                </label>
                <input
                  type='text'
                  name='Name'
                  value={editingQuery?.Name || ""}
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
                  name='Phone'
                  value={editingQuery?.Phone || ""}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  State
                </label>
                <input
                  type='text'
                  name='State'
                  value={editingQuery?.State || ""}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Medium
                </label>
                <input
                  type='text'
                  name='Medium'
                  value={editingQuery?.Medium || ""}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Message
                </label>
                <textarea
                  name='message'
                  value={editingQuery?.message || ""}
                  onChange={handleInputChange}
                  rows='3'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
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
                      Update Query
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

export default QueryDisplay;
