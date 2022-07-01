import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./booksService";
import { BookModel, BookState } from "./booksModel";
import { RootState } from "../../app/store";
import { MemberModelFromToken } from "../member/membersModel";
import { BookStateType } from "./bookType";

// Get book from local storage
const member = JSON.parse(localStorage.getItem("member")!) as MemberModelFromToken;
const initialState : BookState = {
  books: [], // check if there is book
  singleBook : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  processDone: false,
  message: [],
  count: 0
};

// ------------------------------------------------------------------------------------------- //
// Register book
export const add = createAsyncThunk(
  "book/add",
  async ({book, authorId} : {book: BookModel, authorId : number}, thunkAPI) => {
    try {
      console.log(thunkAPI);
      return await authService.add(book, authorId, member.access_token.toString());
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
// get all books
export const getAll = createAsyncThunk<BookModel[], undefined, { state: RootState }> (
  "book/getAll",
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
// get all books
export const countAll = createAsyncThunk<number, undefined, {state : RootState}> (
  "book/countAll",
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
// delete book by id
export const deleteById = createAsyncThunk (
  "book/deleteById",
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
// update book by id
export const updateById = createAsyncThunk (
  "book/updateById",
  async ({bookData, authorId} : {bookData: BookModel, authorId : number}, thunkAPI) => {
    try {
      const {id, ...fields} = bookData;
      return await authService.updateById(member.access_token, id!,authorId, fields);
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
// update book by id
export const updateBookById = createAsyncThunk (
  "book/updatebookById", 
  async ({id, bookData}:{id:number, bookData: any}, thunkAPI) => {
    try {
      return await authService.updateBookById(member.access_token, id!, bookData);
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
// update book by id
export const findById = createAsyncThunk (
  "book/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find book works
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
// update book by id
export const searchIn = createAsyncThunk (
  "book/searchIn",
  async (keyword : string, thunkAPI) => {
    try {
      // TODO check find book works
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

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.books = [];
      state.singleBook = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleBook = {
        bookPages : 0,
        state: BookStateType.STAYED,
      };
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      console.log(action.payload);
      state.singleBook = {
        ...state.singleBook, 
        [action.payload.name] : action.payload.value,
        'bookCount' : 0
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
        state.books = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.books = [];
      })
      // ------------------------------------------------------------------ //
      // get All book
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.processDone = false;
        state.books = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.books = [];
      })
      // ------------------------------------------------------------------ //
      // get count book
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
      // update book by id
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
        state.books = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.books = [];
      })

      
      // ------------------------------------------------------------------ //
      // update book by id
      // TODO return fix  update message 
      .addCase(updateBookById.pending, (state) => {
        
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(updateBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.processDone = true;
        state.books = action.payload;
      })
      .addCase(updateBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.books = [];
      })
      // ------------------------------------------------------------------ //
      // find book by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
        state.singleBook = {};
        state.isError = false;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.processDone = false;
        state.singleBook =  action.payload;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleBook = null;
      })
      // ------------------------------------------------------------------ //
      // find book by id
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
        state.books = action.payload;
      })
      .addCase(searchIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.books = [];
      })
      // ------------------------------------------------------------------ //
      // delete book by id
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
        state.books = state.books.filter((book : BookModel)=> book.id !== action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.books = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = bookSlice.actions;
export default bookSlice.reducer;
