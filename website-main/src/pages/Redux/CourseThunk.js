import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../Redux/config/axios";

const API_URL = "http://localhost:8000/banner";

// Get all course names
export const CourseName = createAsyncThunk(
  "CourseName/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/alldisplay`); // ✅ FIXED URL
      console.log(response.data, "data from thunk");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get course name by ID
export const CourseNameById = createAsyncThunk(
  "CourseName/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create a new course name
export const createCourseName = createAsyncThunk(
  "CourseName/create",
  async (CourseNameData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, CourseNameData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update course name
export const updateCourseName = createAsyncThunk(
  "CourseName/update",
  async ({ id, CourseNameData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, CourseNameData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete course name
export const deleteCourseName = createAsyncThunk(
  "CourseName/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
