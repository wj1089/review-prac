import {REGISTER_USER, LOGIN_USER, LOGOUT} from  "./type"
import { request } from "../util/axios";
// import axios from "axios";


const REGISTER_URL = "https://childsnack-test.appspot.com/_ah/api/user/v1/join"
const LOGIN_URL ="https://childsnack-test.appspot.com/_ah/api/user/v1/login"

const LOGOUT_URL ="https://childsnack-test.appspot.com/_ah/api/user/v1/logout"


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





export function registerUser(dataToSubmit){
    const data = request("post", REGISTER_URL, dataToSubmit);
    return {
        type: REGISTER_USER, 
        payload: data,
    }
}


export function loginUser(dataToSubmit){
    const data = request("post", LOGIN_URL, dataToSubmit);
    return {
        type:LOGIN_USER, 
        payload: data,
    }
}

export function logoutUser(dataToSubmit){
    // const token = loginUser(data)
    const data = request("get", LOGOUT_URL, dataToSubmit);
    
    return {
        type:LOGOUT, 
        payload: data,
        // token : token
    }
}




