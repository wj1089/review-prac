import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"

const Notice = () => {

    const NoticeUrl = "https://childsnack-test.appspot.com/_ah/api/notice/v1/getAllList"
    // const [notice, setNotice] = useState

    useEffect(()=>{
        console.log("공지사항")
        axios
        .get(NoticeUrl,{headers: authHeader()})
        .then((respone)=>{
            console.log(respone)
            

        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])

    return (
        <>
            <div>
                <h1>Notice</h1>
            </div>
        </>
    );
};

export default Notice;