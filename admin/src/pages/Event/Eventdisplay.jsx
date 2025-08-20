import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { FaTrash, FaEdit, FaUpload, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiX,
  FiSave,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";

const Eventdisplay = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const editFormRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (isEditFormOpen && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isEditFormOpen]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://backend.aashayeinjudiciary.com/event"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `https://backend.aashayeinjudiciary.com/event/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents((prev) => prev.filter((event) => event._id !== id));
      toast.success("Event deleted successfully");
    } catch (err) {
      toast.error("Error deleting event: " + err.message);
    }
  };

  const handleViewClick = (event) => {
    setViewingEvent(event);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent({
      ...event,
      metaTitle: event.metaTitle || "",
      metaDescription: event.metaDescription || "",
      metaKeywords: event.metaKeywords || "",
      metaCanonical: event.metaCanonical || "",
    });
    setImagePreview(
      Array.isArray(event.images) ? event.images[0] : event.images
    );
    setIsEditFormOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all fields to formData
      formData.append("Title", editingEvent.Title);
      formData.append("altText", editingEvent.altText);
      formData.append("subTitle", editingEvent.subTitle);
      formData.append("Time", editingEvent.Time);
      formData.append("StartDate", editingEvent.StartDate);
      formData.append("Location", editingEvent.Location);
      formData.append("Cost", editingEvent.Cost);
      formData.append("Slot", editingEvent.Slot);
      formData.append("Description", editingEvent.Description);
      formData.append("staticUrl", editingEvent.staticUrl);
      formData.append("metaTitle", editingEvent.metaTitle);
      formData.append("metaDescription", editingEvent.metaDescription);
      formData.append("metaKeywords", editingEvent.metaKeywords);
      formData.append("metaCanonical", editingEvent.metaCanonical);

      // Append image file if it exists
      if (imageFile) {
        formData.append("images", imageFile);
      }

      const response = await fetch(
        `http://backend.aashayeinjudiciary.com/event/editsave/${editingEvent._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      toast.success("Event updated successfully");
      setIsEditFormOpen(false);
      fetchEvents(); // Refresh the events list after successful update
    } catch (err) {
      toast.error("Error updating event: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setEditingEvent((prev) => ({
      ...prev,
      Description: data,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={Array.isArray(row.images) ? row.images[0] : row.images}
          alt={row.Title}
          className='h-16 w-16 object-cover rounded-lg'
        />
      ),
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.Title,
      sortable: true,
      width: "180px",
      wrap: true,
      style: {
        fontWeight: "600",
        color: "#1f2937",
      },
    },
    {
      name: "altText",
      selector: (row) => row.altText,
      width: "180px",
      wrap: true,
    },
    {
      name: "Sub Title",
      selector: (row) => row.subTitle,
      width: "180px",
      wrap: true,
    },
    {
      name: "Date & Time",
      cell: (row) => (
        <div className='whitespace-nowrap'>
          <div className='font-medium'>{formatDate(row.StartDate)}</div>
          <div className='text-sm text-gray-500'>{row.Time}</div>
        </div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Location",
      selector: (row) => row.Location,
      width: "150px",
      wrap: true,
    },
    {
      name: "Cost",
      selector: (row) => `₹${row.Cost}`,
      sortable: true,
      width: "100px",
      style: {
        fontWeight: "600",
        color: "#10b981",
      },
    },
    {
      name: "Slots",
      selector: (row) => row.Slot,
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className='flex space-x-3'>
          <button
            onClick={() => handleViewClick(row)}
            className='text-green-500 hover:text-green-700 p-1 rounded-full hover:bg-green-50'
            title='View Details'
          >
            <FaEye size={16} />
          </button>
          <button
            onClick={() => handleEditClick(row)}
            className='text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50'
            title='Edit'
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className='text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50'
            title='Delete'
          >
            <FaTrash size={16} />
          </button>
        </div>
      ),
      width: "140px",
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.Title &&
      event.Title.toLowerCase().includes(filterText.toLowerCase())
  );

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-gray-700'>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gray-50'>
        <p className='text-red-500'>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Event Manager</h1>
          <div className='w-64'>
            <input
              type='text'
              placeholder='Search events...'
              className='w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <DataTable
            columns={columns}
            data={filteredEvents}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            striped
            responsive
            noDataComponent={
              <div className='py-8 text-center text-gray-500'>
                No events found.
              </div>
            }
            fixedHeader
            fixedHeaderScrollHeight='600px'
          />
        </div>

        {/* View Event Modal */}
        {isViewModalOpen && viewingEvent && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
              <div className='p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-bold text-gray-800'>
                    {viewingEvent.Title}
                  </h2>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      toast.info("Event details closed");
                    }}
                    className='text-gray-500 hover:text-gray-700'
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='md:col-span-2'>
                    {viewingEvent.images && (
                      <div className='bg-gray-100 rounded-lg overflow-hidden'>
                        <img
                          src={
                            Array.isArray(viewingEvent.images)
                              ? viewingEvent.images[0]
                              : viewingEvent.images
                          }
                          alt={viewingEvent.altText || viewingEvent.Title}
                          className='w-full h-64 object-cover'
                        />
                      </div>
                    )}
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiCalendar className='mr-2' /> Event Date & Time
                      </h3>
                      <div className='flex items-center space-x-4'>
                        <div className='bg-blue-50 rounded-lg p-3'>
                          <div className='text-sm text-blue-600'>Date</div>
                          <div className='font-medium'>
                            {formatDate(viewingEvent.StartDate)}
                          </div>
                        </div>
                        <div className='bg-blue-50 rounded-lg p-3'>
                          <div className='text-sm text-blue-600'>Time</div>
                          <div className='font-medium'>
                            {viewingEvent.Time || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiMapPin className='mr-2' /> Location
                      </h3>
                      <p className='text-gray-600'>
                        {viewingEvent.Location || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiDollarSign className='mr-2' /> Cost
                      </h3>
                      <p className='text-gray-600'>
                        ₹{viewingEvent.Cost || "Free"}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        <FiUsers className='mr-2' /> Available Slots
                      </h3>
                      <p className='text-gray-600'>
                        {viewingEvent.Slot || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        Sub Title
                      </h3>
                      <p className='text-gray-600'>
                        {viewingEvent.subTitle || "Not specified"}
                      </p>
                    </div>

                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        Alt Text
                      </h3>
                      <p className='text-gray-600'>
                        {viewingEvent.altText || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                        Static Url
                      </h3>
                      <p className='text-gray-600'>
                        {viewingEvent.staticUrl || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='w-full'>
                  <h3 className='flex items-center text-lg font-semibold text-gray-700 mb-2'>
                    Descriptions
                  </h3>
                  <div
                    className='prose max-w-none bg-gray-50 p-4 rounded-lg'
                    dangerouslySetInnerHTML={createMarkup(
                      viewingEvent.Description || "No description available"
                    )}
                  />
                </div>

                <div className='mt-6 flex justify-end'>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      toast.info("Event details closed");
                    }}
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Event Form */}
        {isEditFormOpen && (
          <div
            ref={editFormRef}
            className='mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-full'
          >
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-semibold text-gray-800'>
                Edit Event
              </h2>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Event Image
                  </label>
                  <div className='flex items-center space-x-6'>
                    <div className='flex-shrink-0'>
                      <img
                        src={imagePreview}
                        alt='Event preview'
                        className='h-32 w-32 rounded-lg object-cover border border-gray-200'
                      />
                    </div>
                    <div>
                      <label className='cursor-pointer'>
                        <div className='px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center'>
                          <FaUpload className='mr-2' />
                          Upload New Image
                        </div>
                        <input
                          type='file'
                          className='hidden'
                          onChange={handleImageChange}
                          accept='image/*'
                        />
                      </label>
                      <p className='mt-1 text-xs text-gray-500'>
                        JPG, PNG or GIF (Max: 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Title*
                  </label>
                  <input
                    type='text'
                    name='Title'
                    value={editingEvent?.Title || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Static Url*
                  </label>
                  <input
                    type='text'
                    name='staticUrl'
                    value={editingEvent?.staticUrl || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    altText*
                  </label>
                  <input
                    type='text'
                    name='altText'
                    value={editingEvent?.altText || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Sub Title
                  </label>
                  <input
                    type='text'
                    name='subTitle'
                    value={editingEvent?.subTitle || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Time*
                  </label>
                  <input
                    type='text'
                    name='Time'
                    value={editingEvent?.Time || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Start Date*
                  </label>
                  <input
                    type='date'
                    name='StartDate'
                    value={
                      editingEvent?.StartDate
                        ? new Date(editingEvent.StartDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Location
                  </label>
                  <input
                    type='text'
                    name='Location'
                    value={editingEvent?.Location || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Cost ($)
                  </label>
                  <input
                    type='number'
                    name='Cost'
                    value={editingEvent?.Cost || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Available Slots
                  </label>
                  <input
                    type='number'
                    name='Slot'
                    value={editingEvent?.Slot || ""}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div className='md:col-span-2'>
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    SEO Settings
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Meta Title
                      </label>
                      <input
                        type='text'
                        name='metaTitle'
                        value={editingEvent?.metaTitle || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Meta Keywords
                      </label>
                      <input
                        type='text'
                        name='metaKeywords'
                        value={editingEvent?.metaKeywords || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Meta Description
                      </label>
                      <textarea
                        name='metaDescription'
                        value={editingEvent?.metaDescription || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        rows='3'
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Canonical URL
                      </label>
                      <input
                        type='text'
                        name='metaCanonical'
                        value={editingEvent?.metaCanonical || ""}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      />
                    </div>
                  </div>
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Description
                  </label>
                  <div className='border border-gray-300 rounded-lg overflow-hidden'>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editingEvent?.Description || ""}
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

                          "blockQuote",
                          "insertTable",
                          "undo",
                          "redo",
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-6'>
                <button
                  type='button'
                  onClick={() => setIsEditFormOpen(false)}
                  className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium'
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 font-medium'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventdisplay;
