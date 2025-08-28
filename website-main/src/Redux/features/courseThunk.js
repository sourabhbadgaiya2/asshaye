// redux/features/course/courseThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

// 1. All Courses (full list)
export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/alldisplay`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch courses");
    }
  }
);

// 2. Single Course (detail page use)
export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/courses/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch course");
    }
  }
);

// 3. Create Course
export const addCourse = createAsyncThunk(
  "courses/add",
  async (courseData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/course`, courseData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add course");
    }
  }
);

// 4. Delete Course
export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/coursedelte/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete course");
    }
  }
);

// 5. Unified Filter (category / subCategory / subSubCategory)
// - केवल category भेजो → उस category के सारे
// - category + subCategory → दोनों पर filter
// - category + subCategory + subSubCategory (future)
export const fetchFilteredCourses = createAsyncThunk(
  "courses/fetchFiltered",
  async ({ category, subCategory, subSubCategory }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (subCategory) params.append("subCategory", subCategory);
      if (subSubCategory) params.append("subSubCategory", subSubCategory);

      const res = await axios.get(`${API_URL}/filter?${params.toString()}`);
      return {
        // list: res.data,
        list: Array.isArray(res.data) ? res.data : [],
        filters: { category, subCategory, subSubCategory },
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to filter courses");
    }
  }
);
