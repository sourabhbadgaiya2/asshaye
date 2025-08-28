import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add member
export const addMember = createAsyncThunk(
  "member/addMember",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/member/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch all members
export const fetchMembers = createAsyncThunk(
  "member/fetchMembers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/member/display");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete member
export const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/member/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update member
export const updateMember = createAsyncThunk(
  "member/updateMember",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/member/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    loading: false,
    error: null,
    success: false,
    currentMember: null,
    isEditing: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentMember: (state, action) => {
      state.currentMember = action.payload;
      state.isEditing = true;
    },
    cancelEdit: (state) => {
      state.currentMember = null;
      state.isEditing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Member
      .addCase(addMember.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.members.push(action.payload.data);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Members
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch members";
      })

      // Delete Member
      .addCase(deleteMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.filter(
          (member) => member._id !== action.payload
        );
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete member";
      })

      // Update Member
      .addCase(updateMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isEditing = false;
        state.currentMember = null;
        state.members = state.members.map((member) =>
          member._id === action.payload.data._id ? action.payload.data : member
        );
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update member";
      });
  },
});

export const { resetState, setCurrentMember, cancelEdit } = memberSlice.actions;

export default memberSlice.reducer;
