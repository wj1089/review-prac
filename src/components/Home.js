import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../actions/userAction'
import Signin from './Signin';
import Logout from './Logout';
import Login from './Login';

const Home = () => {
    const [isSubmit, setIsSubmit] = useState(true)

    const submitForm =()=> {
        setIsSubmit(isSubmit)
    }

    const makeLoginElement = (
            <>
                <h1>Please Login First</h1>
                <a href="/login"><button>로그인</button></a>
            </>
        )
    

    const makeIntoSiteElement = (
            <>
                <h1>hello</h1>
                <a href="/mypage"><button>마이페이지</button></a>
                <a href="/logout"><button>로그아웃</button></a>
            </>
        )

    return (
        <>
            <div className="full-screen">
                {/* {isSubmit ? makeLoginElement : makeIntoSiteElement} */}
                {
                    submitForm ? makeLoginElement : makeIntoSiteElement
                }
            </div>
        </>
    );
};

export default withRouter(Home);