// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import axios from 'axios';

// const SyllabusEnquiryDisplay = () => {
//     const [contacts, setContacts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editData, setEditData] = useState(null);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         city: ''
//     });

//     const api = "http://localhost:8000/register/allcontact";

//     useEffect(() => {
//         fetchContacts();
//     }, []);

//     const fetchContacts = async () => {
//         try {
//             const response = await axios.get(api);
//             setContacts(response.data.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching contacts:', error);
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8000/register/alldelete/${id}`);
//             fetchContacts(); // Refresh the list after deletion
//         } catch (error) {
//             console.error('Error deleting contact:', error);
//         }
//     };

//     const handleEdit = (row) => {
//         setEditData(row);
//         setFormData({
//             name: row.name,
//             email: row.email,
//             phone: row.phone,
//             city: row.city
//         });
//     };

//     const handleUpdate = async () => {
//         try {
//             await axios.put(`http://localhost:8000/register/update/${editData._id}`, formData);
//             setEditData(null);
//             fetchContacts(); // Refresh the list after update
//         } catch (error) {
//             console.error('Error updating contact:', error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const columns = [
//         {
//             name: 'Name',
//             selector: row => row.name,
//             sortable: true,
//         },
//         {
//             name: 'Email',
//             selector: row => row.email,
//             sortable: true,
//         },
//         {
//             name: 'Phone',
//             selector: row => row.phone,
//         },
//         {
//             name: 'City',
//             selector: row => row.city,
//             sortable: true,
//         },
//         {
//             name: 'Actions',
//             cell: (row) => (
//                 <div className="flex space-x-2">
//                     <button
//                         onClick={() => handleEdit(row)}
//                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                     >
//                         Edit
//                     </button>
//                     <button
//                         onClick={() => handleDelete(row._id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact List</h2>

//             {editData && (
//                 <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//                     <h5 className="text-xl font-semibold mb-4 text-gray-700">Edit Contact</h5>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={formData.phone}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
//                             <input
//                                 type="text"
//                                 name="city"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={formData.city}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="flex space-x-3 mt-4">
//                         <button
//                             onClick={handleUpdate}
//                             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//                         >
//                             Update
//                         </button>
//                         <button
//                             onClick={() => setEditData(null)}
//                             className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <DataTable
//                     columns={columns}
//                     data={contacts}
//                     progressPending={loading}
//                     pagination
//                     highlightOnHover
//                     responsive
//                     customStyles={{
//                         headCells: {
//                             style: {
//                                 backgroundColor: '#f8fafc',
//                                 fontWeight: 'bold',
//                                 color: '#334155',
//                                 fontSize: '0.875rem',
//                             },
//                         },
//                         cells: {
//                             style: {
//                                 paddingTop: '0.75rem',
//                                 paddingBottom: '0.75rem',
//                             },
//                         },
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default SyllabusEnquiryDisplay;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

const SyllabusEnquiryDisplay = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const api = "http://localhost:8000/register/allcontact";

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(api);
      setContacts(response.data.data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/register/alldelete/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEdit = (row) => {
    setEditData(row);
    setFormData({
      name: row.name,
      email: row.email,
      phone: row.phone,
      city: row.city,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/register/update/${editData._id}`,
        formData
      );
      setEditData(null);
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      contacts.map((contact) => ({
        Name: contact.name,
        Email: contact.email,
        Phone: contact.phone,
        City: contact.city,
        "Created At": new Date(contact.createdAt).toLocaleString(),
        "Updated At": new Date(contact.updatedAt).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "ContactList.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Contact List", 14, 15);

    // Table headers
    const headers = [
      ["Name", "Email", "Phone", "City", "Created At", "Updated At"],
    ];

    // Table data
    const data = contacts.map((contact) => [
      contact.name,
      contact.email,
      contact.phone,
      contact.city,
      new Date(contact.createdAt).toLocaleString(),
      new Date(contact.updatedAt).toLocaleString(),
    ]);

    // Add table
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
      },
    });

    doc.save("ContactList.pdf");
  };

  const columns = [
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
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className='flex space-x-2'>
          {/* <button
                        onClick={() => handleEdit(row)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Edit
                    </button> */}
          <button
            onClick={() => handleDelete(row._id)}
            className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = () => {};

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Contact List</h2>
        <div className='flex space-x-2'>
          <button
            onClick={exportToExcel}
            className='flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition'
          >
            <FaFileExcel className='mr-2' />
            Export Excel
          </button>
          <button
            onClick={exportToPDF}
            className='flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition'
          >
            <FaFilePdf className='mr-2' />
            Export PDF
          </button>
        </div>
      </div>

      {editData && (
        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
          <h5 className='text-xl font-semibold mb-4 text-gray-700'>
            Edit Contact
          </h5>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Name
              </label>
              <input
                type='text'
                name='name'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Email
              </label>
              <input
                type='email'
                name='email'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Phone
              </label>
              <input
                type='text'
                name='phone'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                City
              </label>
              <input
                type='text'
                name='city'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex space-x-3 mt-4'>
            <button
              onClick={handleUpdate}
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition'
            >
              Update
            </button>
            <button
              onClick={() => setEditData(null)}
              className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition'
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <DataTable
          columns={columns}
          data={contacts}
          progressPending={loading}
          pagination
          highlightOnHover
          responsive
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#f8fafc",
                fontWeight: "bold",
                color: "#334155",
                fontSize: "0.875rem",
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
    </div>
  );
};

export default SyllabusEnquiryDisplay;
