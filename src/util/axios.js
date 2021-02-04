import axios from "axios";

axios.defaults.withCredentials = true; 
export const request = (method, url, data) => {

    return axios({
        method,
        url: url,
        data
    })
    .then((res)=>res.data)
}


