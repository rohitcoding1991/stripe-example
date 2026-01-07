import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/register", userData);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/login", userData);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get("/userDetailAndSubscriptionHistory");
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    const response = await axiosInstance.post("/logout");
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw thunkAPI.rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createUser cases
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      })
      // getUserData cases
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      })

      // getUserData cases
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
