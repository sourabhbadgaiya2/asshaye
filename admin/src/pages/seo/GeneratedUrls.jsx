import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneratedUrls = () => {
  const [allUrls, setAllUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 10;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/blog-seo/generated-urls"
        );
        setAllUrls(response.data);
      } catch (err) {
        setError("URLs fetch करने में कोई दिक्कत आई।");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  // Pagination Logic
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = allUrls.slice(indexOfFirstUrl, indexOfLastUrl);
  const totalPages = Math.ceil(allUrls.length / urlsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // Conditional Rendering
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className='p-4 mx-auto my-8 max-w-2xl bg-red-100 border border-red-400 text-red-700 rounded relative'
        role='alert'
      >
        <span className='block sm:inline'>{error}</span>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 md:p-8'>
      <h2 className='text-3xl font-bold text-gray-800 mb-2'>Generated URLs</h2>
      <p className='text-sm text-gray-500 mb-6'>Total URLs: {allUrls.length}</p>

      {currentUrls.length === 0 ? (
        <div
          className='p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded'
          role='alert'
        >
          Url not found
        </div>
      ) : (
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    #
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Title
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Type
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    URL
                  </th>
                  {/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {currentUrls.map((item, index) => (
                  <tr key={indexOfFirstUrl + index}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {indexOfFirstUrl + index + 1}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.title}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {item.type}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline truncate'>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block max-w-xs'
                      >
                        {item.url}
                      </a>
                    </td>
                    {/* <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-900'
                      >
                        View Page
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className='flex justify-between items-center mt-6'>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            ← Previous
          </button>
          <span className='text-sm text-gray-700'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneratedUrls;
