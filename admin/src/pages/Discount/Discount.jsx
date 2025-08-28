import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Discount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    altText: "",
  });
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
  });

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
        toast.error(err.response?.data?.message || "Failed to fetch discounts");
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/discount/add",
        formData
      );
      console.log("Discount created:", response.data);
      toast.success("Discount created successfully!");
      setFormData({ title: "" });
      // Refresh the list
      const updatedResponse = await axios.get(
        "http://localhost:8000/discount/display"
      );
      setDiscounts(updatedResponse.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create discount");
      toast.error(err.response?.data?.message || "Failed to create discount");
      console.error("Error creating discount:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      try {
        await axios.delete(`http://localhost:8000/discount/deleted/${id}`);
        setDiscounts(discounts.filter((discount) => discount._id !== id));
        toast.success("Discount deleted successfully!");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete discount");
        toast.error(err.response?.data?.message || "Failed to delete discount");
      }
    }
  };

  const handleEdit = (discount) => {
    setEditId(discount._id);
    setEditData({
      title: discount.title,
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
      toast.success("Discount updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update discount");
      toast.error(err.response?.data?.message || "Failed to update discount");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className='container mx-auto p-4'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className='text-2xl font-bold mb-6'>Discount Management</h1>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Create Discount Form */}
        <div>
          <h2 className='text-xl font-semibold mb-4'>Create New Discount</h2>
          <form onSubmit={handleSubmit} className='max-w-md'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='title'
              >
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='title'
              >
                altText
              </label>
              <input
                type='text'
                id='altText'
                name='altText'
                value={formData.altText}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            </div>

            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Create Discount
              </button>
            </div>
          </form>
        </div>

        {/* Discount List */}
        <div>
          <h2 className='text-xl font-semibold mb-4'>Discount List</h2>

          {loading ? (
            <p>Loading discounts...</p>
          ) : (
            <div className='space-y-4'>
              {discounts.length === 0 ? (
                <p>No discounts found</p>
              ) : (
                <ul className='divide-y divide-gray-200'>
                  {discounts.map((discount) => (
                    <li key={discount._id} className='py-4'>
                      {editId === discount._id ? (
                        <form
                          onSubmit={handleEditSubmit}
                          className='flex items-center space-x-2'
                        >
                          <input
                            type='text'
                            name='title'
                            value={editData.title}
                            onChange={handleEditChange}
                            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1'
                            required
                          />

                          <input
                            type='text'
                            name='altText'
                            value={editData.altText}
                            onChange={handleEditChange}
                            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1'
                            required
                          />

                          <button
                            type='submit'
                            className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm'
                          >
                            Save
                          </button>
                          <button
                            type='button'
                            onClick={handleCancelEdit}
                            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm'
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <div className='flex justify-between items-center'>
                          <span className='font-medium'>{discount.title}</span>
                          <span className='font-medium'>
                            {discount.altText}
                          </span>

                          <div className='space-x-2'>
                            <button
                              onClick={() => handleEdit(discount)}
                              className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(discount._id)}
                              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discount;
