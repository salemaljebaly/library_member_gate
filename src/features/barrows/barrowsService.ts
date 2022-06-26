import axios from "axios";
import jwtDecode from "jwt-decode";
import Strings from "../../utils/Strings";
import { BarrowModel } from "./barrowsModel";

const API_URL = Strings.API_URL;
const path = 'barrow';

// Register citizen
const add = async ( bookId : number, memberId : number,data:BarrowModel, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
    const response = await axios.post(API_URL + path + '/' + bookId + '/' + memberId, data, config);

    return response.data;
}

// get all user
const getAll = async (access_token: string) => {
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path , config);
  let data : BarrowModel[];
  if(response.data){
      data  = response.data
      return data;
      
  }
  return response.data;
}
// count all 
const countAll = async (access_token: string) => {
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path + '/count' , config);
  return response.data;
}


// update user from database
const updateById  = async (access_token: string, id : number, data:Partial<BarrowModel>) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.patch(API_URL + path + '/' + id , data, config);
    const retrunCitizenData  = findByID(access_token, id);
    return retrunCitizenData;
}

// update user from database
const findByID  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.get(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const deleteById  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.delete(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const searchIn  = async (access_token: string, keyword : string) => {
    
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path + '/' + keyword, config);
  
  // it retrun array of users 
  return response.data;
}

// delete user from database
// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
   add,
    getAll,
    deleteById,
    updateById, 
    findByID,
    searchIn,
    logout,
    countAll
}

export default authService;