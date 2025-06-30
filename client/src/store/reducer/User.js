// src/redux/slices/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,
};

// ✅ Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/user/register", formData, {
        withCredentials: true, // ✅ important
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to register user" }
      );
    }
  }
);

// Login User 

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginfoam, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/user/login", loginfoam, {
        withCredentials: true, // ✅ important
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to register user" }
      );
    }
  }
);


// ✅ Logout User
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });
      return "Logged out successfully.";
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logout failed" }
      );
    }
  }
);

// update user profile picture 
// store/reducer/User.js

export const updateprofilepic = createAsyncThunk(
  "user/updateprofilepic",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/v1/user/profilepicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // if using cookies for auth
      });
      return res.data.profilePicture;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// user.js or userSlice.js
export const getuserdetalis = createAsyncThunk(
  "user/getuserdetalis",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/user/me", {
        withCredentials: true, // if using cookies
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = "Registration successful!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Registration failed";
      })


    // add cases for login user
       .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      })

// add cases for  update profile pic
       .addCase(updateprofilepic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateprofilepic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.message = " Profile pick update  successfully!";
      })
      .addCase(updateprofilepic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "profile pick update  failed";
      })
// add some cases for get the user details 
     .addCase(getuserdetalis.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})
.addCase(getuserdetalis.fulfilled, (state, action) => {
  state.isLoading = false;
  state.user = action.payload.user;
  state.message = "User details fetched!";
})
.addCase(getuserdetalis.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})

            .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.message = "Logged out successfully!";
            })
  }
  
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;
