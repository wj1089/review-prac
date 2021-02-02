import {REGISTER_USER, LOGIN_USER} from  "./type"
import { request } from "../util/axios";

const USER_URL = "https://childsnack-test.appspot.com/_ah/api/user/v1/join"
const LOGIN_URL ="https://childsnack-test.appspot.com/_ah/api/user/v1/login"


export function registerUser(dataToSubmit){
    const data = request("post", USER_URL, dataToSubmit);
    return {
        type:REGISTER_USER, 
        payload:data
    }
}

export function loginUser(dataToSubmit){
    const data = request("post", LOGIN_URL, dataToSubmit);
    return {
        type:LOGIN_USER, 
        payload:data
    }
}




