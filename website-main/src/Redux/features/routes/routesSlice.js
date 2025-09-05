import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async () => {
  const res = await axios.get("https://asshaye.onrender.com/dynamics");
  return res.data || [];
});

const routesSlice = createSlice({
  name: "routes",
  initialState: {
    routesData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.routesData = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default routesSlice.reducer;
