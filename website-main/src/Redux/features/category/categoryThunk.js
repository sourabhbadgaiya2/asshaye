// redux/categoryThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/category"; // Change if needed

// 1. Get All Categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

// 2. Get Category by ID
export const fetchCategoryById = createAsyncThunk(
  "categories/fetchCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch category"
      );
    }
  }
);

// 3. Create a Category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create category"
      );
    }
  }
);

// 4. Update a Category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data; // Backend returns updated category list
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update category"
      );
    }
  }
);

// 5. Delete a Category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data; // Backend returns updated category list
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete category"
      );
    }
  }
);
