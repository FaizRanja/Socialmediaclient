import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to get user with posts
export const fetchUserPosts = createAsyncThunk(
  "user/fetchUserPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/user/withhispost");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to get the posts" }
      );
    }
  }
);



// Async Thunk to get user with posts
export const fetchAllPosts = createAsyncThunk(
  "user/fetchAllPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/v2/post/getpost");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to get  All  posts" }
      );
    }
  }
);


// Async Thunk to followuser
export const followuser = createAsyncThunk(
  "user/followuser",
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const res = await axios.post(`/api/v1/user/followuser/${id}`, {}, {
        withCredentials: true,
      });
      return res.data; // may return updated user/follow list
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



// Async Thunk to followuser
export const unfollowuser = createAsyncThunk(
  "user/unfollowuser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/v1/user/unfollowuser/${id}`, {}, {
        withCredentials: true,
      });
      return res.data; // may return updated user/follow list
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);



// Initial state
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// Slice
const userPostSlice = createSlice({
  name: "userPost",
  initialState,
  reducers: {
    // You can add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

    
// add case for all post in the data base that the user can store 
.addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = Array.isArray(action.payload.post)
        ? action.payload.post
        :[];
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })


// add case for follow user post on the post  
.addCase(followuser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(followuser.fulfilled, (state, action) => {
        state.isLoading = false;
    
        
      })
      .addCase(followuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

//   add cases for the unfloow user

  .addCase(unfollowuser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unfollowuser.fulfilled, (state, action) => {
        state.isLoading = false;
    
        
      })
      .addCase(unfollowuser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      });

  },


});

export default userPostSlice.reducer;
