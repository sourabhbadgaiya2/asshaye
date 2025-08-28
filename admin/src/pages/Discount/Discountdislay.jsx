// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Discountdisplay = () => {
//   const [discounts, setDiscounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({
//     title: '',
//     desciption: '',
//     limited: '',
//     limitedoffer: ''
//   });
//   const navigate = useNavigate();

//   // Fetch all discounts
//   useEffect(() => {
//     const fetchDiscounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/discount/display');
//         setDiscounts(response.data.data || []);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch discounts');
//         setLoading(false);
//       }
//     };

//     fetchDiscounts();
//   }, []);

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this discount?')) {
//       try {
//         await axios.delete(`http://localhost:8000/discount/deleted/${id}`);
//         setDiscounts(discounts.filter(discount => discount._id !== id));
//         alert('Discount deleted successfully!');
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete discount');
//       }
//     }
//   };

//   // Handle edit
//   const handleEdit = (discount) => {
//     setEditId(discount._id);
//     setEditData({
//       title: discount.title,
//       desciption: discount.desciption,
//       limited: discount.limited,
//       limitedoffer: discount.limitedoffer
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:8000/discount/display/${editId}`, editData);
//       setDiscounts(discounts.map(discount =>
//         discount._id === editId ? response.data.data : discount
//       ));
//       setEditId(null);
//       alert('Discount updated successfully!');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update discount');
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Discount Offers</h1>

//       <button
//         onClick={() => navigate('/discount/create')}
//         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
//       >
//         Create New Discount
//       </button>

//       {discounts.length === 0 ? (
//         <div className="text-center py-8">No discounts available</div>
//       ) : (
//         <div className="grid gap-6">
//           {discounts.map(discount => (
//             <div key={discount._id} className="border rounded-lg p-4 shadow">
//               {editId === discount._id ? (
//                 <form onSubmit={handleEditSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-1">Title</label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={editData.title}
//                         onChange={handleEditChange}
//                         className="w-full p-2 border rounded"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-1">Limited</label>
//                       <input
//                         type="text"
//                         name="limited"
//                         value={editData.limited}
//                         onChange={handleEditChange}
//                         className="w-full p-2 border rounded"
//                         required
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-gray-700 text-sm font-bold mb-1">Description</label>
//                       <textarea
//                         name="desciption"
//                         value={editData.desciption}
//                         onChange={handleEditChange}
//                         className="w-full p-2 border rounded"
//                         rows="3"
//                         required
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-gray-700 text-sm font-bold mb-1">Limited Offer</label>
//                       <input
//                         type="text"
//                         name="limitedoffer"
//                         value={editData.limitedoffer}
//                         onChange={handleEditChange}
//                         className="w-full p-2 border rounded"
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       type="submit"
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleCancelEdit}
//                       className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <>
//                   <div className="flex justify-between items-start">
//                     <h2 className="text-xl font-semibold">{discount.title}</h2>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(discount)}
//                         className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(discount._id)}
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 mt-2">{discount.desciption}</p>
//                   <div className="mt-3 flex gap-4">
//                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                       {discount.limited}
//                     </span>
//                     <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                       {discount.limitedoffer}
//                     </span>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Discountdisplay;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const Discountdisplay = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    desciption: "",
    limited: "",
    limitedoffer: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/discount/display"
        );
        setDiscounts(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch discounts");
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      try {
        await axios.delete(`http://localhost:8000/discount/deleted/${id}`);
        setDiscounts(discounts.filter((discount) => discount._id !== id));
        alert("Discount deleted successfully!");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete discount");
      }
    }
  };

  const handleEdit = (discount) => {
    setEditId(discount._id);
    setEditData({
      title: discount.title,
      desciption: discount.desciption,
      limited: discount.limited,
      limitedoffer: discount.limitedoffer,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/discount/display/${editId}`,
        editData
      );
      setDiscounts(
        discounts.map((discount) =>
          discount._id === editId ? response.data.data : discount
        )
      );
      setEditId(null);
      alert("Discount updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update discount");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.desciption,
      wrap: true,
    },
    {
      name: "Limited",
      selector: (row) => row.limited,
    },
    {
      name: "Limited Offer",
      selector: (row) => row.limitedoffer,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {editId === row._id ? null : (
            <div className='flex gap-2'>
              <button
                onClick={() => handleEdit(row)}
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(row._id)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm'
              >
                Delete
              </button>
            </div>
          )}
        </>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Discount Offers</h1>

      <button
        onClick={() => navigate("/discount/create")}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4'
      >
        Create New Discount
      </button>

      {error && <div className='text-red-500 mb-4'>{error}</div>}

      {editId && (
        <form
          onSubmit={handleEditSubmit}
          className='mb-6 border p-4 rounded shadow bg-gray-50'
        >
          <h2 className='text-lg font-semibold mb-4'>Edit Discount</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-sm font-bold mb-1'>Title</label>
              <input
                type='text'
                name='title'
                value={editData.title}
                onChange={handleEditChange}
                className='w-full p-2 border rounded'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-bold mb-1'>Limited</label>
              <input
                type='text'
                name='limited'
                value={editData.limited}
                onChange={handleEditChange}
                className='w-full p-2 border rounded'
                required
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-bold mb-1'>
                Description
              </label>
              <textarea
                name='desciption'
                value={editData.desciption}
                onChange={handleEditChange}
                className='w-full p-2 border rounded'
                rows='3'
                required
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-bold mb-1'>
                Limited Offer
              </label>
              <input
                type='text'
                name='limitedoffer'
                value={editData.limitedoffer}
                onChange={handleEditChange}
                className='w-full p-2 border rounded'
                required
              />
            </div>
          </div>
          <div className='flex gap-2'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'
            >
              Save
            </button>
            <button
              type='button'
              onClick={handleCancelEdit}
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded'
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <DataTable
        columns={columns}
        data={discounts}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
        noDataComponent={
          <div className='text-center py-4'>No discounts available</div>
        }
      />
    </div>
  );
};

export default Discountdisplay;
