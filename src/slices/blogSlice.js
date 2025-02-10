import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";
import { URLS } from "../constants";

const initialState = {
  blogs: [],
  blog: {},
  total: 0,
  currentPage: 1,
  limit: 10,
  error: "",
  loading: false,
};

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload) => {
    const res = await instance.post(URLS.BLOGS, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = blogSlice.actions;

export const blogReducer = blogSlice.reducer;
