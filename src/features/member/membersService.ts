import axios from "axios";
import jwtDecode from "jwt-decode";
import Strings from "../../utils/Strings";
import { LoginModel, MemberModel, MemberModelFromToken } from "./membersModel";

const API_URL = Strings.API_URL;
const path = 'members';

// Register citizen
const add = async (data:MemberModel, depId : number, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
    const response = await axios.post(API_URL + path + '/' + depId, data, config);

    return response.data;
}

// login member
const login = async (memberData:LoginModel) => {
    const response = await axios.post(API_URL + path + 'auth', memberData);
    let member : MemberModelFromToken;
    if(response.data){
        member  = jwtDecode(response.data['access_token']);
        member.access_token = response.data['access_token'];
        localStorage.setItem('member', JSON.stringify(member));

        return member;
    }
    return response.data;
}

// get all member
const getAll = async (access_token: string) => {
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path , config);
  let members : MemberModel[];
  if(response.data){
      members  = response.data
      return members;
      
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


// update member from database
const updateById  = async (access_token: string, id : number, depId : number, memberData:Partial<MemberModel>) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.patch(API_URL + path + '/' + id + '/' + depId,memberData, config);
    const retrunCitizenData  = findByID(access_token, id);
    return retrunCitizenData;
}

// update member from database
const findByID  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.get(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete member from database
const deleteById  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.delete(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete member from database
const searchIn  = async (access_token: string, keyword : string) => {
    
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path + '/' + keyword, config);
  
  // it retrun array of members 
  return response.data;
}

// delete member from database
// Logout member
const logout = () => {
  localStorage.removeItem('member')
}

const authService = {
   add,
    login,
    getAll,
    deleteById,
    updateById, 
    findByID,
    searchIn,
    logout,
    countAll
}

export default authService;