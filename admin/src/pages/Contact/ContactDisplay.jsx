// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiX, FiSave } from "react-icons/fi";

// const ContactDisplay = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterText, setFilterText] = useState("");
//   const [editingContact, setEditingContact] = useState(null);
//   const [isEditFormOpen, setIsEditFormOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/contact/allcontact");
//       if (!response.ok) throw new Error("Failed to fetch contacts");

//       const data = await response.json();
//       const contactsArray = Array.isArray(data) ? data : data.data || [];
//       setContacts(contactsArray);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       toast.error("Error fetching contacts: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this contact?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(
//         `http://localhost:8000/contact/alldelete/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) throw new Error("Failed to delete contact");

//       setContacts((prev) => prev.filter((contact) => contact._id !== id));
//       toast.success("Contact deleted successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error deleting contact: " + err.message);
//     }
//   };

//   const handleEditClick = (contact) => {
//     setEditingContact(contact);
//     setIsEditFormOpen(true);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch(
//         `http://localhost:8000/contact/editsave/${editingContact._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(editingContact),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to update contact");

//       toast.success("Contact updated successfully");
//       setIsEditFormOpen(false);
//       fetchContacts();
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating contact: " + err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingContact((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const columns = [
//     {
//       name: "S.No",
//       cell: (row, index) => index + 1,
//       width: "80px",
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name || "-",
//       sortable: true,
//       cell: (row) => <span className="font-medium">{row.name || "-"}</span>,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email || "-",
//       sortable: true,
//       cell: (row) => (
//         <a
//           href={`mailto:${row.email}`}
//           className="text-blue-600 hover:underline"
//         >
//           {row.email || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.phone || "-",
//       cell: (row) => (
//         <a href={`tel:${row.phone}`} className="text-blue-600 hover:underline">
//           {row.phone || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Message",
//       selector: (row) => row.message || "-",
//       cell: (row) => (
//         <div className="max-w-xs truncate hover:max-w-none hover:whitespace-normal">
//           {row.message || "-"}
//         </div>
//       ),
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEditClick(row)}
//             className="text-blue-500 hover:text-blue-700"
//             title="Edit"
//           >
//             <FaEdit />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="text-red-500 hover:text-red-700"
//             title="Delete"
//           >
//             <FaTrash />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   const filteredContacts = contacts.filter((item) =>
//     [item.name, item.email, item.phone, item.message].some((field) =>
//       field?.toLowerCase().includes(filterText.toLowerCase())
//     )
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <p className="text-gray-700">Loading contacts...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-50">
//         <p className="text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">
//           Contact Messages
//         </h1>

//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search by Name, Email, Phone or Message..."
//             className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//           />
//         </div>

//         <DataTable
//           columns={columns}
//           data={filteredContacts}
//           keyField="_id"
//           pagination
//           highlightOnHover
//           striped
//           responsive
//           noDataComponent="No contacts found."
//         />

//         {/* Edit Form */}
//         {isEditFormOpen && (
//           <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Edit Contact Message
//               </h2>
//               <button
//                 onClick={() => setIsEditFormOpen(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSaveEdit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editingContact?.name || ""}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={editingContact?.email || ""}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={editingContact?.phone || ""}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   value={editingContact?.message || ""}
//                   onChange={handleInputChange}
//                   rows="4"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
//     </div>
//   );
// };

// export default ContactDisplay;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiX, FiSave } from "react-icons/fi";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ContactDisplay = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:8000/contact/allcontact");
      if (!response.ok) throw new Error("Failed to fetch contacts");

      const data = await response.json();
      const contactsArray = Array.isArray(data) ? data : data.data || [];
      setContacts(contactsArray);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Error fetching contacts: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/contact/alldelete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete contact");

      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting contact: " + err.message);
    }
  };

  const handleEditClick = (contact) => {
    setEditingContact(contact);
    setIsEditFormOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8000/contact/editsave/${editingContact._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingContact),
        }
      );

      if (!response.ok) throw new Error("Failed to update contact");

      toast.success("Contact updated successfully");
      setIsEditFormOpen(false);
      fetchContacts();
    } catch (err) {
      console.error(err);
      toast.error("Error updating contact: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = "Contact Messages Report";
    const headers = [["S.No", "Name", "Email", "Phone", "Message"]];

    const data = filteredContacts.map((contact, index) => [
      index + 1,
      contact.name || "-",
      contact.email || "-",
      contact.phone || "-",
      contact.message || "-",
    ]);

    doc.text(title, 14, 15);
    doc.autoTable({
      head: headers,
      body: data,
      startY: 25,
      styles: {
        cellPadding: 3,
        fontSize: 10,
        valign: "middle",
        halign: "left",
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

    doc.save("contact_messages.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredContacts.map((contact, index) => ({
        "S.No": index + 1,
        Name: contact.name || "-",
        Email: contact.email || "-",
        Phone: contact.phone || "-",
        Message: contact.message || "-",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contact_messages.xlsx");
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name || "-",
      sortable: true,
      cell: (row) => <span className='font-medium'>{row.name || "-"}</span>,
    },
    {
      name: "Email",
      selector: (row) => row.email || "-",
      sortable: true,
      cell: (row) => (
        <a
          href={`mailto:${row.email}`}
          className='text-blue-600 hover:underline'
        >
          {row.email || "-"}
        </a>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "-",
      cell: (row) => (
        <a href={`tel:${row.phone}`} className='text-blue-600 hover:underline'>
          {row.phone || "-"}
        </a>
      ),
    },
    {
      name: "Message",
      selector: (row) => row.message || "-",
      cell: (row) => (
        <div className='max-w-xs truncate hover:max-w-none hover:whitespace-normal'>
          {row.message || "-"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex space-x-2'>
          <button
            onClick={() => handleEditClick(row)}
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

  const filteredContacts = contacts.filter((item) =>
    [item.name, item.email, item.phone, item.message].some((field) =>
      field?.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-gray-700'>Loading contacts...</p>
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
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Contact Messages
        </h1>

        <div className='flex flex-col sm:flex-row justify-between gap-4 mb-4'>
          <input
            type='text'
            placeholder='Search by Name, Email, Phone or Message...'
            className='w-full sm:w-2/3 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <div className='flex gap-2'>
            <button
              onClick={exportToExcel}
              className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
            >
              <FaFileExcel /> Export to Excel
            </button>
            <button
              onClick={exportToPDF}
              className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              <FaFilePdf /> Export to PDF
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredContacts}
          keyField='_id'
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent='No contacts found.'
        />

        {/* Edit Form */}
        {isEditFormOpen && (
          <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold text-gray-800'>
                Edit Contact Message
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
                    value={editingContact?.name || ""}
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
                    value={editingContact?.email || ""}
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
                    value={editingContact?.phone || ""}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Message
                </label>
                <textarea
                  name='message'
                  value={editingContact?.message || ""}
                  onChange={handleInputChange}
                  rows='4'
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

export default ContactDisplay;
