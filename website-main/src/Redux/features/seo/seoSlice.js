import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSeo = createAsyncThunk("seo/fetchSeo", async () => {
  const res = await axios.get("https://asshaye.onrender.com/api/seo");
  return res.data || [];
});

const seoSlice = createSlice({
  name: "seo",
  initialState: {
    seoData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeo.fulfilled, (state, action) => {
        state.loading = false;
        state.seoData = action.payload;
      })
      .addCase(fetchSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default seoSlice.reducer;
