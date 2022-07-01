import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./barrowsService";
import {  BarrowModel, BarrowState, BarrowsModel } from "./barrowsModel";
import { RootState } from "../../app/store";
import { MemberModelFromToken } from "../member/membersModel";
import { BookModel } from "../books/booksModel";

// Get barrow from local storage
const member = JSON.parse(localStorage.getItem("member")!) as MemberModelFromToken;
const initialState : BarrowState = {
  barrows: [], // check if there is barrow
  singleBarrow : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  processDone: false,
  message: [],
  count: 0
};

// ------------------------------------------------------------------------------------------- //
// Register barrow
export const add = createAsyncThunk(
  "barrow/add",
  async ({bookId, memberId, data} : {bookId : number, memberId : number, data : BarrowModel}, thunkAPI) => {
    try {
      console.log(thunkAPI);
      return await authService.add(bookId, memberId, data, member.access_token.toString());
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
// get all barrows
export const getAll = createAsyncThunk<BarrowModel[], undefined, { state: RootState }> (
  "barrow/getAll",
  async (_, thunkAPI) => {
    try {
      const access_token :any = thunkAPI.getState().auth.member?.access_token;
      return await authService.getAll(access_token);
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
// get all barrows
export const countAll = createAsyncThunk<number, undefined, {state : RootState}> (
  "barrow/countAll",
  async (_, thunkAPI) => {
    try {
      const access_token :any = thunkAPI.getState().auth.member?.access_token;
      return await authService.countAll(access_token) as number;
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
// delete barrow by id
export const deleteById = createAsyncThunk (
  "barrow/deleteById",
  async (id : number, thunkAPI) => {
    try {
      return await authService.deleteById(member.access_token, id);
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
// update barrow by id
export const updateById = createAsyncThunk (
  "barrow/updateById",
  async (data : BarrowModel, thunkAPI) => {
    try {
      const {id, ...fields} = data;
      return await authService.updateById(member.access_token, id!,fields);
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
// update barrow by id
export const findById = createAsyncThunk (
  "barrow/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find barrow works
      return await authService.findByID(member.access_token, id);
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
// update barrow by id
export const searchIn = createAsyncThunk (
  "barrow/searchIn",
  async (keyword : string, thunkAPI) => {
    try {
      // TODO check find barrow works
      return await authService.searchIn(member.access_token, keyword);
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

export const barrowSlice : any = createSlice({
  name: "barrow",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.barrows = [];
      state.singleBarrow = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleBarrow = {};
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      console.log(action.payload);
      state.singleBarrow = {
        ...state.singleBarrow, 
        [action.payload.name] : action.payload.value
      }
    }
    // ------------------------------------------------------------------ //
  },
  extraReducers: (builder) => {
    builder
      // ------------------------------------------------------------------ //
      // register
      .addCase(add.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.processDone = true;
        state.barrows = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.barrows = [];
      })
      // ------------------------------------------------------------------ //
      // get All barrow
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.processDone = false;
        state.barrows = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.barrows = [];
      })
      // ------------------------------------------------------------------ //
      // get count barrow
      .addCase(countAll.pending, (state) => {
        state.count = 0;
        state.isError = false;
      })
      .addCase(countAll.fulfilled, (state, action) => {
        state.count = action.payload;
        state.isError = false;
      })
      .addCase(countAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.count = 0;
      })
      // ------------------------------------------------------------------ //
      // update barrow by id
      // TODO return fix  update message 
      .addCase(updateById.pending, (state) => {
        
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(updateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.processDone = true;
        state.barrows = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.barrows = [];
      })
      
      // ------------------------------------------------------------------ //
      // find barrow by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
        state.singleBarrow = {};
        state.isError = false;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.processDone = false;
        state.singleBarrow =  action.payload;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleBarrow = null;
      })
      // ------------------------------------------------------------------ //
      // find barrow by id
      // TODO return fix  delete message 
      .addCase(searchIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.processDone = false;
        state.barrows = action.payload;
      })
      .addCase(searchIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.barrows = [];
      })
      // ------------------------------------------------------------------ //
      // delete barrow by id
      // TODO return fix  delete message 
      .addCase(deleteById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.processDone = false;
        state.barrows = state.barrows.filter((barrow : BarrowModel)=> barrow.id !== action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.barrows = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = barrowSlice.actions;
export default barrowSlice.reducer;
