import {REGISTER_USER, LOGIN_USER, LOGOUT, UPDATE} from  "./type"
import { request } from "../util/axios";

const REGISTER_URL = "https://childsnack-test.appspot.com/_ah/api/user/v1/join"
const LOGIN_URL ="https://childsnack-test.appspot.com/_ah/api/user/v1/login"
const LOGOUT_URL ="https://childsnack-test.appspot.com/_ah/api/user/v1/logout"
const UPDATE_URL = "https://childsnack-test.appspot.com/updateProfile"

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
        return {Authorization : user};
    }else{
        return {};
    }
}

export function loginUser(toDataSubmit){
    const data = request("post", LOGIN_URL, toDataSubmit, {headers: authHeader()});
    console.log("data")
    console.log(data)
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
    console.log("data")
    console.log(data)
    return {
        type: UPDATE, 
        payload: data,
    }
}
