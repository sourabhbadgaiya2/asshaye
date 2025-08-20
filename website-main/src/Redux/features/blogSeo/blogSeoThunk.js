// src/redux/thunks/blogSeoThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://backend.aashayeinjudiciary.com/api/blog-seo";

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


export const getAllBlogSEOs = createAsyncThunk(
  "blogSeo/getAll",
  async (modelName = "Blog", { rejectWithValue }) => {
    console.log(modelName, "thunks");
    try {
      const response = axios.get(
        "http://localhost:8000/api/seo?modelName=Blog"
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


export const deleteBlogSEO = createAsyncThunk(
  "blogSeo/delete",
  async ({ seoId, modelName }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/seo/${seoId}?modelName=${modelName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
