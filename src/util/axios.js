import axios from "axios";

// const url = "https://childsnack-test.appspot.com/_ah/api/user/v1/join"
axios.defaults.withCredentials = true; 
export const request = (method, url, data) =>{
    return axios({
        method,
        url: url,
        data
    })
    .then((res)=>res.data)
    .catch((err)=> alert(err));
}

