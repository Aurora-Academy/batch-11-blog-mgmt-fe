import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../utils/axios";
import { URLS } from "../constants";
import { getItem } from "../utils/session";

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
        access_token: getItem(),
      },
    });
    return res.data;
  }
);

export const listBlogs = createAsyncThunk(
  "blogs/listBlogs",
  async ({ limit, page }) => {
    const res = await instance.get(
      `${URLS.BLOGS}?limit=${limit}&page=${page}`,
      {
        headers: {
          access_token: getItem(),
        },
      }
    );
    return res.data;
  }
);

export const getById = createAsyncThunk("blogs/getById", async (id) => {
  const res = await instance.get(`${URLS.BLOGS}/admin/${id}`, {
    headers: {
      access_token: getItem(),
    },
  });
  return res.data;
});

export const updateBySlug = createAsyncThunk(
  "blogs/updateBySlug",
  async ({ slug, payload }) => {
    const res = await instance.put(`${URLS.BLOGS}/${slug}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: getItem(),
      },
    });
    return res.data;
  }
);

export const updateStatusBySlug = createAsyncThunk(
  "blogs/updateStatusBySlug",
  async (slug) => {
    const res = await instance.patch(`${URLS.BLOGS}/${slug}`, {
      headers: {
        access_token: getItem(),
      },
    });
    return res.data;
  }
);

export const removeBySlug = createAsyncThunk(
  "blogs/removeBySlug",
  async (slug) => {
    const res = await instance.delete(`${URLS.BLOGS}/${slug}`, {
      headers: {
        access_token: getItem(),
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
      }) //
      .addCase(listBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.blogs = action.payload.data.data;
      })
      .addCase(listBlogs.pending, (state) => {
        state.loading = true;
        state.blogs = [];
        state.total = 0;
      })
      .addCase(listBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) //
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(getById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = blogSlice.actions;

export const blogReducer = blogSlice.reducer;
