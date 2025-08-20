// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DataTable from "react-data-table-component";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiEdit, FiTrash2, FiX, FiSave } from "react-icons/fi";

// const CallbackpopShow = () => {
//   const [callbackData, setCallbackData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingCallback, setEditingCallback] = useState(null);
//   const [isEditFormOpen, setIsEditFormOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const api = "https://backend.aashayeinjudiciary.com/Callback/allcallback";

//   useEffect(() => {
//     fetchCallbackData();
//   }, []);

//   const fetchCallbackData = () => {
//     setLoading(true);
//     axios
//       .get(api)
//       .then((res) => {
//         const actualData = Array.isArray(res.data)
//           ? res.data
//           : res.data.data || [];
//         setCallbackData(actualData);
//       })
//       .catch((error) => {
//         console.error("Er ror fetching callback data:", error);
//         toast.error("Failed to load callback data");
//       })
//       .finally(() => setLoading(false));
//   };

//   const handleDelete = (id) => {
//     if (
//       window.confirm("Are you sure you want to delete this callback entry?")
//     ) {
//       axios
//         .delete(`https://backend.aashayeinjudiciary.com/Callback/allcallback/${id}`)
//         .then(() => {
//           setCallbackData(callbackData.filter((item) => item._id !== id));
//           toast.success("Deleted successfully!");
//         })
//         .catch((error) => {
//           console.error("Failed to delete:", error);
//           toast.error("Failed to delete the callback entry");
//         });
//     }
//   };

//   const handleEditClick = (callback) => {
//     setEditingCallback(callback);
//     setIsEditFormOpen(true);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await axios.put(
//         `https://backend.aashayeinjudiciary.com/Callback/editsave/${editingCallback._id}`,
//         editingCallback
//       );
//       toast.success("Callback updated successfully");
//       setIsEditFormOpen(false);
//       fetchCallbackData();
//     } catch (error) {
//       console.error("Error updating callback:", error);
//       toast.error("Failed to update callback");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingCallback((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const columns = [
//     {
//       name: "S.No",
//       cell: (row, index) => index + 1,
//       width: "70px",
//       center: true,
//     },
//     {
//       name: "Full Name",
//       selector: (row) => row.name || "N/A",
//       sortable: true,
//       cell: (row) => <span className="font-medium">{row.name || "N/A"}</span>,
//     },
//     {
//       name: "Phone Number",
//       selector: (row) => row.phone || "N/A",
//       cell: (row) => (
//         <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
//           {row.phone || "N/A"}
//         </a>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleEditClick(row)}
//             className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
//             title="Edit"
//           >
//             <FiEdit size={18} />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
//             title="Delete"
//           >
//             <FiTrash2 size={18} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto mt-10 px-4">
//       <h2 className="text-2xl font-bold text-center mb-6">
//         📋 Callback Request List
//       </h2>
//       <div className="bg-white shadow-md rounded-lg p-4">
//         <DataTable
//           title="All Callback Entries"
//           columns={columns}
//           data={callbackData}
//           progressPending={loading}
//           pagination
//           highlightOnHover
//           striped
//           responsive
//           persistTableHead
//           noDataComponent="No callback data found"
//         />

//         {/* Edit Form - Appears below the table */}
//         {isEditFormOpen && (
//           <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Edit Callback Request
//               </h3>
//               <button
//                 onClick={() => setIsEditFormOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSaveEdit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editingCallback?.name || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={editingCallback?.phone || ""}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditFormOpen(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FiSave size={18} />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CallbackpopShow;

import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit, FiTrash2, FiX, FiSave, FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CallbackpopShow = () => {
  const [callbackData, setCallbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCallback, setEditingCallback] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api = "https://backend.aashayeinjudiciary.com/Callback/allcallback";

  useEffect(() => {
    fetchCallbackData();
  }, []);

  const fetchCallbackData = () => {
    setLoading(true);
    axios
      .get(api)
      .then((res) => {
        const actualData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        const sorted = [...actualData].sort((a, b) => {
          const ta = a?.createdAt
            ? new Date(a.createdAt).getTime()
            : (a?._id && typeof a._id === "string" && a._id.length >= 8)
            ? parseInt(a._id.substring(0, 8), 16) * 1000
            : 0;
          const tb = b?.createdAt
            ? new Date(b.createdAt).getTime()
            : (b?._id && typeof b._id === "string" && b._id.length >= 8)
            ? parseInt(b._id.substring(0, 8), 16) * 1000
            : 0;
          return tb - ta; // newest first
        });
        setCallbackData(sorted);
      })
      .catch((error) => {
        console.error("Error fetching callback data:", error);
        toast.error("Failed to load callback data");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this callback entry?")
    ) {
      axios
        .delete(`https://backend.aashayeinjudiciary.com/Callback/allcallback/${id}`)
        .then(() => {
          setCallbackData(callbackData.filter((item) => item._id !== id));
          toast.success("Deleted successfully!");
        })
        .catch((error) => {
          console.error("Failed to delete:", error);
          toast.error("Failed to delete the callback entry");
        });
    }
  };

  const handleEditClick = (callback) => {
    setEditingCallback(callback);
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(
        `https://backend.aashayeinjudiciary.com/Callback/editsave/${editingCallback._id}`,
        editingCallback
      );
      toast.success("Callback updated successfully");
      setIsEditFormOpen(false);
      fetchCallbackData();
    } catch (error) {
      console.error("Error updating callback:", error);
      toast.error("Failed to update callback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCallback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      callbackData.map((item, index) => ({
        "S.No": index + 1,
        "Full Name": item.name || "N/A",
        "Phone Number": item.phone || "N/A",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Callback Requests");
    XLSX.writeFile(workbook, "Callback_Requests.xlsx");
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Callback Requests", 14, 15);

    // Table data
    const tableData = callbackData.map((item, index) => [
      index + 1,
      item.name || "N/A",
      item.phone || "N/A",
    ]);

    // Table headers
    const headers = [["S.No", "Full Name", "Phone Number"]];

    // Generate table
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: 20,
      styles: {
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
    });

    doc.save("Callback_Requests.pdf");
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "70px",
      center: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
      cell: (row) => <span className="font-medium">{row.name || "N/A"}</span>,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone || "N/A",
      cell: (row) => (
        <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
          {row.phone || "N/A"}
        </a>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {/* <button
            onClick={() => handleEditClick(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit"
          >
            <FiEdit size={18} />
          </button> */}
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        📋 Callback Request List
      </h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Callback Entries</h3>
          <div className="flex gap-2">
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              <FiDownload size={16} />
              Excel
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              <FiDownload size={16} />
              PDF
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={callbackData}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          responsive
          persistTableHead
          noDataComponent="No callback data found"
        />

        {/* Edit Form - Appears below the table */}
        {isEditFormOpen && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Edit Callback Request
              </h3>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editingCallback?.name || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editingCallback?.phone || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CallbackpopShow;
