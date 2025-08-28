import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitEnquiry = createAsyncThunk(
  "enquiry/submitEnquiry",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/enquiry/add",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    isLoading: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(submitEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = "Your message has been sent successfully!";
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.payload || "Failed to send message. Please try again later.";
      });
  },
});

export const { clearMessages } = enquirySlice.actions;
export default enquirySlice.reducer;
