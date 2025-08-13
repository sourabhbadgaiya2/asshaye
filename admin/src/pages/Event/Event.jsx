import React, { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Event = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Time: "",
    StartDate: "",
    Description: "",
    Location: "",
    Cost: "",
    Slot: "",
    altText: "",
    subTitle: "",
    staticUrl: "",
    images: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaCanonical: "",
  });
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({
      ...prev,
      Description: data,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create preview URLs
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newUrls = [...previewUrls];
    newUrls.splice(index, 1);
    setPreviewUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append all files
      files.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const response = await axios.post(
        "http://backend.aashayeinjudiciary.com/event/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage({ text: "Event created successfully!", type: "success" });
      // Reset form
      setFormData({
        Title: "",
        Time: "",
        StartDate: "",
        Description: "",
        Location: "",
        Cost: "",
        Slot: "",
        altText: "",
        subTitle: "",
        staticUrl: "",
        images: [],
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        metaCanonical: "",
      });
      setFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage({
        text: error.response?.data?.error || "Failed to create event",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>
        Create New Event
      </h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='Title'>
              Title*
            </label>
            <input
              type='text'
              id='Title'
              name='Title'
              value={formData.Title}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-2' htmlFor='metaCanonical'>
              Meta Canonical
            </label>
            <input
              type='text'
              id='metaCanonical'
              name='metaCanonical'
              value={formData.metaCanonical}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-2' htmlFor='subTitle'>
              Sub Title
            </label>
            <input
              type='text'
              id='subTitle'
              name='subTitle'
              value={formData.subTitle}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='metaTitle'>
              Meta Title
            </label>
            <input
              type='text'
              id='metaTitle'
              name='metaTitle'
              value={formData.metaTitle}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='metaDescription'>
              Meta Description
            </label>
            <input
              type='text'
              id='metaDescription'
              name='metaDescription'
              value={formData.metaDescription}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='metaKeywords'>
              Meta Keywords
            </label>
            <input
              type='text'
              id='metaKeywords'
              name='metaKeywords'
              value={formData.metaKeywords}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-2' htmlFor='altText'>
              Static Url
            </label>
            <input
              type='text'
              id='staticUrl'
              name='staticUrl'
              value={formData.staticUrl}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='altText'>
              Alt Text
            </label>
            <input
              type='text'
              id='altText'
              name='altText'
              value={formData.altText}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='Time'>
              Time
            </label>
            <input
              type='text'
              id='Time'
              name='Time'
              value={formData.Time}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-2' htmlFor='StartDate'>
              Start Date*
            </label>
            <input
              type='datetime-local'
              id='StartDate'
              name='StartDate'
              value={formData.StartDate}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='Description'>
            Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.Description}
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

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block text-gray-700 mb-2' htmlFor='Location'>
              Location
            </label>
            <input
              type='text'
              id='Location'
              name='Location'
              value={formData.Location}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-gray-700 mb-2' htmlFor='Cost'>
              Cost
            </label>
            <input
              type='number'
              id='Cost'
              name='Cost'
              value={formData.Cost}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 mb-2' htmlFor='Slot'>
            Available Slots
          </label>
          <input
            type='number'
            id='Slot'
            name='Slot'
            value={formData.Slot}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 mb-2'>
            Images <span>(Recommended: Width 1200px, Height 650px)</span>
          </label>
          <input
            type='file'
            multiple
            onChange={handleFileChange}
            className='w-full px-3 py-2 border rounded-md'
            accept='image/*'
          />

          {previewUrls.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {previewUrls.map((url, index) => (
                <div key={index} className='relative'>
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className='h-20 w-20 object-cover rounded-md'
                  />
                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default Event;
