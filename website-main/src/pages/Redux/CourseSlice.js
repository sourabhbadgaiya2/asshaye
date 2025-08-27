import { createSlice } from "@reduxjs/toolkit";
import {
  CourseName,          // fetch all
  createCourseName,
  updateCourseName,
  deleteCourseName,
  CourseNameById,      // 
} from "./CourseThunk"; // Make sure the file name matches

const initialState = {
  courseNames: [],           
  selectedCourse: null,       
  loading: false,
  error: null,
  success: false,
};

const courseSlice = createSlice({
  name: "leadSourceReducer",
  initialState,
  reducers: {
    resetCourseNameStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(CourseName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CourseName.fulfilled, (state, action) => {
        state.loading = false;
        state.courseNames = action.payload;
      })
      .addCase(CourseName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch course by ID
      .addCase(CourseNameById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedCourse = null;
      })
      .addCase(CourseNameById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(CourseNameById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create course
      .addCase(createCourseName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseName.fulfilled, (state, action) => {
        state.loading = false;
        state.courseNames.unshift(action.payload);
        state.success = true;
      })
      .addCase(createCourseName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update course
      .addCase(updateCourseName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseName.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courseNames.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.courseNames[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateCourseName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete course
      .addCase(deleteCourseName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseName.fulfilled, (state, action) => {
        state.loading = false;
        state.courseNames = state.courseNames.filter(
          (item) => item._id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteCourseName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCourseNameStatus } = courseSlice.actions;
export default courseSlice.reducer;
