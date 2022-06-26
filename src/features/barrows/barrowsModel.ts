import { Role } from "../../utils/enum/role.enum";
import { BookModel } from "../books/booksModel";

// --------------------------------------------------- //
// user model require field
export interface BarrowModel {
    id?: number;  
    returnDate: string;
    member : BarrowModel;
    book : BookModel;
}

// --------------------------------------------------- //
// return user from redux state
export interface BarrowState {
  barrows: BarrowModel[] | [];
  singleBarrow : Partial<BarrowModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
  count : number;
}

// --------------------------------------------------- //
// user all fields
export interface BarrowsModel {
  id?: number;  
  returnDate: string;
  member : BarrowModel;
  book : BookModel;
  createdAt?: Date;
  updateAt?: Date;
}
// --------------------------------------------------- //
