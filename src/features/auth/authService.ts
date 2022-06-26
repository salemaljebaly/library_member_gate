import axios from "axios";
import jwtDecode from "jwt-decode";
import Strings from "../../utils/Strings";
import { LoginModel, UserModelFromToken } from "./AuthModel";

const API_URL = Strings.API_URL;
const path = 'members/';
// -----------------------------------------------------------------------------//
// membet login
const login = async (memberData:LoginModel) => {
    
    const response = await axios.post(API_URL + path + 'auth', memberData, );
    let member : UserModelFromToken;
    if(response.data){
        member  = jwtDecode(response.data['access_token']);
        member.access_token = response.data['access_token'];
        localStorage.setItem('member', JSON.stringify(member));

        return member;
    }
    return response.data;
}
// -----------------------------------------------------------------------------//
// Logout member
const logout = () => {
  localStorage.removeItem('member')
}

const authService = {
    login,
    logout
}

export default authService;