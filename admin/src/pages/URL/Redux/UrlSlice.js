// // // Redux/UrlSlice.js
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // // Add new URL
// // export const addUrl = createAsyncThunk('urls/addUrl', async (urlData) => {
// //   const response = await axios.post('http://localhost:8000/url/create', urlData);
// //   return response.data;
// // });

// // // Fetch all URLs
// // export const fetchAllUrls = createAsyncThunk(
// //   'urls/fetchAll',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get('http://localhost:8000/url/display');
// //       return response.data.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // export const fetchUrlById = createAsyncThunk(
// //   'urls/fetchById',
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(`http://localhost:8000/url/${id}`);
// //       return response.data.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Delete URL
// // export const deleteUrl = createAsyncThunk(
// //   'urls/delete',
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       await axios.delete(`http://localhost:8000/url/${id}`);
// //       return id;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // const urlSlice = createSlice({
// //   name: 'urls',
// //   initialState: {
// //     items: [],
// //     selectedUrl: null,
// //     status: 'idle',
// //     loading: false,
// //     error: null
// //   },
// //   reducers: {
// //     // ✅ Add this reducer
// //     clearSelectedUrl: (state) => {
// //       state.selectedUrl = null;
// //     }
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Add URL
// //       .addCase(addUrl.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(addUrl.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.items.push(action.payload);
// //       })
// //       .addCase(addUrl.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       })

// //       // Fetch all URLs
// //       .addCase(fetchAllUrls.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchAllUrls.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.items = action.payload;
// //       })
// //       .addCase(fetchAllUrls.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // Fetch URL by ID
// //       .addCase(fetchUrlById.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchUrlById.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.selectedUrl = action.payload;
// //       })
// //       .addCase(fetchUrlById.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       // Delete URL
// //       .addCase(deleteUrl.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(deleteUrl.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.items = state.items.filter(url => url._id !== action.payload);
// //         if (state.selectedUrl && state.selectedUrl._id === action.payload) {
// //           state.selectedUrl = null;
// //         }
// //       })
// //       .addCase(deleteUrl.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   }
// // });

// // export const { clearSelectedUrl } = urlSlice.actions;

// // export default urlSlice.reducer;

// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // const API_BASE_URL = 'http://localhost:8000/url';

// // // Add new URL
// // export const addUrl = createAsyncThunk(
// //   'urls/addUrl',
// //   async (urlData, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.post(`${API_BASE_URL}/create`, urlData);
// //       return response.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Fetch all URLs
// // export const fetchAllUrls = createAsyncThunk(
// //   'urls/fetchAll',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/display`);
// //       return response.data.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Fetch URL by ID
// // export const fetchUrlById = createAsyncThunk(
// //   'urls/fetchById',
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/${id}`);
// //       return response.data.data;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // // Delete URL
// // export const deleteUrl = createAsyncThunk(
// //   'urls/delete',
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       await axios.delete(`${API_BASE_URL}/${id}`);
// //       return id;
// //     } catch (error) {
// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   }
// // );

// // const urlSlice = createSlice({
// //   name: 'urls',
// //   initialState: {
// //     items: [],
// //     selectedUrl: null,
// //     loading: false,
// //     error: null,
// //     status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
// //   },
// //   reducers: {
// //     clearSelectedUrl: (state) => {
// //       state.selectedUrl = null;
// //     },
// //     resetUrlState: (state) => {
// //       state.items = [];
// //       state.selectedUrl = null;
// //       state.loading = false;
// //       state.error = null;
// //       state.status = 'idle';
// //     }
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Add URL
// //       .addCase(addUrl.pending, (state) => {
// //         state.loading = true;
// //         state.status = 'loading';
// //       })
// //       .addCase(addUrl.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.status = 'succeeded';
// //         state.items.push(action.payload);
// //       })
// //       .addCase(addUrl.rejected, (state, action) => {
// //         state.loading = false;
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       })

// //       // Fetch all URLs
// //       .addCase(fetchAllUrls.pending, (state) => {
// //         state.loading = true;
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchAllUrls.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.status = 'succeeded';
// //         state.items = action.payload;
// //       })
// //       .addCase(fetchAllUrls.rejected, (state, action) => {
// //         state.loading = false;
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       })

// //       // Fetch URL by ID
// //       .addCase(fetchUrlById.pending, (state) => {
// //         state.loading = true;
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchUrlById.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.status = 'succeeded';
// //         state.selectedUrl = action.payload;
// //       })
// //       .addCase(fetchUrlById.rejected, (state, action) => {
// //         state.loading = false;
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       })

// //       // Delete URL
// //       .addCase(deleteUrl.pending, (state) => {
// //         state.loading = true;
// //         state.status = 'loading';
// //       })
// //       .addCase(deleteUrl.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.status = 'succeeded';
// //         state.items = state.items.filter(url => url._id !== action.payload);
// //         if (state.selectedUrl?._id === action.payload) {
// //           state.selectedUrl = null;
// //         }
// //       })
// //       .addCase(deleteUrl.rejected, (state, action) => {
// //         state.loading = false;
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       });
// //   }
// // });

// // export const { clearSelectedUrl, resetUrlState } = urlSlice.actions;

// // export default urlSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/url';

// // Add new URL
// export const addUrl = createAsyncThunk(
//   'urls/addUrl',
//   async (urlData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/create`, urlData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Fetch all URLs
// export const fetchAllUrls = createAsyncThunk(
//   'urls/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/display`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Fetch URL by ID
// export const fetchUrlById = createAsyncThunk(
//   'urls/fetchById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/${id}`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Update URL
// export const updateUrl = createAsyncThunk(
//   'urls/update',
//   async ({ id, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Delete URL
// export const deleteUrl = createAsyncThunk(
//   'urls/delete',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// const urlSlice = createSlice({
//   name: 'urls',
//   initialState: {
//     items: [],
//     selectedUrl: null,
//     loading: false,
//     error: null,
//     status: 'idle'
//   },
//   reducers: {
//     clearSelectedUrl: (state) => {
//       state.selectedUrl = null;
//     },
//     resetUrlState: (state) => {
//       state.items = [];
//       state.selectedUrl = null;
//       state.loading = false;
//       state.error = null;
//       state.status = 'idle';
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Add URL
//       .addCase(addUrl.pending, (state) => {
//         state.loading = true;
//         state.status = 'loading';
//       })
//       .addCase(addUrl.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = 'succeeded';
//         state.items.push(action.payload);
//       })
//       .addCase(addUrl.rejected, (state, action) => {
//         state.loading = false;
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Fetch all URLs
//       .addCase(fetchAllUrls.pending, (state) => {
//         state.loading = true;
//         state.status = 'loading';
//       })
//       .addCase(fetchAllUrls.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchAllUrls.rejected, (state, action) => {
//         state.loading = false;
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Fetch URL by ID
//       .addCase(fetchUrlById.pending, (state) => {
//         state.loading = true;
//         state.status = 'loading';
//       })
//       .addCase(fetchUrlById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = 'succeeded';
//         state.selectedUrl = action.payload;
//       })
//       .addCase(fetchUrlById.rejected, (state, action) => {
//         state.loading = false;
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Update URL
//       .addCase(updateUrl.pending, (state) => {
//         state.loading = true;
//         state.status = 'loading';
//       })
//       .addCase(updateUrl.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = 'succeeded';
//         const index = state.items.findIndex(url => url._id === action.payload._id);
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//         if (state.selectedUrl?._id === action.payload._id) {
//           state.selectedUrl = action.payload;
//         }
//       })
//       .addCase(updateUrl.rejected, (state, action) => {
//         state.loading = false;
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Delete URL
//       .addCase(deleteUrl.pending, (state) => {
//         state.loading = true;
//         state.status = 'loading';
//       })
//       .addCase(deleteUrl.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = 'succeeded';
//         state.items = state.items.filter(url => url._id !== action.payload);
//         if (state.selectedUrl?._id === action.payload) {
//           state.selectedUrl = null;
//         }
//       })
//       .addCase(deleteUrl.rejected, (state, action) => {
//         state.loading = false;
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   }
// });

// export const { clearSelectedUrl, resetUrlState } = urlSlice.actions;
// export default urlSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/url";

export const addUrl = createAsyncThunk(
  "urls/addUrl",
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, urlData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllUrls = createAsyncThunk(
  "urls/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/display`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUrlById = createAsyncThunk(
  "urls/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUrl = createAsyncThunk(
  "urls/update",
  async ({ id, URL }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { URL });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "urls/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const urlSlice = createSlice({
  name: "urls",
  initialState: {
    items: [],
    selectedUrl: null,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    clearSelectedUrl: (state) => {
      state.selectedUrl = null;
    },
    resetUrlState: (state) => {
      state.items = [];
      state.selectedUrl = null;
      state.loading = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUrl.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(addUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addUrl.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllUrls.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchAllUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllUrls.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUrlById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchUrlById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.selectedUrl = action.payload;
      })
      .addCase(fetchUrlById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUrl.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(updateUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        const index = state.items.findIndex(
          (url) => url._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedUrl?._id === action.payload._id) {
          state.selectedUrl = action.payload;
        }
      })
      .addCase(updateUrl.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.items = state.items.filter((url) => url._id !== action.payload);
        if (state.selectedUrl?._id === action.payload) {
          state.selectedUrl = null;
        }
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSelectedUrl, resetUrlState } = urlSlice.actions;
export default urlSlice.reducer;
