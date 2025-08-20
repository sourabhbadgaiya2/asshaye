import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogSEO,
  deleteBlogSEO,
  getAllBlogSEOs,
  updateBlogSEO,
} from "../../redux/slices/blogSeoThunk";
import { clearBlogSeoMessages } from "../../redux/slices/blogSeoSlice";
import axios from "axios";
import { Logs } from "lucide-react";

const API_BASE_URL = "https://backend.aashayeinjudiciary.com";

const models = ["Blog", "Course"];

const SEOManager = () => {
  const dispatch = useDispatch();
  const { seoList, loading, error, successMessage } = useSelector(
    (state) => state.blogSeo
  );

  // form modal states
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    modelName: "Blog",
    itemId: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [items, setItems] = useState([]);
  const [filterModel, setFilterModel] = useState("Blog");
  const [fetchError, setFetchError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const isMounted = useRef(true);

  useEffect(() => () => (isMounted.current = false), []);

  const normalizeTitle = (item) =>
    item.Title ||
    item.eventName ||
    item.memberName ||
    item.Membername ||
    item.title ||
    item.name ||
    item.Coursename ||
    "Untitled";

  const fetchModelData = useCallback(async (model) => {
    setFetchError("");
    let source;
    try {
      source = axios.CancelToken.source();
      let url = "";
      switch (model) {
        case "Blog":
          url = `${API_BASE_URL}/blog/display`;
          break;
        case "Course":
          url = `${API_BASE_URL}/api/alldisplay`;
          break;
        case "Event":
          url = `${API_BASE_URL}/event`;
          break;
        case "WhatsNew":
          url = `${API_BASE_URL}/whatsnew/alldisplay`;
          break;
        case "TeamMember":
          url = `${API_BASE_URL}/member/display`;
          break;
        case "Judgment":
          url = `${API_BASE_URL}/judement/display`;
          break;
        case "Othercourse":
          url = `${API_BASE_URL}/othercourse`;
          break;
        default:
          setItems([]);
          return;
      }

      const response = await axios.get(url, { cancelToken: source.token });
      const raw = response?.data;
      const arr = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.items)
        ? raw.items
        : [];
      const cleaned = arr.filter(Boolean).map((item) => ({
        _id: item._id,
        seoRef: item.seo || null,
        title: normalizeTitle(item),
      }));

      if (isMounted.current) setItems(cleaned);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error(`Error fetching ${model} data:`, err);
        if (isMounted.current) {
          setItems([]);
          setFetchError(
            `Failed to load ${model} items. ${
              err?.response?.data?.message || err?.message || ""
            }`
          );
        }
      }
    }
    return () => source?.cancel();
  }, []);

  useEffect(() => {
    dispatch(getAllBlogSEOs(filterModel));
    fetchModelData(filterModel);
  }, [dispatch, fetchModelData, filterModel]);

  useEffect(() => {
    if (!successMessage && !error) return;
    const t = setTimeout(() => dispatch(clearBlogSeoMessages()), 2500);
    return () => clearTimeout(t);
  }, [successMessage, error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      keywords: "",
      modelName: filterModel,
      itemId: "",
    });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setMode("add");
    setShowModal(true);
  };

  const openEditModal = (seo) => {
    setFormData({
      title: seo.title || "",
      description: seo.description || "",
      keywords: Array.isArray(seo.keywords)
        ? seo.keywords.join(", ")
        : seo.keywords || "",
      modelName: seo.modelName || "Blog",
      itemId: seo.itemId || "",
    });
    setEditingId(seo._id);
    fetchModelData(seo.modelName || "Blog");
    dispatch(getAllBlogSEOs(filterModel));

    setMode("edit");
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      keywords: formData.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
        .join(", "),
      modelName: formData.modelName,
      itemId: formData.itemId,
    };

    if (!payload.title || !payload.description || !payload.keywords) return;

    const action =
      mode === "edit"
        ? updateBlogSEO({ id: editingId, seoData: payload })
        : createBlogSEO(payload);

    dispatch(action).then(() => {
      dispatch(getAllBlogSEOs(filterModel));
      setShowModal(false);
      resetForm();
    });
  };

  const handleDelete = (id, modelName) => {
    const model = (modelName || "").toLowerCase();

    dispatch(deleteBlogSEO({ seoId: id, modelName: model })).then(() => {
      dispatch(getAllBlogSEOs(filterModel));

      fetchModelData(filterModel);
    });

    if (editingId === id) resetForm();
  };

  const filteredList = useMemo(() => {
    if (!seoList) return [];
    const key = filterModel.toLowerCase();
    const arr = Array.isArray(seoList[key]) ? seoList[key] : [];
    return arr;
  }, [seoList, filterModel]);

  const getItemTitleForSEO = (seo) => {
    if (!seo) return "";
    const bySeoRef = items.find((it) => it.seoRef === seo._id);
    return bySeoRef ? normalizeTitle(bySeoRef) : "";
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>SEO Manager</h2>
        <button
          onClick={openAddModal}
          className='bg-green-600 text-white px-4 py-2 rounded'
        >
          Add SEO
        </button>
      </div>

      {(loading || fetchError || error || successMessage) && (
        <div className='space-y-2 mb-3'>
          {loading && (
            <div className='flex items-center justify-center h-screen'>
              <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500'></div>
            </div>
          )}
          {fetchError && <p className='text-red-500'>{fetchError}</p>}
          {error && <p className='text-red-500'>{error}</p>}
          {successMessage && <p className='text-green-500'>{successMessage}</p>}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50'>
          <div className='bg-white rounded p-6 w-full max-w-md space-y-4'>
            <h3 className='text-lg font-semibold'>
              {mode === "add" ? "Add New SEO" : "Edit SEO"}
            </h3>

            <form onSubmit={handleSubmit} className='space-y-3'>
              <input
                type='text'
                name='title'
                placeholder='Title'
                value={formData.title}
                onChange={handleChange}
                className='border p-2 w-full'
                required
              />
              <textarea
                name='description'
                placeholder='Description'
                value={formData.description}
                onChange={handleChange}
                className='border p-2 w-full'
                required
                rows={3}
              />
              <input
                type='text'
                name='keywords'
                placeholder='Keywords (comma-separated)'
                value={formData.keywords}
                onChange={handleChange}
                className='border p-2 w-full'
                required
              />

              {mode === "add" && (
                <select
                  name='modelName'
                  value={formData.modelName}
                  onChange={(e) => {
                    const m = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      modelName: m,
                      itemId: "",
                    }));
                    fetchModelData(m);
                  }}
                  className='border p-2 w-full'
                  required
                >
                  {models.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              )}

              {mode === "add" && items.length > 0 && (
                <select
                  name='itemId'
                  value={formData.itemId}
                  onChange={handleChange}
                  className='border p-2 w-full'
                  required
                >
                  <option value='' disabled>
                    {items.filter((it) => !it.seoRef).length} items available
                  </option>
                  <option value=''>-- Select {formData.modelName} --</option>
                  {items
                    .filter((it) => !it.seoRef)
                    .map((it) => (
                      <option key={it._id} value={it._id}>
                        {it.title}
                      </option>
                    ))}
                </select>
              )}

              <div className='flex gap-2 justify-end'>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  className='bg-gray-300 px-4 py-2 rounded'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded'
                >
                  {mode === "add" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter buttons */}
      <div className='mb-4 flex gap-2 flex-wrap'>
        {models.map((m) => (
          <button
            key={m}
            type='button'
            className={`px-4 py-2 rounded ${
              filterModel === m
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setFilterModel(m);
              setFormData((prev) => ({ ...prev, modelName: m }));
              fetchModelData(m);
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className='w-full border'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='p-2 border'>Name</th>
            <th className='p-2 border'>Title</th>
            <th className='p-2 border'>Description</th>
            <th className='p-2 border'>Keywords</th>
            <th className='p-2 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length === 0 ? (
            <tr>
              <td colSpan={5} className='text-center p-2'>
                No SEO entries for {filterModel}
              </td>
            </tr>
          ) : (
            filteredList.map((seo) => (
              <tr key={seo._id}>
                <td className='p-2 border'>{seo.itemName}</td>
                <td className='p-2 border'>{seo.title}</td>
                <td className='p-2 border'>{seo.description}</td>
                <td className='p-2 border'>
                  {Array.isArray(seo.keywords)
                    ? seo.keywords.join(", ")
                    : seo.keywords}
                </td>

                <td className='p-2 border relative'>
                  <div className='relative inline-block text-left'>
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === seo._id ? null : seo._id)
                      }
                      className='px-2 py-1 rounded hover:bg-gray-200'
                    >
                      <Logs />
                    </button>

                    {/* Dropdown */}
                    {openMenuId === seo._id && (
                      <div className='absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10'>
                        <button
                          onClick={() => {
                            openEditModal(seo);
                            setOpenMenuId(null);
                          }}
                          className='block w-full text-left px-4 py-2 hover:bg-gray-300'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(seo._id, seo.modelName);
                            setOpenMenuId(null);
                          }}
                          className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-300'
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SEOManager;
