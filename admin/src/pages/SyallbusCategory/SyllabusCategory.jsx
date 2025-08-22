
// "use client";
// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Save, X, FolderTree } from "lucide-react";
// import {
//   addCategory,
//   deleteCategory,
//   fetchcategory,
//   updateCategory,
// } from "./api";

// const SyllabusCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // New states for Add
//   const [newCategory, setNewCategory] = useState("");
//   const [staticUrl, setstaticUrl] = useState("");
//   const [newTitle, setNewTitle] = useState("");
//   const [newMetaKeywords, setNewMetaKeywords] = useState("");
//   const [newMetaDescription, setNewMetaDescription] = useState("");

//   // Edit states
//   const [editingCategory, setEditingCategory] = useState("");
//   const [editName, setEditName] = useState("");
//   const [editStaticUrl, setEditStaticUrl] = useState("");
//   const [editTitle, setEditTitle] = useState("");
//   const [editMetaKeywords, setEditMetaKeywords] = useState("");
//   const [editMetaDescription, setEditMetaDescription] = useState("");

//   // Fetch categories
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchcategory();
//       if (response.data) {
//         setCategories(response.data);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Failed to load categories. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;
//     try {
//       await addCategory({
//         name: newCategory,
//         staticUrl: staticUrl,
//         title: newTitle,
//         metaKeywords: newMetaKeywords,
//         metaDescription: newMetaDescription,
//       });
//       // reset form
//       setNewCategory("");
//       setstaticUrl("");
//       setNewTitle("");
//       setNewMetaKeywords("");
//       setNewMetaDescription("");
//       await fetchCategories();
//     } catch (error) {
//       console.error("Error adding category:", error);
//       setError("Failed to add category. Please try again.");
//     }
//   };

//   const handleEditCategory = (category) => {
//     setEditingCategory(category._id);
//     setEditName(category.name);
//     setEditStaticUrl(category.staticUrl || "");
//     setEditTitle(category.title || "");
//     setEditMetaKeywords(category.metaKeywords || "");
//     setEditMetaDescription(category.metaDescription || "");
//   };

//   const handleSaveEdit = async (id) => {
//     if (!editName.trim()) return;

//     try {
//       await updateCategory(id, {
//         name: editName.trim(),
//         staticUrl: editStaticUrl,
//         title: editTitle,
//         metaKeywords: editMetaKeywords,
//         metaDescription: editMetaDescription,
//       });

//       setCategories(
//         categories.map((cat) =>
//           cat._id === id
//             ? {
//                 ...cat,
//                 name: editName.trim(),
//                 staticUrl: editStaticUrl,
//                 title: editTitle,
//                 metaKeywords: editMetaKeywords,
//                 metaDescription: editMetaDescription,
//               }
//             : cat
//         )
//       );

//       setEditingCategory(null);
//       setEditName("");
//       setEditStaticUrl("");
//       setEditTitle("");
//       setEditMetaKeywords("");
//       setEditMetaDescription("");
//     } catch (error) {
//       console.error("Error updating category:", error);
//       setError("Failed to update category. Please try again.");
//     }
//   };

//   const handleDeleteCategory = async (id) => {
//     try {
//       await deleteCategory(id);
//       setCategories(categories.filter((cat) => cat._id !== id));
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       setError("Failed to delete category. Please try again.");
//     }
//   };

//   return (
//     <div className='max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
//       <div className='px-6 py-4 bg-primary-600 text-white flex items-center'>
//         <FolderTree className='mr-2' size={24} />
//         <h2 className='text-xl font-bold'>Category Management</h2>
//       </div>

//       {error && (
//         <div className='p-4 bg-red-50 text-red-700 border-b border-red-100'>
//           {error}
//         </div>
//       )}

//       <div className='p-6'>
//         {/* Add New Category */}
//         <div className='mb-6'>
//           <h3 className='text-lg font-medium mb-3'>Add New Category</h3>
//           <div className='space-y-3'>
//             <input
//               type='text'
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               placeholder='Enter category name'
//               className='w-full px-4 py-2 border border-gray-300 rounded-md'
//             />
//             <input
//               type='text'
//               value={staticUrl}
//               onChange={(e) => setstaticUrl(e.target.value)}
//               placeholder='Enter static URL (slug)'
//               className='w-full px-4 py-2 border border-gray-300 rounded-md'
//             />
//             <input
//               type='text'
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               placeholder='SEO Title'
//               className='w-full px-4 py-2 border border-gray-300 rounded-md'
//             />
//             <input
//               type='text'
//               value={newMetaKeywords}
//               onChange={(e) => setNewMetaKeywords(e.target.value)}
//               placeholder='Meta Keywords (comma separated)'
//               className='w-full px-4 py-2 border border-gray-300 rounded-md'
//             />
//             <textarea
//               value={newMetaDescription}
//               onChange={(e) => setNewMetaDescription(e.target.value)}
//               placeholder='Meta Description'
//               className='w-full px-4 py-2 border border-gray-300 rounded-md'
//             />
//             <button
//               onClick={handleAddCategory}
//               disabled={!newCategory.trim()}
//               className={`px-4 py-2 rounded-md text-white ${
//                 newCategory.trim()
//                   ? "!bg-gray-600 hover:bg-primary-700"
//                   : "!bg-gray-300 cursor-not-allowed"
//               }`}
//             >
//               <Plus size={18} className='inline-block mr-1' />
//               Add Category
//             </button>
//           </div>
//         </div>

//         {/* Categories List */}
//         <div>
//           <h3 className='text-lg font-medium mb-3'>Categories</h3>

//           {loading ? (
//             <div className='text-center py-4 text-black'>
//               Loading categories...
//             </div>
//           ) : categories.length === 0 ? (
//             <div className='text-center py-4 text-gray-500'>
//               No categories found.
//             </div>
//           ) : (
//             <div className='border rounded-md overflow-hidden'>
//               <table className='min-w-full divide-y divide-gray-200'>
//                 <thead className='bg-gray-50'>
//                   <tr>
//                     <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
//                       Details
//                     </th>
//                     <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className='bg-white divide-y divide-gray-200'>
//                   {categories.map((category) => (
//                     <tr key={category._id}>
//                       <td className='px-6 py-4 whitespace-nowrap'>
//                         {editingCategory === category._id ? (
//                           <div className='space-y-2'>
//                             <input
//                               type='text'
//                               value={editName}
//                               onChange={(e) => setEditName(e.target.value)}
//                               placeholder='Category Name'
//                               className='w-full px-2 py-1 border border-gray-300 rounded-md'
//                             />
//                             <input
//                               type='text'
//                               value={editStaticUrl}
//                               onChange={(e) => setEditStaticUrl(e.target.value)}
//                               placeholder='Static URL'
//                               className='w-full px-2 py-1 border border-gray-300 rounded-md'
//                             />
//                             <input
//                               type='text'
//                               value={editTitle}
//                               onChange={(e) => setEditTitle(e.target.value)}
//                               placeholder='SEO Title'
//                               className='w-full px-2 py-1 border border-gray-300 rounded-md'
//                             />
//                             <input
//                               type='text'
//                               value={editMetaKeywords}
//                               onChange={(e) =>
//                                 setEditMetaKeywords(e.target.value)
//                               }
//                               placeholder='Meta Keywords'
//                               className='w-full px-2 py-1 border border-gray-300 rounded-md'
//                             />
//                             <textarea
//                               value={editMetaDescription}
//                               onChange={(e) =>
//                                 setEditMetaDescription(e.target.value)
//                               }
//                               placeholder='Meta Description'
//                               className='w-full px-2 py-1 border border-gray-300 rounded-md'
//                             />
//                           </div>
//                         ) : (
//                           <div>
//                             <div className='font-medium text-gray-900'>
//                               {category.name}
//                             </div>
//                             <div className='text-xs text-gray-500'>
//                               /{category.staticUrl}
//                             </div>
//                             <div className='text-xs text-gray-400'>
//                               Title: {category.title || "-"}
//                             </div>
//                             <div className='text-xs text-gray-400'>
//                               Keywords: {category.metaKeywords || "-"}
//                             </div>
//                             <div className='text-xs text-gray-400'>
//                               Desc: {category.metaDescription || "-"}
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                       <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
//                         {editingCategory === category._id ? (
//                           <div className='flex justify-end space-x-2'>
//                             <button
//                               onClick={() => handleSaveEdit(category._id)}
//                               disabled={!editName.trim()}
//                               className='text-green-600 hover:text-green-900'
//                             >
//                               <Save size={18} />
//                             </button>
//                             <button
//                               onClick={() => setEditingCategory(null)}
//                               className='text-gray-600 hover:text-gray-900'
//                             >
//                               <X size={18} />
//                             </button>
//                           </div>
//                         ) : (
//                           <div className='flex justify-end space-x-3'>
//                             <button
//                               onClick={() => handleEditCategory(category)}
//                               className='text-blue-600 hover:text-blue-900'
//                             >
//                               <Edit size={18} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteCategory(category._id)}
//                               className='text-red-600 hover:text-red-900'
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SyllabusCategory;


import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, FolderTree } from "lucide-react";
import {
  addCategory,
  deleteCategory,
  fetchcategory,
  updateCategory,
} from "./api";

const SyllabusCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStaticUrl, setNewStaticUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newMetaKeywords, setNewMetaKeywords] = useState("");
  const [newMetaDescription, setNewMetaDescription] = useState("");

  // Edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editStaticUrl, setEditStaticUrl] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editMetaKeywords, setEditMetaKeywords] = useState("");
  const [editMetaDescription, setEditMetaDescription] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetchcategory();
      if (response.data) setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load categories.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newName.trim()) return;
    try {
      await addCategory({
        name: newName,
        staticUrl: newStaticUrl,
        title: newTitle,
        metaKeywords: newMetaKeywords,
        metaDescription: newMetaDescription,
      });
      // reset fields
      setNewName("");
      setNewStaticUrl("");
      setNewTitle("");
      setNewMetaKeywords("");
      setNewMetaDescription("");
      setIsAddModalOpen(false);
      await fetchCategories();
    } catch (error) {
      console.error(error);
      setError("Failed to add category.");
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditStaticUrl(category.staticUrl || "");
    setEditTitle(category.title || "");
    setEditMetaKeywords(category.metaKeywords || "");
    setEditMetaDescription(category.metaDescription || "");
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) return;
    try {
      await updateCategory(editingCategory._id, {
        name: editName.trim(),
        staticUrl: editStaticUrl,
        title: editTitle,
        metaKeywords: editMetaKeywords,
        metaDescription: editMetaDescription,
      });

      setCategories(
        categories.map((cat) =>
          cat._id === editingCategory._id
            ? {
                ...cat,
                name: editName.trim(),
                staticUrl: editStaticUrl,
                title: editTitle,
                metaKeywords: editMetaKeywords,
                metaDescription: editMetaDescription,
              }
            : cat
        )
      );

      setIsEditModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error(error);
      setError("Failed to update category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error(error);
      setError("Failed to delete category.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-primary-600 text-white flex items-center">
        <FolderTree className="mr-2" size={24} />
        <h2 className="text-xl font-bold">Category Management</h2>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-700">{error}</div>}

      <div className="p-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 mb-4 bg-gray-600 text-white rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add New Category
        </button>

        {/* Categories List */}
        {loading ? (
          <div>Loading...</div>
        ) : (
      <table className="min-w-full divide-y divide-gray-200">
  <thead>
    <tr>
      <th className="px-6 py-3 text-left">Name</th>
      <th className="px-6 py-3 text-left">Static URL</th>
      <th className="px-6 py-3 text-left">Title</th>
      <th className="px-6 py-3 text-left">Meta Keywords</th>
      <th className="px-6 py-3 text-left">Meta Description</th>
      <th className="px-6 py-3 text-right">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((cat) => (
      <tr key={cat._id}>
        <td className="px-6 py-4">{cat.name}</td>
        <td className="px-6 py-4">{cat.staticUrl || "-"}</td>
        <td className="px-6 py-4">{cat.title || "-"}</td>
        <td className="px-6 py-4">{cat.metaKeywords || "-"}</td>
        <td className="px-6 py-4">{cat.metaDescription || "-"}</td>
        <td className="px-6 py-4 text-right space-x-2">
          <button
            onClick={() => openEditModal(cat)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleDeleteCategory(cat._id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        )}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add Category</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Category Name"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={newStaticUrl}
              onChange={(e) => setNewStaticUrl(e.target.value)}
              placeholder="Static URL"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="SEO Title"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={newMetaKeywords}
              onChange={(e) => setNewMetaKeywords(e.target.value)}
              placeholder="Meta Keywords"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <textarea
              value={newMetaDescription}
              onChange={(e) => setNewMetaDescription(e.target.value)}
              placeholder="Meta Description"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Category</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Category Name"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={editStaticUrl}
              onChange={(e) => setEditStaticUrl(e.target.value)}
              placeholder="Static URL"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="SEO Title"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              value={editMetaKeywords}
              onChange={(e) => setEditMetaKeywords(e.target.value)}
              placeholder="Meta Keywords"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <textarea
              value={editMetaDescription}
              onChange={(e) => setEditMetaDescription(e.target.value)}
              placeholder="Meta Description"
              className="w-full mb-2 px-3 py-2 border rounded-md"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusCategory;
