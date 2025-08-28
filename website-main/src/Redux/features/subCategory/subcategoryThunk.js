// redux/subcategoryThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/subcategory"; // अपने API endpoint के हिसाब से बदलें

// 1. Get All Subcategories
export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch subcategories"
      );
    }
  }
);

// 2. Get Subcategory by ID
export const fetchSubcategoryById = createAsyncThunk(
  "subcategories/fetchSubcategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch subcategory"
      );
    }
  }
);

// 3. Create a Subcategory
export const createSubcategory = createAsyncThunk(
  "subcategories/createSubcategory",
  async (subcategoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/`, subcategoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create subcategory"
      );
    }
  }
);

// 4. Update a Subcategory
export const updateSubcategory = createAsyncThunk(
  "subcategories/updateSubcategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Backend returns updated subcategories list
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update subcategory"
      );
    }
  }
);

// 5. Delete a Subcategory
export const deleteSubcategory = createAsyncThunk(
  "subcategories/deleteSubcategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data; // Backend returns updated subcategories list
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete subcategory"
      );
    }
  }
);

// 6. specific sub category
export const fetchSubcategoriesByCategory = createAsyncThunk(
  "subcategories/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcategories"
      );
    }
  }
);
