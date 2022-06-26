import axios from "axios";
import Strings from "../../utils/Strings";
import { BookModel } from "./booksModel";

const API_URL = Strings.API_URL;
const path = "book";

// Register Book
const add = async (data: BookModel, authrorId : number, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.post(API_URL + path + '/' + authrorId, data, config);
  if(data.bookFilePath != null){upload(data.bookFilePath, data.id, access_token)}
  return response.data;
};  

// upload image
const upload = async (path : string, bookId : number, access_token: string) => {

  const data = new FormData();
  data.append('file', path);
  data.append('bookId', bookId.toString());
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.post(API_URL + path + '/' + upload , data, config);

  return response.data;
};

// get all user
const getAll = async (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + '/stayed', config);
  let users: BookModel[];
  if (response.data) {
    users = response.data;
    return users;
  }
  return response.data;
};
// count all
const countAll = async (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + "/count", config);
  return response.data;
};

// update user from database
const updateById = async (
  access_token: string,
  id: number,
  authrorId : number,
  userData: Partial<BookModel>
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  await axios.patch(
    API_URL + path + "/" + id + '/'+  authrorId, 
    userData,
    config
  );
  const retrunBookData = findByID(access_token, id);
  return retrunBookData;
};

// update user from database
const findByID = async (access_token: string, id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + "/" + id, config);

  return response.data;
};

// delete user from database
const deleteById = async (access_token: string, id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.delete(API_URL + path + "/" + id, config);

  return response.data;
};

// delete user from database
const searchIn = async (access_token: string, keyword: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + "/" + keyword, config);

  // it retrun array of users
  return response.data;
};

// delete user from database
// Logout user
const logout = () => {
  localStorage.removeItem("member");
};

const authService = {
  add,
  getAll,
  deleteById,
  updateById,
  findByID,
  searchIn,
  logout,
  countAll,
};

export default authService;
