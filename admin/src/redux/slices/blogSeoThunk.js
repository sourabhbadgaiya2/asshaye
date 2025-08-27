// src/redux/thunks/blogSeoThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const API_BASE = "https://backend.aashayeinjudiciary.com/api/blog-seo";
// const API_BASE = "https://backend.aashayeinjudiciary.com/api/blog-seo";


// ✅ Create Blog SEO
export const createBlogSEO = createAsyncThunk(
  "blogSeo/create",
  async (seoData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE}/create`, seoData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// ✅ Get All Blog SEOs
// export const getAllBlogSEOs = createAsyncThunk(
//   "blogSeo/getAll",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get(`${API_BASE}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

export const getAllBlogSEOs = createAsyncThunk(
  "blogSeo/getAll",
  async (modelName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/by-model?model=${modelName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Get Blog SEO by ID
export const getBlogSEOById = createAsyncThunk(
  "blogSeo/getById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// ✅ Update Blog SEO
export const updateBlogSEO = createAsyncThunk(
  "blogSeo/update",
  async ({ id, seoData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, seoData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// ✅ Delete Blog SEO
// export const deleteBlogSEO = createAsyncThunk(
//   "blogSeo/delete",
//   async (id, thunkAPI) => {
//     try {
//       const res = await axios.delete(`${API_BASE}/${id}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   }
// );

export const deleteBlogSEO = createAsyncThunk(
  "blogSeo/delete",
  async ({ seoId, modelName }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE}/${seoId}?modelName=${modelName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
