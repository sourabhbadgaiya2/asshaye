import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Refund = () => {
  const api = "http://localhost:8000/refund";
  const [refunds, setRefunds] = useState([]);
  const [formData, setFormData] = useState({
    Desciption: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all refund policies
  const fetchRefunds = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(api);
      setRefunds(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch refund policies");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  // Handle CKEditor changes
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      Desciption: data,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (editingId) {
        // Update existing refund policy
        await axios.put(`${api}/${editingId}`, formData);
      } else {
        // Create new refund policy
        await axios.post(api, formData);
      }

      fetchRefunds();
      setFormData({ Desciption: "" });
      setEditingId(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit refund policy
  const handleEdit = (refund) => {
    setFormData({
      Desciption: refund.Desciption,
    });
    setEditingId(refund._id);
  };

  // Delete refund policy
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${api}/${id}`);
      fetchRefunds();
      setError("");
    } catch (err) {
      setError("Failed to delete refund policy");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Refund Policy Management</h1>

      {/* Error message */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className='mb-8 bg-white p-6 rounded shadow'
      >
        <div className='mb-4'>
          <label
            htmlFor='Desciption'
            className='block text-gray-700 font-bold mb-2'
          >
            Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.Desciption}
            onChange={handleEditorChange}
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
                "blockQuote",
                "insertTable",
                "undo",
                "redo",
              ],
            }}
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={`px-4 py-2 rounded text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading
            ? "Processing..."
            : editingId
            ? "Update Policy"
            : "Create Policy"}
        </button>

        {editingId && (
          <button
            type='button'
            onClick={() => {
              setFormData({ Desciption: "" });
              setEditingId(null);
            }}
            className='ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
          >
            Cancel
          </button>
        )}
      </form>

      {/* Refund Policies List */}
      <div>
        <h2 className='text-xl font-semibold mb-4'>Existing Refund Policies</h2>

        {isLoading && refunds.length === 0 ? (
          <p>Loading...</p>
        ) : refunds.length === 0 ? (
          <p>No refund policies found</p>
        ) : (
          <ul className='space-y-4'>
            {refunds.map((refund) => (
              <li key={refund._id} className='bg-white p-4 rounded shadow'>
                <div className='flex justify-between items-start'>
                  <div
                    className='whitespace-pre-wrap ck-content'
                    dangerouslySetInnerHTML={{ __html: refund.Desciption }}
                  />
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEdit(refund)}
                      className='px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(refund._id)}
                      className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Refund;
