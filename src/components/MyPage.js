import React, { useState } from 'react';
import Logout from './Logout';

const MyPage = () => {
    // const [btnClick, setBtnClick] = useState(false)
    // const serveToMyPage = ()=>{
    //     setBtnClick(!btnClick)
    //     console.log("btnClick")
    //     console.log(btnClick)
    // }

    return (
        <>
            <h1>Welcome to My Page</h1>
            <a href="/userInfo"><button type="button">회원정보관리</button></a>
            {/* <button type="submit" onClick={serveToMyPage}>회원정보관리</button> */}
            
            <Logout />
        </>
    );
};

export default MyPage;