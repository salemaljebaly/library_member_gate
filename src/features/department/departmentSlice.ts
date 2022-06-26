import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentService from "./departmentService";
import { DepartmentModel, DepartmentState } from "./departmentModel";
import { RootState } from "../../app/store";
import { MemberModelFromToken } from "../member/membersModel";
// Get member token from local storage
const member = JSON.parse(localStorage.getItem("member")!) as MemberModelFromToken;
const initialState : DepartmentState = {
  Departments: [], // check if there is Departments
  singleDepartment : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  // use this property to check add and edit process
  processDone : false,
  message: [],
};

// ------------------------------------------------------------------------------------------- //
// Register Departments
export const add = createAsyncThunk (
  "Departments/add",
  async (department: DepartmentModel, thunkAPI) => {
    try {
      return await departmentService.add(department, member.access_token.toString());
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
// get all Departmentss
export const getAll = createAsyncThunk<DepartmentModel[], undefined, { state: RootState }> (
  "Departments/getAll",
  async (_, thunkAPI) => {
    try {
      const access_token : any = thunkAPI.getState().auth.member?.access_token;
      return await departmentService.getAll(access_token);
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
// delete Departments by id
export const deleteById = createAsyncThunk (
  "Departments/deleteById",
  async (id : number, thunkAPI) => {
    try {
      return await departmentService.deleteById(member.access_token,id);
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
// update Departments by id
export const updateById = createAsyncThunk (
  "Departments/updateById",
  async (department : Partial<DepartmentModel>, thunkAPI) => {
    try {
      const {id, ...fields} = department;
      return await departmentService.updateById(member.access_token,id!, fields);
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
// update Departments by id
export const findById = createAsyncThunk (
  "Departments/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find Departments works
      return await departmentService.findByID(member.access_token, id);
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

export const Departmentslice = createSlice({
  name: "department",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.Departments = [];
      state.singleDepartment = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleDepartment = {};
      state.message = [];
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      state.singleDepartment = {
        ...state.singleDepartment, 
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
        state.processDone = true;
        state.Departments = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.Departments = [];
      })
      // ------------------------------------------------------------------ //
      // get All Departments
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.Departments = [];
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.Departments = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Departments = [];
        state.processDone = false;
      })
      // ------------------------------------------------------------------ //
      // update Departments by id
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
        state.processDone = true;
        state.Departments = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.Departments = [];
      })
      // ------------------------------------------------------------------ //
      // find Departments by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.singleDepartment =  action.payload;
        state.processDone = false;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleDepartment = null;
        
      })
      // ------------------------------------------------------------------ //
      // delete Departments by id
      // TODO return fix  delete message 
      .addCase(deleteById.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.Departments = state.Departments.filter((department : DepartmentModel)=> department.id !== action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Departments = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = Departmentslice.actions;
export default Departmentslice.reducer;
