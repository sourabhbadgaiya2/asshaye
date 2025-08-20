import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import {
  fetchChooseItems,
  deleteChooseItem,
  updateChooseItem,
  setEditingItem,
  cancelEdit,
} from '../Choose/ChooseSlice';

const ChooseDisplay = () => {
  const dispatch = useDispatch();
  const {
    items,
    loading,
    error,
    editingItem,
    isEditing,
  } = useSelector(state => state.choose);

  const [formData, setFormData] = useState({
    Title: '',
    description: '',
    keywordone: '',
    keywordtwo: '',
    keywordthree: '',
    keywordfour: '',
    keywordfive: '',
    altText: "",
    keywordsix: '',
    images: [],
    size: { width: '', height: '' },
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    metaCanonical: '',
  });

  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(fetchChooseItems());
  }, [dispatch]);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        Title: editingItem.Title || '',
        description: editingItem.description || '',
        keywordone: editingItem.keywordone || '',
        keywordtwo: editingItem.keywordtwo || '',
        keywordthree: editingItem.keywordthree || '',
        keywordfour: editingItem.keywordfour || '',
        keywordfive: editingItem.keywordfive || '',
        keywordsix: editingItem.keywordsix || '',
        altText: editingItem.altText || "",
        images: editingItem.images || [],
        size: editingItem.size || { width: '', height: '' },
        metaTitle: editingItem.metaTitle || '',
        metaDescription: editingItem.metaDescription || '',
        metaKeywords: editingItem.metaKeywords || '',
        metaCanonical: editingItem.metaCanonical || '',
      });
      setPreviewImages(editingItem.images || []);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      size: { ...prev.size, [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    const imagePreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...formData.images, ...imagePreviews]);
  };

  const removeImage = (index, isNew) => {
    if (isNew) {
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index, 1);
      setNewImages(updatedNewImages);

      const updatedPreviews = [...previewImages];
      const previewIndex = formData.images.length + index;
      updatedPreviews.splice(previewIndex, 1);
      setPreviewImages(updatedPreviews);
    } else {
      const updatedImages = [...formData.images];
      updatedImages.splice(index, 1);
      setFormData(prev => ({ ...prev, images: updatedImages }));

      const updatedPreviews = [...previewImages];
      updatedPreviews.splice(index, 1);
      setPreviewImages(updatedPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('Title', formData.Title);
    data.append('description', formData.description);
    data.append('keywordone', formData.keywordone);
    data.append('keywordtwo', formData.keywordtwo);
    data.append('keywordthree', formData.keywordthree);
    data.append('keywordfour', formData.keywordfour);
    data.append('keywordfive', formData.keywordfive);
    data.append('keywordsix', formData.keywordsix);
    data.append('altText', formData.altText);
    data.append('size', JSON.stringify(formData.size));
    data.append('metaTitle', formData.metaTitle);
    data.append('metaDescription', formData.metaDescription);
    data.append('metaKeywords', formData.metaKeywords);
    data.append('metaCanonical', formData.metaCanonical);

    newImages.forEach(image => {
      data.append('images', image);
    });

    try {
      if (isEditing) {
        await dispatch(updateChooseItem({ id: editingItem._id, formData: data })).unwrap();
        toast.success('Item updated successfully');
      }
      resetForm();
    } catch (error) {
      toast.error(error || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      Title: '',
      description: '',
      keywordone: '',
      keywordtwo: '',
      keywordthree: '',
      keywordfour: '',
      keywordfive: '',
      keywordsix: '',
      altText: "",
      images: [],
      size: { width: '', height: '' },
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      metaCanonical: '',
    });
    setNewImages([]);
    setPreviewImages([]);
    dispatch(cancelEdit());
  };

  const handleEdit = (item) => {
    dispatch(setEditingItem(item));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await dispatch(deleteChooseItem(id)).unwrap();
        toast.success('Item deleted successfully');
      } catch (err) {
        toast.error('Error deleting item');
      }
    }
  };

  const columns = [
    {
      name: 'S.No',
      cell: (row, rowIndex) => rowIndex + 1,
      width: '80px',
    },
    {
      name: 'Title',
      selector: row => row.Title,
      sortable: true,
    },
      {
      name: 'altText',
      selector: row => row.altText,
      sortable: true,
    },

    
    {
      name: 'Description',
      selector: row => row.description,
      wrap: true,
    },
    {
      name: 'Keywords',
      cell: row => (
        <div>
          {row.keywordone && <div>- {row.keywordone}</div>}
          {row.keywordtwo && <div>- {row.keywordtwo}</div>}
          {row.keywordthree && <div>- {row.keywordthree}</div>}
          {row.keywordfour && <div>- {row.keywordfour}</div>}
          {row.keywordfive && <div>- {row.keywordfive}</div>}
          {row.keywordsix && <div>- {row.keywordsix}</div>}
          {row.altText && <div>- {row.altText}</div>}



          
          
        </div>
      ),
    },
    {
      name: 'Images',
      cell: row => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {row.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${row.Title}-${i}`}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                margin: '3px',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="space-x-2">
          <button
            onClick={() => handleEdit(row)}
            style={{
              padding: '6px 10px',
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '5px'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            style={{
              padding: '6px 10px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Choose Items</h2>

      {isEditing && (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              'Title',
              'description',
              'keywordone',
              'keywordtwo',
              'keywordthree',
              'keywordfour',
              'keywordfive',
              'keywordsix',
              'altText',
              'metaTitle',
              'metaDescription',
              'metaKeywords',
              'metaCanonical',
            ].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border p-2 rounded"
              />
            ))}
            <input
              type="text"
              name="width"
              value={formData.size.width}
              onChange={handleSizeChange}
              placeholder="Width"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="height"
              value={formData.size.height}
              onChange={handleSizeChange}
              placeholder="Height"
              className="border p-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="col-span-2"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, index >= formData.images.length)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}

      <DataTable
        columns={columns}
        data={items}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default ChooseDisplay;