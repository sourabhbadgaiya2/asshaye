// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DataTable from 'react-data-table-component';

// const FAQDisplay = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     title: '',
//     response: ''
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFAQs = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/faq/');
//         setFaqs(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch FAQs');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFAQs();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/faq/${id}`);
//       setFaqs(faqs.filter(faq => faq._id !== id));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to delete FAQ');
//     }
//   };

//   const handleEdit = (faq) => {
//     setEditingId(faq._id);
//     setEditFormData({
//       title: faq.title,
//       response: faq.response
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditSubmit = async (id) => {
//     try {
//       const response = await axios.put(`http://localhost:8000/faq/${id}`, editFormData);
//       setFaqs(faqs.map(faq => faq._id === id ? response.data.data : faq));
//       setEditingId(null);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update FAQ');
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };

//   const columns = [
//     {
//       name: 'Question',
//       selector: row => row.title,
//       sortable: true,
//       wrap: true
//     },
//     {
//       name: 'Answer',
//       selector: row => row.response,
//       sortable: true,
//       wrap: true
//     },
//     {
//       name: 'Actions',
//       cell: row => (
//         editingId === row._id ? (
//           <div className="space-x-2">
//             <button
//               onClick={() => handleEditSubmit(row._id)}
//               className="px-2 py-1 bg-green-600 text-white rounded"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancelEdit}
//               className="px-2 py-1 bg-gray-500 text-white rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <div className="space-x-2">
//             <button
//               onClick={() => handleEdit(row)}
//               className="px-2 py-1 bg-yellow-500 text-white rounded"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(row._id)}
//               className="px-2 py-1 bg-red-600 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         )
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true
//     }
//   ];

//   const customStyles = {
//     rows: {
//       style: {
//         minHeight: '60px',
//         fontSize: '16px'
//       }
//     },
//     headCells: {
//       style: {
//         fontSize: '16px',
//         fontWeight: 'bold',
//         backgroundColor: '#f1f5f9',
//         color: '#111827',
//         paddingLeft: '16px',
//         paddingRight: '16px'
//       }
//     },
//     cells: {
//       style: {
//         paddingLeft: '16px',
//         paddingRight: '16px',
//         wordBreak: 'break-word'
//       }
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-center">FAQs Management</h1>
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={() => navigate('/faq/create')}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Create New FAQ
//           </button>
//         </div>

//         {error && <div className="text-red-500 mb-4">{error}</div>}

//         <div className="bg-white p-4 rounded shadow-md">
//           <DataTable
//             columns={columns}
//             data={faqs}
//             customStyles={customStyles}
//             progressPending={loading}
//             pagination
//             responsive
//             highlightOnHover
//             striped
//             fixedHeader
//             fixedHeaderScrollHeight="500px"
//           />
//         </div>

//         {editingId && (
//           <div className="mt-6 p-6 bg-white rounded shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Edit FAQ</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Question</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={editFormData.title}
//                 onChange={handleEditChange}
//                 className="mt-1 block w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Answer</label>
//               <textarea
//                 name="response"
//                 rows={4}
//                 value={editFormData.response}
//                 onChange={handleEditChange}
//                 className="mt-1 block w-full p-2 border rounded"
//               ></textarea>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEditSubmit(editingId)}
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={handleCancelEdit}
//                 className="px-4 py-2 bg-gray-500 text-white rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FAQDisplay;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FAQDisplay = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    response: "",
    altText: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/faq/");
        setFaqs(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch FAQs");
        toast.error(err.response?.data?.message || "Failed to fetch FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/faq/${id}`);
      setFaqs(faqs.filter((faq) => faq._id !== id));
      toast.success("FAQ deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete FAQ");
      toast.error(err.response?.data?.message || "Failed to delete FAQ");
    }
  };

  const handleEdit = (faq) => {
    setEditingId(faq._id);
    setEditFormData({
      title: faq.title,
      response: faq.response,
      altText: faq.altText || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/faq/${id}`,
        editFormData
      );
      setFaqs(faqs.map((faq) => (faq._id === id ? response.data.data : faq)));
      setEditingId(null);
      toast.success("FAQ updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update FAQ");
      toast.error(err.response?.data?.message || "Failed to update FAQ");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const columns = [
    {
      name: "Question",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      width: "25%",
    },
    {
      name: "Answer",
      selector: (row) => row.response,
      sortable: true,
      wrap: true,
      width: "40%",
    },
    {
      name: "Alt Text",
      selector: (row) => row.altText,
      sortable: true,
      wrap: true,
      width: "20%",
    },
    {
      name: "Actions",
      cell: (row) =>
        editingId === row._id ? (
          <div className='space-x-2'>
            <button
              onClick={() => handleEditSubmit(row._id)}
              className='px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700'
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className='px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600'
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className='space-x-2'>
            <button
              onClick={() => handleEdit(row)}
              className='px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row._id)}
              className='px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Delete
            </button>
          </div>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "15%",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
        fontSize: "16px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#f1f5f9",
        color: "#111827",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
        wordBreak: "break-word",
      },
    },
  };

  return (
    <div className='w-full min-h-screen bg-gray-100 p-6'>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-center'>FAQs Management</h1>
        <div className='flex justify-end mb-4'>
          <button
            onClick={() => navigate("/faq/create")}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
          >
            Create New FAQ
          </button>
        </div>

        {error && <div className='text-red-500 mb-4'>{error}</div>}

        <div className='bg-white p-4 rounded shadow-md'>
          <DataTable
            columns={columns}
            data={faqs}
            customStyles={customStyles}
            progressPending={loading}
            pagination
            responsive
            highlightOnHover
            striped
            fixedHeader
            fixedHeaderScrollHeight='500px'
            noDataComponent={<div className='py-4'>No FAQs found</div>}
          />
        </div>

        {editingId && (
          <div className='mt-6 p-6 bg-white rounded shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Edit FAQ</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Question
                </label>
                <input
                  type='text'
                  name='title'
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Alt Text
                </label>
                <input
                  type='text'
                  name='altText'
                  value={editFormData.altText}
                  onChange={handleEditChange}
                  className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  required
                />
              </div>
              <div className='mb-4 md:col-span-3'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Answer
                </label>
                <textarea
                  name='response'
                  rows={4}
                  value={editFormData.response}
                  onChange={handleEditChange}
                  className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  required
                ></textarea>
              </div>
            </div>
            <div className='flex justify-end space-x-2 mt-4'>
              <button
                onClick={handleCancelEdit}
                className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditSubmit(editingId)}
                className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
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

export default FAQDisplay;
