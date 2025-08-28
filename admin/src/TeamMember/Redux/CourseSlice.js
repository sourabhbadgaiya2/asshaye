import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/course",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetCourseState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCourseState } = courseSlice.actions;
export default courseSlice.reducer;
