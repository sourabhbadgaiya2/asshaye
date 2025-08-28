// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

// const PlayStore = () => {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentBanner, setCurrentBanner] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const fetchBanners = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:8000/playstore/alldisplay"
//       );
//       setBanners(response.data);
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch banners");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const columns = [
//     {
//       name: "Images",
//       selector: (row) => row.images[0],
//       cell: (row) => (
//         <img
//           src={row.images[0]}
//           alt={row.altText}
//           className="w-16 h-16 object-cover rounded"
//         />
//       ),
//       sortable: false,
//     },
//     {
//       name: "Alt Text",
//       selector: (row) => row.altText,
//       sortable: true,
//     },
//     {
//       name: "URL",
//       selector: (row) => row.URL,
//       cell: (row) => (
//         <a
//           href={row.URL}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           {row.URL}
//         </a>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEdit(row._id)}
//             className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   const handleEdit = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:8000/playstore/editdisplay?id=${id}`
//       );
//       setCurrentBanner(response.data.data);
//       setIsEditing(true);
//       setShowForm(true);
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch banner");
//       setLoading(false);
//     }
//   };

//   const handleDelete = (id) => {
//     confirmAlert({
//       title: "Confirm to delete",
//       message: "Are you sure you want to delete this banner?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: async () => {
//             try {
//               await axios.delete(
//                 `http://localhost:8000/playstore/deleted/${id}`
//               );
//               toast.success("Banner deleted successfully");
//               fetchBanners();
//             } catch (error) {
//               toast.error(
//                 error.response?.data?.message || "Failed to delete banner"
//               );
//             }
//           },
//         },
//         {
//           label: "No",
//           onClick: () => {},
//         },
//       ],
//     });
//   };

//   const handleSubmitSuccess = () => {
//     fetchBanners();
//     setShowForm(false);
//     setIsEditing(false);
//     setCurrentBanner(null);
//   };

//   const PlayStoreForm = ({ isEditing, currentBanner, onSuccess, onCancel }) => {
//     const [formData, setFormData] = useState({
//       images: [],
//       altText: "",
//       URL: "",
//     });
//     const [imagePreviews, setImagePreviews] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//       if (isEditing && currentBanner) {
//         setFormData({
//           images: currentBanner.images,
//           altText: currentBanner.altText,
//           URL: currentBanner.URL,
//         });
//         setImagePreviews(currentBanner.images);
//       } else {
//         resetForm();
//       }
//     }, [isEditing, currentBanner]);

//     const resetForm = () => {
//       setFormData({
//         images: [],
//         altText: "",
//         URL: "",
//       });
//       setImagePreviews([]);
//     };

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     };

//     const handleImageChange = (e) => {
//       const files = Array.from(e.target.files);

//       // Create previews
//       const previews = files.map((file) => URL.createObjectURL(file));
//       setImagePreviews(previews);

//       // Update form data
//       setFormData((prev) => ({
//         ...prev,
//         images: files,
//       }));
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);

//       try {
//         const formDataToSend = new FormData();
//         formDataToSend.append("altText", formData.altText);
//         formDataToSend.append("URL", formData.URL);

//         // Append all images
//         if (!isEditing || typeof formData.images[0] !== "string") {
//           formData.images.forEach((image) => {
//             formDataToSend.append("images", image);
//           });
//         }

//         let response;
//         if (isEditing) {
//           formDataToSend.append("id", currentBanner._id);
//           response = await axios.post("/playstore/editsave", formDataToSend, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });
//         } else {
//           response = await axios.post(
//             "http://localhost:8000/playstore/create",
//             formDataToSend,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//         }

//         toast.success(response.data.message);
//         onSuccess();
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     return (
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">
//           {isEditing ? "Edit Banner" : "Add New Banner"}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Images</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleImageChange}
//               className="w-full p-2 border rounded"
//               accept="image/*"
//             />
//             <div className="flex flex-wrap mt-2 gap-2">
//               {imagePreviews.map((preview, index) => (
//                 <img
//                   key={index}
//                   src={preview}
//                   alt={`Preview ${index}`}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Alt Text</label>
//             <input
//               type="text"
//               name="altText"
//               value={formData.altText}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">URL</label>
//             <input
//               type="url"
//               name="URL"
//               value={formData.URL}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               disabled={loading}
//             >
//               {loading ? "Processing..." : isEditing ? "Update" : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">
//           PlayStore Banner Management
//         </h1>
//         <button
//           onClick={() => {
//             setShowForm(true);
//             setIsEditing(false);
//             setCurrentBanner(null);
//           }}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add New Banner
//         </button>
//       </div>

//       {showForm && (
//         <PlayStoreForm
//           isEditing={isEditing}
//           currentBanner={currentBanner}
//           onSuccess={handleSubmitSuccess}
//           onCancel={() => {
//             setShowForm(false);
//             setIsEditing(false);
//             setCurrentBanner(null);
//           }}
//         />
//       )}

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={banners}
//           progressPending={loading}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[10, 20, 30]}
//           highlightOnHover
//           responsive
//           noDataComponent={
//             <div className="py-8 text-gray-500">No banners found</div>
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default PlayStore;

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const PlayStore = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/playstore/alldisplay"
      );
      setBanners(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch banners");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const columns = [
    {
      name: "Images",
      selector: (row) => row.images[0],
      cell: (row) => (
        <img
          src={row.images[0]}
          alt={row.altText}
          className='w-16 h-16 object-cover rounded'
        />
      ),
      sortable: false,
    },
    {
      name: "Alt Text",
      selector: (row) => row.altText,
      sortable: true,
    },
    {
      name: "URL",
      selector: (row) => row.URL,
      cell: (row) => (
        <a
          href={row.URL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:underline'
        >
          {row.URL}
        </a>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex space-x-2'>
          <button
            onClick={() => handleEdit(row._id)}
            className='px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/playstore/editdisplay?id=${id}`
      );
      setCurrentBanner(response.data);
      setIsEditing(true);
      setShowForm(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch banner");
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this banner?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(
                `http://localhost:8000/playstore/deleted/${id}`
              );
              toast.success("Banner deleted successfully");
              fetchBanners();
            } catch (error) {
              toast.error(
                error.response?.data?.message || "Failed to delete banner"
              );
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleSubmitSuccess = () => {
    fetchBanners();
    setShowForm(false);
    setIsEditing(false);
    setCurrentBanner(null);
  };

  const PlayStoreForm = ({ isEditing, currentBanner, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
      images: [],
      altText: "",
      URL: "",
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (isEditing && currentBanner) {
        setFormData({
          images: currentBanner.images,
          altText: currentBanner.altText,
          URL: currentBanner.URL,
        });
        setImagePreviews(currentBanner.images);
      } else {
        resetForm();
      }
    }, [isEditing, currentBanner]);

    const resetForm = () => {
      setFormData({
        images: [],
        altText: "",
        URL: "",
      });
      setImagePreviews([]);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);

      // Create previews
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);

      // Update form data
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("altText", formData.altText);
        formDataToSend.append("URL", formData.URL);

        // Append all images
        if (formData.images.length > 0) {
          if (typeof formData.images[0] === "string") {
            // If images are URLs (existing images), send them as is
            formDataToSend.append("images", formData.images[0]);
          } else {
            // If images are files (new uploads), append them properly
            formData.images.forEach((image) => {
              formDataToSend.append("images", image);
            });
          }
        }

        let response;
        if (isEditing) {
          formDataToSend.append("id", currentBanner._id);
          response = await axios.post(
            "http://localhost:8000/playstore/editsave",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.post(
            "http://localhost:8000/playstore/create",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        toast.success(
          isEditing
            ? "Banner updated successfully"
            : "Banner created successfully"
        );
        onSuccess();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
        <h2 className='text-xl font-semibold mb-4'>
          {isEditing ? "Edit Banner" : "Add New Banner"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Images</label>
            <input
              type='file'
              onChange={handleImageChange}
              className='w-full p-2 border rounded'
              accept='image/*'
            />
            <div className='flex flex-wrap mt-2 gap-2'>
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className='w-16 h-16 object-cover rounded'
                />
              ))}
            </div>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Alt Text</label>
            <input
              type='text'
              name='altText'
              value={formData.altText}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>URL</label>
            <input
              type='url'
              name='URL'
              value={formData.URL}
              onChange={handleChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>

          <div className='flex justify-end space-x-3'>
            <button
              type='button'
              onClick={onCancel}
              className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              disabled={loading}
            >
              {loading ? "Processing..." : isEditing ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className='container mx-auto p-4'>
      <ToastContainer position='top-right' autoClose={3000} />

      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>
          PlayStore Banner Management
        </h1>
        <button
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
            setCurrentBanner(null);
          }}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Add New Banner
        </button>
      </div>

      {showForm && (
        <PlayStoreForm
          isEditing={isEditing}
          currentBanner={currentBanner}
          onSuccess={handleSubmitSuccess}
          onCancel={() => {
            setShowForm(false);
            setIsEditing(false);
            setCurrentBanner(null);
          }}
        />
      )}

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <DataTable
          columns={columns}
          data={banners}
          progressPending={loading}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          highlightOnHover
          responsive
          noDataComponent={
            <div className='py-8 text-gray-500'>No banners found</div>
          }
        />
      </div>
    </div>
  );
};

export default PlayStore;
