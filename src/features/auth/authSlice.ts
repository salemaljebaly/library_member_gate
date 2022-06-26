import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginModel , UserState } from "./AuthModel";

// Get member from local storage
const member = JSON.parse(localStorage.getItem("member")!);
const initialState : UserState = {
  member: member ? member : null, // check if there is member
  isError: false,
  isSucces: false,
  isLoading: false,
  message: [],
};

// login member
export const login = createAsyncThunk(
  "auth/login",
  async (member: LoginModel, thunkAPI) => {
    try {

      return await authService.login(member);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ------------------------------------------------------------------------------------------- //
// logout
export const logout = createAsyncThunk('auth/logout', () => {
     authService.logout()
  })

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.message = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------------------------------------------------------ //
      // register
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.member = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.member = null;
      })
      // ------------------------------------------------------------------ //
      .addCase(logout.pending, (state) => {
        state.member = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.member = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.member = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
