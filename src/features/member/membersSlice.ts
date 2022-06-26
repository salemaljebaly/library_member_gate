import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./membersService";
import { LoginModel, MemberModel, MemberState, MembersModel, MemberModelFromToken } from "./membersModel";
import { RootState } from "../../app/store";
import { MemberType } from "./memberType.enum";

// Get member from local storage
const member = JSON.parse(localStorage.getItem("member")!) as MemberModelFromToken;
const initialState : MemberState = {
  members: [], // check if there is member
  singleMember : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  processDone: false,
  message: [],
  count: 0
};

// ------------------------------------------------------------------------------------------- //
// Register member
export const add = createAsyncThunk( 
  "member/add",
  async ({memberData, depId} : {memberData: MemberModel, depId : number}, thunkAPI) => {
    try {
      console.log(thunkAPI);
      return await authService.add(memberData,depId, member.access_token.toString());
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
// login member
export const login = createAsyncThunk(
  "member/login",
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
// get all members
export const getAll = createAsyncThunk<MemberModel[], undefined, { state: RootState }> (
  "member/getAll",
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
// get all members
export const countAll = createAsyncThunk<number, undefined, {state : RootState}> (
  "member/countAll",
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
// delete member by id
export const deleteById = createAsyncThunk (
  "member/deleteById",
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
// update member by id
export const updateById = createAsyncThunk (
  "member/updateById",
  async ({memberData, depId}:{memberData : Partial<MemberModel>, depId : number}, thunkAPI) => {
    try {
      const {id, ...fields} = memberData;
      return await authService.updateById(member.access_token, id!, depId,fields);
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
// update member by id
export const findById = createAsyncThunk (
  "member/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find member works
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
// update member by id
export const searchIn = createAsyncThunk (
  "member/searchIn",
  async (keyword : string, thunkAPI) => {
    try {
      // TODO check find member works
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

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.members = [];
      state.singleMember = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleMember = {
        memberType: MemberType.Student,
        isActive: false
      };
      state.message = [];
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      console.log(action.payload);
      state.singleMember = {
        ...state.singleMember, 
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
        state.members = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.members = [];
      })
      // ------------------------------------------------------------------ //
      // get All member
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.processDone = false;
        state.members = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.members = [];
      })
      // ------------------------------------------------------------------ //
      // get count member
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
      // update member by id
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
        state.members = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.members = [];
      })
      // ------------------------------------------------------------------ //
      // find member by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
        state.singleMember = {};
        state.isError = false;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.processDone = false;
        state.singleMember =  action.payload;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleMember = null;
      })
      // ------------------------------------------------------------------ //
      // find member by id
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
        state.members = action.payload;
      })
      .addCase(searchIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.members = [];
      })
      // ------------------------------------------------------------------ //
      // delete member by id
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
        state.members = state.members.filter((member : MemberModel)=> member.id !== action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.members = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = memberSlice.actions;
export default memberSlice.reducer;
