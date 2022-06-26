// --------------------------------------------------- //
// user model require field
export interface DepartmentModel {
  id?: number;
  dep_code: string;
  dep_name: string;

}

// --------------------------------------------------- //
// return user from redux state
export interface DepartmentState {
  Departments: DepartmentModel[] | [];
  singleDepartment : Partial<DepartmentModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
}
