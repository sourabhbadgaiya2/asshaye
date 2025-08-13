import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, X } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addMember, resetState } from "../../src/TeamMember/Teammember";

const TeamMember = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.members);

  const [input, setInput] = useState({
    Membername: "",
    Teamposition: "",
    email: "",
    phone: "",
    address: "",
    desciption: "",
    altText: "",
    staticUrl: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    metaCanonical: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Team member added successfully!");
      setInput({
        Membername: "",
        Teamposition: "",
        email: "",
        phone: "",
        address: "",
        desciption: "",
        altText: "",
        staticUrl: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        metaCanonical: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
      dispatch(resetState());
    }
  }, [error, success, dispatch]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxAllowed = 5 - imageFiles.length;

    if (files.length > maxAllowed) {
      setLocalError("You can upload a maximum of 5 images");
      return;
    }

    const newPreviews = [];
    let loadedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newPreviews.push(event.target.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImageFiles((prev) => [...prev, ...files]);
    setLocalError("");
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.Membername || !input.Teamposition) {
      toast.error("Please fill all required fields");
      return;
    }

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("Membername", input.Membername);
    formData.append("Teamposition", input.Teamposition);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("address", input.address);
    formData.append("desciption", input.desciption);
    formData.append("altText", input.altText);
    formData.append("staticUrl", input.staticUrl);
    formData.append("metaTitle", input.metaTitle);
    formData.append("metaDescription", input.metaDescription);
    formData.append("metaKeywords", input.metaKeywords);
    formData.append("metaCanonical", input.metaCanonical);

    imageFiles.forEach((file) => formData.append("images", file));

    dispatch(addMember(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-5xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md'
    >
      <ToastContainer position='top-center' />
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Team Member Submission
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {[
          "Membername",
          "Teamposition",
          "email",
          "phone",
          "address",
          "altText",
          "staticUrl",
        ].map((key) => (
          <div key={key}>
            <label className='block mb-1 font-medium capitalize'>{key}</label>
            <input
              type='text'
              name={key}
              value={input[key]}
              onChange={handleInput}
              className='w-full p-2 border border-gray-300 rounded'
              required={key === "Membername" || key === "Teamposition"}
            />
          </div>
        ))}
      </div>

      <div className='mt-6'>
        <h3 className='text-lg font-semibold mb-4 text-gray-700 border-b pb-2'>
          SEO
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[
            "metaTitle",
            "metaDescription",
            "metaKeywords",
            "metaCanonical",
          ].map((key) => (
            <div key={key}>
              <label className='block mb-1 font-medium capitalize'>
                {key.replace("meta", "Meta ")}
              </label>
              <input
                type='text'
                name={key}
                value={input[key]}
                onChange={handleInput}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <label className='block mb-1 font-medium'>Description</label>
        <div className='bg-white border border-gray-300 rounded'>
          <CKEditor
            editor={ClassicEditor}
            data={input.desciption}
            onChange={(event, editor) => {
              const data = editor.getData();
              setInput((prev) => ({ ...prev, desciption: data }));
            }}
          />
        </div>
      </div>

      <div className='my-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Images (Max 5) <span>( Width: 1082 px Height: 1445 px )</span>
        </label>

        {imagePreviews.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4'>
            {imagePreviews.map((preview, index) => (
              <div key={index} className='relative group'>
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className='h-24 w-24 object-cover rounded-md border border-gray-300'
                />
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className='relative'>
          <label
            className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-500 focus:outline-none ${
              imageFiles.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className='flex flex-col items-center space-y-2'>
              <Upload className='w-6 h-6 text-gray-500' />
              <span className='font-medium text-gray-600'>
                Drop files or{" "}
                <span className='text-primary-600 underline ml-1'>browse</span>
              </span>
              <span className='text-xs text-gray-500'>
                {imageFiles.length >= 5
                  ? "Maximum 5 images reached"
                  : `Upload up to 5 images (${imageFiles.length}/5)`}
              </span>
            </div>
            <input
              type='file'
              name='images'
              accept='image/*'
              multiple
              onChange={handleImageChange}
              className='absolute inset-0 opacity-0 cursor-pointer'
              disabled={imageFiles.length >= 5}
            />
          </label>
        </div>
      </div>

      {localError && <p className='text-red-500 text-sm mb-4'>{localError}</p>}

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default TeamMember;
