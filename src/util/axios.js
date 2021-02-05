import axios from "axios";

axios.defaults.withCredentials = true; 
export const request = (method, url, data, headers) => {

    return axios({
        method,
        url: url,
        data,
        headers
    })
    .then((res)=>res.data)
}


