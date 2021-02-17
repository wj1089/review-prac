import React, { useState } from 'react';
import Logout from '../log/Logout';
import "./navi.css";

const Navbar = ({history}) => {


    const [isSubmit, setIsSubmit] = useState(false)


    const submitForm =()=> {
        setIsSubmit(!isSubmit)
        history.push("./login")
    }

    const ticket = localStorage.getItem("user")

    return (
        <>
            <div className="nav-header">
                <div className="nav-bar">
                    { ticket === null &&(
                        <>
                            <h1>Welcome to Home</h1>
                            <button onClick={submitForm}>로그인</button>
                        </>
                    )}

                    { ticket !== null &&(
                        <>
                            <h1>hello</h1>
                            <a href="/mypage"><button>마이페이지</button></a>
                            <Logout />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;