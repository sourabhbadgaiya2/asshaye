// redux/subSubcategoryThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/subsubcategory"; // अपने API endpoint के हिसाब से बदलें

// 1. Get All Sub-Subcategories
export const fetchSubSubcategories = createAsyncThunk(
  "subSubcategories/fetchSubSubcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch sub-subcategories"
      );
    }
  }
);

// 2. Get Sub-Subcategory by ID
export const fetchSubSubcategoryById = createAsyncThunk(
  "subSubcategories/fetchSubSubcategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch sub-subcategory"
      );
    }
  }
);

// 3. Create Sub-Subcategory (with image upload)
export const createSubSubcategory = createAsyncThunk(
  "subSubcategories/createSubSubcategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create sub-subcategory"
      );
    }
  }
);

// 4. Update Sub-Subcategory (with image upload)
export const updateSubSubcategory = createAsyncThunk(
  "subSubcategories/updateSubSubcategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update sub-subcategory"
      );
    }
  }
);

// 5. Delete Sub-Subcategory
export const deleteSubSubcategory = createAsyncThunk(
  "subSubcategories/deleteSubSubcategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data; // Updated list from backend
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete sub-subcategory"
      );
    }
  }
);

export const fetchSubSubcategoriesByParent = createAsyncThunk(
  "subSubcategories/fetchSubSubcategoriesByParent",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/subsubcategory/by-sub/${subCategoryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch sub-subcategories by parent"
      );
    }
  }
);
