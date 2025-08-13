// import React, { useEffect, useMemo, useState } from "react";
// import DataTable from "react-data-table-component";
// import { toast } from "react-toastify";
// import {
//   FiTrash2,
//   FiEdit,
//   FiImage,
//   FiSave,
//   FiX,
//   FiUpload,
// } from "react-icons/fi";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import DOMPurify from "dompurify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// const TeamMemberDisplay = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentMember, setCurrentMember] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [filterText, setFilterText] = useState("");

//   const [editFormData, setEditFormData] = useState({
//     Membername: "",
//     Teamposition: "",
//     desciption: "",
//     phone: "",
//     email: "",
//     address: "",
//     altText: "",
//     staticUrl: "",
//     images: [],
//   });

//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [imageFiles, setImageFiles] = useState([]);

//   // Fetch all members
//   const fetchMembers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://backend.aashayeinjudiciary.com/member/display"
//       );
//       setMembers(response.data);
//       setError(null);
//     } catch (err) {
//       setError(
//         err.response?.data?.message || err.message || "Failed to fetch members"
//       );
//       toast.error(
//         err.response?.data?.message || err.message || "Failed to fetch members"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   useEffect(() => {
//     if (currentMember) {
//       setEditFormData({
//         Membername: currentMember.Membername || "",
//         Teamposition: currentMember.Teamposition || "",
//         desciption: currentMember.desciption || "",
//         phone: currentMember.phone || "",
//         email: currentMember.email || "",
//         address: currentMember.address || "",
//         altText: currentMember.altText || "",
//         staticUrl: currentMember.staticUrl || "",
//         images: currentMember.images || [],
//       });
//       setImagePreviews(currentMember.images || []);
//       setImageFiles([]);
//     }
//   }, [currentMember]);

//   // Delete a member
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this team member?")) {
//       try {
//         await axios.delete(
//           `https://backend.aashayeinjudiciary.com/member/${id}`
//         );
//         setMembers((prev) => prev.filter((member) => member._id !== id));
//         toast.success("Team member deleted successfully");
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Error deleting team member"
//         );
//         toast.error(
//           err.response?.data?.message ||
//             err.message ||
//             "Error deleting team member"
//         );
//       }
//     }
//   };

//   // Edit a member
//   const handleEdit = async (member) => {
//     try {
//       setLoading(true);
//       // Fetch the specific member data using the getMemberById endpoint
//       const response = await axios.get(
//         `https://backend.aashayeinjudiciary.com/member/${member._id}`
//       );
//       setCurrentMember(response.data);
//       setIsEditing(true);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Error fetching member details"
//       );
//       toast.error(
//         err.response?.data?.message ||
//           err.message ||
//           "Error fetching member details"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelEdit = () => {
//     setCurrentMember(null);
//     setIsEditing(false);
//     setImagePreviews([]);
//     setImageFiles([]);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDescriptionChange = (event, editor) => {
//     const data = editor.getData();
//     setEditFormData((prev) => ({
//       ...prev,
//       desciption: data,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);

//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews((prev) => [...prev, ...previews]);
//   };

//   const removeImage = (index) => {
//     const newPreviews = [...imagePreviews];
//     const isNewImage = index >= imagePreviews.length - imageFiles.length;

//     if (isNewImage) {
//       const fileIndex = index - (imagePreviews.length - imageFiles.length);
//       const newFiles = [...imageFiles];
//       newFiles.splice(fileIndex, 1);
//       setImageFiles(newFiles);
//     } else {
//       const newImages = [...editFormData.images];
//       newImages.splice(index, 1);
//       setEditFormData((prev) => ({
//         ...prev,
//         images: newImages,
//       }));
//     }

//     newPreviews.splice(index, 1);
//     setImagePreviews(newPreviews);
//   };

//   // Update member data
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!editFormData.Membername || !editFormData.Teamposition) {
//       toast.error("Name and Position are required fields");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("Membername", editFormData.Membername);
//     formData.append("Teamposition", editFormData.Teamposition);
//     formData.append("phone", editFormData.phone || "");
//     formData.append("email", editFormData.email || "");
//     formData.append("address", editFormData.address || "");
//     formData.append("altText", editFormData.altText || "");
//     formData.append("staticUrl", editFormData.staticUrl || "");
//     formData.append(
//       "desciption",
//       DOMPurify.sanitize(editFormData.desciption || "")
//     );

//     imageFiles.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `https://backend.aashayeinjudiciary.com/member/editsave/${currentMember._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMembers((prev) =>
//         prev.map((member) =>
//           member._id === currentMember._id ? response.data.data : member
//         )
//       );

//       toast.success("Team member updated successfully");
//       handleCancelEdit();
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Error updating team member"
//       );
//       toast.error(
//         err.response?.data?.message ||
//           err.message ||
//           "Error updating team member"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredMembers = useMemo(() => {
//     return members.filter(
//       (member) =>
//         member.Membername?.toLowerCase().includes(filterText.toLowerCase()) ||
//         member.Teamposition?.toLowerCase().includes(filterText.toLowerCase()) ||
//         member.email?.toLowerCase().includes(filterText.toLowerCase())
//     );
//   }, [filterText, members]);

//   const columns = useMemo(
//     () => [
//       {
//         name: "S.No",
//         selector: (row, index) => index + 1,
//         sortable: false,
//         width: "80px",
//         cell: (row, index) => <div className='text-gray-500'>{index + 1}</div>,
//       },
//       {
//         name: "Member Name",
//         selector: (row) => row.Membername,
//         sortable: true,
//         cell: (row) => (
//           <div className='font-medium text-gray-900'>{row.Membername}</div>
//         ),
//         minWidth: "150px",
//       },

//       {
//         name: "altText",
//         selector: (row) => row.altText,
//         sortable: true,
//         cell: (row) => (
//           <div className='font-medium text-gray-900'>{row.altText}</div>
//         ),
//         minWidth: "150px",
//       },

//       {
//         name: "Position",
//         selector: (row) => row.Teamposition,
//         sortable: true,
//         cell: (row) => <div className='text-gray-600'>{row.Teamposition}</div>,
//         minWidth: "120px",
//       },
//       {
//         name: "Description",
//         selector: (row) => row.desciption,
//         sortable: true,
//         cell: (row) => (
//           <div
//             className='text-gray-600 prose max-w-none'
//             dangerouslySetInnerHTML={{
//               __html: DOMPurify.sanitize(row.desciption || ""),
//             }}
//           />
//         ),
//         minWidth: "200px",
//       },
//       {
//         name: "Contact",
//         selector: (row) => row.email,
//         cell: (row) => (
//           <div className='space-y-1'>
//             {row.email && (
//               <div className='text-sm text-gray-600'>
//                 <a
//                   href={`mailto:${row.email}`}
//                   className='hover:text-blue-600 hover:underline'
//                 >
//                   {row.email}
//                 </a>
//               </div>
//             )}
//             {row.phone && (
//               <div className='text-sm text-gray-600'>{row.phone}</div>
//             )}
//             {row.address && (
//               <div className='text-sm text-gray-600'>{row.address}</div>
//             )}
//           </div>
//         ),
//         minWidth: "200px",
//       },
//       {
//         name: "Images",
//         cell: (row) => (
//           <div className='flex flex-wrap gap-1'>
//             {row.images && row.images.length > 0 ? (
//               row.images.map((img, index) => (
//                 <div key={index} className='relative group'>
//                   <img
//                     src={img}
//                     alt={`${row.Membername}-${index}`}
//                     className='w-12 h-12 object-cover rounded border border-gray-200'
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "https://via.placeholder.com/60";
//                     }}
//                   />
//                   <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100'>
//                     <a
//                       href={img}
//                       target='_blank'
//                       rel='noopener noreferrer'
//                       className='text-white p-1 hover:text-blue-300'
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <FiImage size={14} />
//                     </a>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className='w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400'>
//                 <FiImage size={18} />
//               </div>
//             )}
//           </div>
//         ),
//         ignoreRowClick: true,
//         minWidth: "150px",
//       },
//       {
//         name: "Actions",
//         cell: (row) => (
//           <div className='flex space-x-2'>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleEdit(row);
//               }}
//               className='p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors'
//               title='Edit'
//               disabled={isEditing}
//             >
//               <FiEdit size={18} />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleDelete(row._id);
//               }}
//               className='p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors'
//               title='Delete'
//               disabled={isEditing}
//             >
//               <FiTrash2 size={18} />
//             </button>
//           </div>
//         ),
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//         minWidth: "100px",
//       },
//     ],
//     [isEditing]
//   );

//   const customStyles = {
//     headRow: {
//       style: {
//         backgroundColor: "#f9fafb",
//         fontWeight: "600",
//         fontSize: "0.75rem",
//         textTransform: "uppercase",
//         letterSpacing: "0.05em",
//         borderTop: "1px solid #f3f4f6",
//       },
//     },
//     rows: {
//       style: {
//         minHeight: "72px",
//         "&:not(:last-of-type)": {
//           borderBottom: "1px solid #f3f4f6",
//         },
//         "&:hover": {
//           backgroundColor: "#f8fafc",
//         },
//       },
//     },
//     pagination: {
//       style: {
//         backgroundColor: "#f9fafb",
//         borderTop: "1px solid #f3f4f6",
//       },
//     },
//   };

//   if (loading && !isEditing) {
//     return (
//       <div className='flex justify-center items-center h-64'>
//         <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
//       </div>
//     );
//   }

//   return (
//     <div className='p-4 md:p-6'>
//       <div className='flex justify-between items-center mb-6'>
//         <h1 className='text-2xl font-bold text-gray-800'>Team Members</h1>
//         <div className='text-sm text-gray-500'>
//           {members.length} {members.length === 1 ? "member" : "members"} total
//           {isEditing && (
//             <span className='ml-2 text-blue-600'>(Editing Mode)</span>
//           )}
//         </div>
//       </div>

//       <div className='mb-4'>
//         <input
//           type='text'
//           placeholder='Search by name, position or email...'
//           className='p-2 border border-gray-300 rounded w-full md:w-1/3'
//           value={filterText}
//           onChange={(e) => setFilterText(e.target.value)}
//           disabled={isEditing}
//         />
//       </div>

//       <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
//         <DataTable
//           columns={columns}
//           data={filteredMembers}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
//           highlightOnHover
//           striped
//           responsive
//           persistTableHead
//           customStyles={customStyles}
//           noDataComponent={
//             <div className='p-8 text-center'>
//               <div className='text-gray-400 mb-2'>
//                 <FiImage size={48} className='mx-auto' />
//               </div>
//               <h3 className='text-lg font-medium text-gray-700'>
//                 No team members found
//               </h3>
//               <p className='text-gray-500 mt-1'>
//                 Add your first team member to get started
//               </p>
//             </div>
//           }
//         />
//       </div>

//       {isEditing && (
//         <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
//           <h2 className='text-xl font-semibold mb-4'>Edit Team Member</h2>
//           <form onSubmit={handleUpdate}>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
//               <div>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Member Name*
//                 </label>
//                 <input
//                   type='text'
//                   name='Membername'
//                   value={editFormData.Membername}
//                   onChange={handleEditChange}
//                   className='w-full p-2 border border-gray-300 rounded'
//                   required
//                 />
//               </div>

//               <div>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   altText
//                 </label>
//                 <input
//                   type='text'
//                   name='altText'
//                   value={editFormData.altText}
//                   onChange={handleEditChange}
//                   className='w-full p-2 border border-gray-300 rounded'
//                   required
//                 />
//               </div>
//               <div>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Static Url
//                 </label>
//                 <input
//                   type='text'
//                   name='staticUrl'
//                   value={editFormData.staticUrl}
//                   onChange={handleEditChange}
//                   className='w-full p-2 border border-gray-300 rounded'
//                   required
//                 />
//               </div>

//               <div>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Position*
//                 </label>
//                 <input
//                   type='text'
//                   name='Teamposition'
//                   value={editFormData.Teamposition}
//                   onChange={handleEditChange}
//                   className='w-full p-2 border border-gray-300 rounded'
//                   required
//                 />
//               </div>
//               <div className='md:col-span-2'>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Description
//                 </label>
//                 <CKEditor
//                   editor={ClassicEditor}
//                   data={editFormData.desciption}
//                   onChange={handleDescriptionChange}
//                   config={{
//                     toolbar: [
//                       "heading",
//                       "|",
//                       "bold",
//                       "italic",
//                       "link",
//                       "bulletedList",
//                       "numberedList",
//                       "|",
//                       "undo",
//                       "redo",
//                     ],
//                   }}
//                 />
//               </div>
//               <div>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Email
//                 </label>
//                 <input
//                   type='email'
//                   name='email'
//                   value={editFormData.email}
//                   onChange={handleEditChange}
//                   className='w-full p-2 border border-gray-300 rounded'
//                 />
//               </div>
//               <div>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Phone
//                 </label>
//                 <input
//                   type='tel'
//                   name='phone'
//                   value={editFormData.phone}
//                   onChange={handleEditChange}
//                   className='w-full p-2 border border-gray-300 rounded'
//                 />
//               </div>
//               <div className='md:col-span-2'>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Address
//                 </label>
//                 <input
//                   type='text'
//                   name='address'
//                   value={editFormData.address}
//                   onChange={handleEditChange}
//                   className='w-full p-2 border border-gray-300 rounded'
//                 />
//               </div>
//               <div className='md:col-span-2'>
//                 <label className='block text-sm font-medium text-gray-700 mb-1'>
//                   Images
//                 </label>
//                 <div className='flex flex-wrap gap-3 mb-3'>
//                   {imagePreviews.map((img, index) => (
//                     <div key={index} className='relative group'>
//                       <img
//                         src={img}
//                         alt={`preview-${index}`}
//                         className='w-20 h-20 object-cover rounded border border-gray-200'
//                       />
//                       <button
//                         type='button'
//                         onClick={() => removeImage(index)}
//                         className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors'
//                       >
//                         <FiX size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <label className='inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer'>
//                   <FiUpload className='mr-2' />
//                   Upload Images
//                   <input
//                     type='file'
//                     multiple
//                     accept='image/*'
//                     onChange={handleImageChange}
//                     className='sr-only'
//                   />
//                 </label>
//                 <p className='mt-1 text-sm text-gray-500'>
//                   Upload new images to add to existing ones
//                 </p>
//               </div>
//             </div>
//             <div className='flex justify-end space-x-3'>
//               <button
//                 type='button'
//                 onClick={handleCancelEdit}
//                 className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//               >
//                 Cancel
//               </button>
//               <button
//                 type='submit'
//                 className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamMemberDisplay;
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {
  FiTrash2,
  FiEdit,
  FiImage,
  FiSave,
  FiX,
  FiUpload,
  FiEye,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const TeamMemberDisplay = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [editFormData, setEditFormData] = useState({
    Membername: "",
    Teamposition: "",
    desciption: "",
    phone: "",
    email: "",
    address: "",
    altText: "",
    staticUrl: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  // Modal styles
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '900px',
      maxHeight: '90vh',
      overflow: 'auto',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '0'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    }
  };

  // Fetch all members
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://backend.aashayeinjudiciary.com/member/display"
      );
      setMembers(response.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch members"
      );
      toast.error(
        err.response?.data?.message || err.message || "Failed to fetch members"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (currentMember) {
      setEditFormData({
        Membername: currentMember.Membername || "",
        Teamposition: currentMember.Teamposition || "",
        desciption: currentMember.desciption || "",
        phone: currentMember.phone || "",
        email: currentMember.email || "",
        address: currentMember.address || "",
        altText: currentMember.altText || "",
        staticUrl: currentMember.staticUrl || "",
        images: currentMember.images || [],
        metaTitle: currentMember.metaTitle || "",
        metaDescription: currentMember.metaDescription || "",
        metaKeywords: currentMember.metaKeywords || "",
        metaCanonical: currentMember.metaCanonical || "",
      });
      setImagePreviews(currentMember.images || []);
      setImageFiles([]);
    }
  }, [currentMember]);

  // Delete a member
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(
          `https://backend.aashayeinjudiciary.com/member/${id}`
        );
        setMembers((prev) => prev.filter((member) => member._id !== id));
        toast.success("Team member deleted successfully");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error deleting team member"
        );
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Error deleting team member"
        );
      }
    }
  };

  // View a member
  const handleView = (member) => {
    setCurrentMember(member);
    setIsViewing(true);
  };

  // Edit a member
  const handleEdit = async (member) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backend.aashayeinjudiciary.com/member/${member._id}`
      );
      setCurrentMember(response.data);
      setIsEditing(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error fetching member details"
      );
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Error fetching member details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setCurrentMember(null);
    setIsEditing(false);
    setImagePreviews([]);
    setImageFiles([]);
  };

  const handleCloseView = () => {
    setIsViewing(false);
    setCurrentMember(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setEditFormData((prev) => ({
      ...prev,
      desciption: data,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    const isNewImage = index >= imagePreviews.length - imageFiles.length;

    if (isNewImage) {
      const fileIndex = index - (imagePreviews.length - imageFiles.length);
      const newFiles = [...imageFiles];
      newFiles.splice(fileIndex, 1);
      setImageFiles(newFiles);
    } else {
      const newImages = [...editFormData.images];
      newImages.splice(index, 1);
      setEditFormData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }

    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  // Update member data
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editFormData.Membername || !editFormData.Teamposition) {
      toast.error("Name and Position are required fields");
      return;
    }

    const formData = new FormData();

    formData.append("Membername", editFormData.Membername);
    formData.append("Teamposition", editFormData.Teamposition);
    formData.append("phone", editFormData.phone || "");
    formData.append("email", editFormData.email || "");
    formData.append("address", editFormData.address || "");
    formData.append("altText", editFormData.altText || "");
    formData.append("staticUrl", editFormData.staticUrl || "");
    formData.append(
      "desciption",
      DOMPurify.sanitize(editFormData.desciption || "")
    );
    formData.append("metaTitle", editFormData.metaTitle || "");
    formData.append("metaDescription", editFormData.metaDescription || "");
    formData.append("metaKeywords", editFormData.metaKeywords || "");
    formData.append("metaCanonical", editFormData.metaCanonical || "");

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);
      const response = await axios.put(
        `https://backend.aashayeinjudiciary.com/member/editsave/${currentMember._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMembers((prev) =>
        prev.map((member) =>
          member._id === currentMember._id ? response.data.data : member
        )
      );

      toast.success("Team member updated successfully");
      handleCancelEdit();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error updating team member"
      );
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Error updating team member"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        member.Membername?.toLowerCase().includes(filterText.toLowerCase()) ||
        member.Teamposition?.toLowerCase().includes(filterText.toLowerCase()) ||
        member.email?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, members]);

  const columns = useMemo(
    () => [
      {
        name: "S.No",
        selector: (row, index) => index + 1,
        sortable: false,
        width: "80px",
        cell: (row, index) => <div className='text-gray-500'>{index + 1}</div>,
      },
      {
        name: "Member Name",
        selector: (row) => row.Membername,
        sortable: true,
        cell: (row) => (
          <div className='font-medium text-gray-900'>{row.Membername}</div>
        ),
        minWidth: "150px",
      },
      {
        name: "Position",
        selector: (row) => row.Teamposition,
        sortable: true,
        cell: (row) => <div className='text-gray-600'>{row.Teamposition}</div>,
        minWidth: "120px",
      },
      {
        name: "Contact",
        selector: (row) => row.email,
        cell: (row) => (
          <div className='space-y-1'>
            {row.email && (
              <div className='text-sm text-gray-600 truncate max-w-xs'>
                {row.email}
              </div>
            )}
          </div>
        ),
        minWidth: "200px",
      },
      {
        name: "Images",
        cell: (row) => (
          <div className='flex flex-wrap gap-1'>
            {row.images && row.images.length > 0 ? (
              <div className='relative group'>
                <img
                  src={row.images[0]}
                  alt={row.Membername}
                  className='w-12 h-12 object-cover rounded border border-gray-200'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/60";
                  }}
                />
                {row.images.length > 1 && (
                  <div className='absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                    +{row.images.length - 1}
                  </div>
                )}
              </div>
            ) : (
              <div className='w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400'>
                <FiImage size={18} />
              </div>
            )}
          </div>
        ),
        ignoreRowClick: true,
        minWidth: "100px",
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className='flex space-x-2'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleView(row);
              }}
              className='p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors'
              title='View'
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(row);
              }}
              className='p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors'
              title='Edit'
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row._id);
              }}
              className='p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors'
              title='Delete'
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        minWidth: "140px",
      },
    ],
    []
  );

  const tableCustomStyles = {
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        fontWeight: "600",
        fontSize: "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderTop: "1px solid #f3f4f6",
      },
    },
    rows: {
      style: {
        minHeight: "72px",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #f3f4f6",
        },
        "&:hover": {
          backgroundColor: "#f8fafc",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f9fafb",
        borderTop: "1px solid #f3f4f6",
      },
    },
  };

  if (loading && !isEditing && !isViewing) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div className='p-4 md:p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Team Members</h1>
        <div className='text-sm text-gray-500'>
          {members.length} {members.length === 1 ? "member" : "members"} total
        </div>
      </div>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by name, position or email...'
          className='p-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
        <DataTable
          columns={columns}
          data={filteredMembers}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
          highlightOnHover
          striped
          responsive
          persistTableHead
          customStyles={tableCustomStyles}
          noDataComponent={
            <div className='p-8 text-center'>
              <div className='text-gray-400 mb-2'>
                <FiUser size={48} className='mx-auto' />
              </div>
              <h3 className='text-lg font-medium text-gray-700'>
                No team members found
              </h3>
              <p className='text-gray-500 mt-1'>
                {filterText ? 'Try a different search term' : 'Add your first team member to get started'}
              </p>
            </div>
          }
        />
      </div>

      {/* View Member Modal */}
      <Modal
        isOpen={isViewing}
        onRequestClose={handleCloseView}
        style={customStyles}
        contentLabel="View Team Member"
      >
        {currentMember && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">{currentMember.Membername}</h2>
              <button
                onClick={handleCloseView}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  {currentMember.images && currentMember.images.length > 0 ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <img
                          src={currentMember.images[0]}
                          alt={currentMember.Membername}
                          className="w-full h-64 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300";
                          }}
                        />
                      </div>
                      {currentMember.images.length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                          {currentMember.images.slice(1).map((img, index) => (
                            <div key={index} className="relative">
                              <img
                                src={img}
                                alt={`${currentMember.Membername}-${index + 1}`}
                                className="w-full h-20 object-cover rounded border border-gray-200"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                      <FiImage size={48} />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FiBriefcase className="text-gray-500" />
                      <span className="font-medium">{currentMember.Teamposition}</span>
                    </div>

                    {currentMember.email && (
                      <div className="flex items-center space-x-2">
                        <FiMail className="text-gray-500" />
                        <a href={`mailto:${currentMember.email}`} className="text-blue-600 hover:underline">
                          {currentMember.email}
                        </a>
                      </div>
                    )}

                    {currentMember.phone && (
                      <div className="flex items-center space-x-2">
                        <FiPhone className="text-gray-500" />
                        <span>{currentMember.phone}</span>
                      </div>
                    )}

                    {currentMember.address && (
                      <div className="flex items-center space-x-2">
                        <FiMapPin className="text-gray-500" />
                        <span>{currentMember.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                    <div
                      className="prose max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(currentMember.desciption || "No description available"),
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Information</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">Alt Text: </span>
                        <span>{currentMember.altText || "Not specified"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Static URL: </span>
                        <span>{currentMember.staticUrl || "Not specified"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={handleCloseView}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={isEditing}
        onRequestClose={handleCancelEdit}
        style={customStyles}
        contentLabel="Edit Team Member"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Team Member</h2>
            <button
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Name*
                </label>
                <input
                  type="text"
                  name="Membername"
                  value={editFormData.Membername}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position*
                </label>
                <input
                  type="text"
                  name="Teamposition"
                  value={editFormData.Teamposition}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  name="altText"
                  value={editFormData.altText}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Static URL
                </label>
                <input
                  type="text"
                  name="staticUrl"
                  value={editFormData.staticUrl}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <CKEditor
                    editor={ClassicEditor}
                    data={editFormData.desciption}
                    onChange={handleDescriptionChange}
                    config={{
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "undo",
                        "redo",
                      ],
                    }}
                  />
                </div>
              </div>

              <div className='md:col-span-2'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  SEO Settings
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Meta Title
                    </label>
                    <input
                      type='text'
                      name='metaTitle'
                      value={editFormData.metaTitle}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Meta Keywords
                    </label>
                    <input
                      type='text'
                      name='metaKeywords'
                      value={editFormData.metaKeywords}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Meta Description
                    </label>
                    <textarea
                      name='metaDescription'
                      value={editFormData.metaDescription}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                      rows='3'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Canonical URL
                    </label>
                    <input
                      type='text'
                      name='metaCanonical'
                      value={editFormData.metaCanonical}
                      onChange={handleEditChange}
                      className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images
                </label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {imagePreviews.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`preview-${index}`}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors">
                  <FiUpload className="mr-2" />
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  Upload new images to add to existing ones
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TeamMemberDisplay;