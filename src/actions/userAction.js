import {REGISTER_USER, LOGIN_USER, LOGOUT} from  "./type"
import { request } from "../util/axios";
import authHeader from "../hoc/authHeader";

const REGISTER_URL = "https://childsnack-test.appspot.com/_ah/api/user/v1/join"
const LOGIN_URL ="https://childsnack-test.appspot.com/_ah/api/user/v1/login"
const UPDATE_URL = "https://childsnack-test.appspot.com/updateProfile"
const LOGOUT_URL ="https://childsnack-test.appspot.com/_ah/api/user/v1/logout"

export function loginUser(toDataSubmit){
    const data = request("post", LOGIN_URL, toDataSubmit, {headers: authHeader()});
    return {
        type:LOGIN_USER, 
        payload: data,
    }
}

export function logoutUser(toDataSubmit){
    const data = request("get", LOGOUT_URL, toDataSubmit,  {headers: authHeader()});
    return {
        type:LOGOUT, 
        payload: data,
    }
}
export function registerUser(toDataSubmit){
    const data = request("post", REGISTER_URL, toDataSubmit, {headers: authHeader()});
    return {
        type: REGISTER_USER, 
        payload: data,
    }
}

export function updateProfile(toDataSubmit){
    const data = request("post", UPDATE_URL, toDataSubmit, {headers: authHeader()});
    return {
        type: UPDATE_URL, 
        payload: data,
    }
}



// export function authUser() {
//     const data = request("post", USER_URL + "/auth");
//     return {
//       type: AUTH_USER,
//       payload: data,
//     };
//   }

// const userAction = () => {

//     const login = (email, password) =>{
//         return axios
//         .post(LOGIN_URL + {email, password})
//         .then((response) =>{
//             if(response.data.accessToken){
//                 localStorage.setItem("user", JSON.stringify(response.data))
//             }
//             return response.data
//         });
//     }

//     const logout = () =>{
//         localStorage.removeItem("user")
//     }

//     const register = (name, email, password) =>{
//         return axios.post(REGISTER_URL , {
//             name,
//             email,
//             password,
//         })
//     }

// }

// export default new userAction();

