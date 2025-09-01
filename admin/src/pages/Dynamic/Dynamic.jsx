import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Dynamic = () => {
  const api = "http://localhost:8000/dynamics/";

  const [dynamics, setDynamics] = useState([]);
  const [formData, setFormData] = useState({
    path: "",
    element: "",
    DynamicName: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const formRef = useRef(null);

  // Fetch all dynamics
  const fetchDynamics = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(api);
      setDynamics(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch dynamics data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDynamics();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create or Update dynamic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        // Update existing
        await axios.put(`${api}${editingId}/`, formData);
        setSuccess("Dynamic updated successfully!");
      } else {
        // Create new
        await axios.post(api, formData);
        setSuccess("Dynamic created successfully!");
      }

      // Reset form
      setFormData({
        DynamicName: "",
        path: "",
        element: "",
      });
      setEditingId(null);
      fetchDynamics();
    } catch (err) {
      setError(
        editingId ? "Failed to update dynamic" : "Failed to create dynamic"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  // Edit dynamic
  const handleEdit = (dynamic) => {
    setFormData({
      DynamicName: dynamic.DynamicName || "",
      path: dynamic.path || "",
      element: dynamic.element || "",
    });
    setEditingId(dynamic._id);
    // Smooth scroll to the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  // Delete dynamic
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dynamic?")) {
      setIsLoading(true);
      try {
        await axios.delete(`${api}${id}/`);
        setSuccess("Dynamic deleted successfully!");
        fetchDynamics();
      } catch (err) {
        setError("Failed to delete dynamic");
        console.error(err);
      } finally {
        setIsLoading(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  const filtered = dynamics.filter((d) => {
    const q = search.toLowerCase();
    return (
      d?.path?.toLowerCase().includes(q) ||
      d?.element?.toLowerCase().includes(q) ||
      d?.DynamicName?.toLowerCase().includes(q)
    );
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Page Title */}
        <header className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              Dynamic Manager
            </h1>
            <p className='mt-2 text-sm text-gray-500'>
              {editingId
                ? "Editing existing dynamic"
                : "Create and manage dynamics"}
            </p>
          </div>
          <button
            onClick={fetchDynamics}
            className='inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50'
          >
            <svg
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 4v6h6M20 20v-6h-6M4 10a8.003 8.003 0 0115.313-3.313M20 14a8.003 8.003 0 01-15.313 3.313'
              />
            </svg>
            Refresh
          </button>
        </header>

        {/* Alerts */}
        <div className='space-y-4 mb-8'>
          {error && (
            <div className='relative rounded-md border-l-4 border-red-500 bg-red-50 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-red-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-red-700'>{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className='ml-auto text-red-400 hover:text-red-600'
                >
                  <span className='sr-only'>Dismiss</span>✕
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className='relative rounded-md border-l-4 border-green-500 bg-green-50 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-green-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-green-700'>{success}</p>
                </div>
                <button
                  onClick={() => setSuccess(null)}
                  className='ml-auto text-green-400 hover:text-green-600'
                >
                  <span className='sr-only'>Dismiss</span>✕
                </button>
              </div>
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Sticky Form */}
          <aside ref={formRef} className='lg:col-span-1'>
            <div className='sticky top-6'>
              <div className='overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200'>
                <div className='bg-indigo-600 px-6 py-4'>
                  <h2 className='text-lg font-semibold text-white'>
                    {editingId ? "Update Dynamic" : "Create Dynamic"}
                  </h2>
                  <p className='text-indigo-100 text-xs mt-1'>
                    Fill in the details below
                  </p>
                </div>

                <div className='px-6 py-5'>
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Route Path */}
                    <div>
                      <label
                        htmlFor='path'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Route Path
                      </label>
                      <input
                        type='text'
                        id='path'
                        name='path'
                        value={formData.path}
                        onChange={handleChange}
                        required
                        placeholder='/new-path'
                        className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                      />
                    </div>

                    {/* Component Name */}
                    <div>
                      <label
                        htmlFor='element'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Element
                        <span className='text-red-500 !text-[10px]'>
                          Read Only
                        </span>
                      </label>
                      <input
                        type='text'
                        id='element'
                        name='element'
                        value={formData.element}
                        onChange={handleChange}
                        readOnly
                        required
                        placeholder='About'
                        className='w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                      />
                    </div>

                    {/* Optional Dynamic Name */}
                    {/* <div>
                      <label
                        htmlFor='DynamicName'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Dynamic Name (optional)
                      </label>
                      <input
                        type='text'
                        id='DynamicName'
                        name='DynamicName'
                        value={formData.DynamicName}
                        onChange={handleChange}
                        placeholder='My Dynamic'
                        disabled={editingId}
                        className='w-full !outline-0 rounded-md border-gray-300 shadow-sm'
                      />
                    </div> */}

                    <div className='flex items-center gap-3 pt-2'>
                      <button
                        type='submit'
                        disabled={isLoading}
                        className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          isLoading
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                      >
                        {isLoading && (
                          <svg
                            className='animate-spin h-4 w-4'
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
                        )}
                        {editingId ? "Update" : "Create"}
                      </button>

                      {editingId && (
                        <button
                          type='button'
                          onClick={() => {
                            setFormData({
                              DynamicName: "",
                              path: "",
                              element: "",
                            });
                            setEditingId(null);
                          }}
                          disabled={isLoading}
                          className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </aside>

          {/* Table Section */}
          <section className='lg:col-span-2'>
            <div className='overflow-hidden rounded-xl bg-white shadow ring-1 ring-gray-200'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>
                  Dynamic List
                </h2>
                <div className='relative w-full sm:w-80'>
                  <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search by route or component...'
                    className='w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                  />
                  <svg
                    className='pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </div>

              {isLoading && dynamics.length === 0 ? (
                <div className='p-6'>
                  {/* Skeleton Loader */}
                  <div className='space-y-3 animate-pulse'>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className='h-4 bg-gray-200 rounded'></div>
                    ))}
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className='p-6'>
                  <div className='rounded-md border border-dashed border-gray-300 p-8 text-center'>
                    <p className='text-sm text-gray-500'>
                      No dynamics found. Create your first dynamic using the
                      form on the left.
                    </p>
                  </div>
                </div>
              ) : (
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500'
                        >
                          Route Path
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500'
                        >
                          Component Name
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500'
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {filtered.map((dynamic) => (
                        <tr
                          key={dynamic._id}
                          className='hover:bg-gray-50 transition-colors'
                        >
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {dynamic.path}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                            {dynamic.element}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2'>
                            <button
                              onClick={() => handleEdit(dynamic)}
                              disabled={isLoading}
                              className='inline-flex items-center rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(dynamic._id)}
                              disabled={isLoading}
                              className='inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dynamic;
