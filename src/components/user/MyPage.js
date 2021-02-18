import React from 'react';
import Logout from '../log/Logout';

const MyPage = () => { 

    return (
        <>
            <h1>Welcome to My Page</h1>
            <a href="/userInfo"><button type="button">회원정보</button></a>
            <a href="/serviceCenter"><button>고객센터</button></a>
            <Logout />
        </>
    );
};

export default MyPage;