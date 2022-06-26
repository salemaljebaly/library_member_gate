import { MemberType } from "./memberType.enum";

// --------------------------------------------------- //
// user model require field
export interface MemberModel {
    id?: number;  
    fullName: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    isActive : boolean,
    city: string,
    memberType: MemberType
}
// --------------------------------------------------- //
// login model require field
export interface LoginModel {
  username: string;
  password: string;
}

// --------------------------------------------------- //
// extract data from UserModelFromToken
export interface MemberModelFromToken {
  fullName: string,
  username: string,
  email: string,
  phone: string,
  isActive : boolean,
  city: string,
  memberType: MemberType
  iat: 1650657067;
  access_token: string;
}

// --------------------------------------------------- //
// return user from redux state
export interface MemberState {
  members: MemberModel[] | [];
  singleMember : Partial<MemberModel> | null;
  isError: boolean;
  isSucces: boolean;
  isLoading: boolean;
  processDone : boolean;
  message: string[] | string;
  count : number;
}

// --------------------------------------------------- //
// user all fields
export interface MembersModel {
  id: number;
  fullName: string,
  username: string,
  email: string,
  phone: string,
  password: string,
  isActive : boolean,
  city: string,
  memberType: MemberType
  createdAt?: Date;
  updateAt?: Date;
}
// --------------------------------------------------- //
