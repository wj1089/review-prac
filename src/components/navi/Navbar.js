import React, { useRef, useState } from 'react';
import Logout from '../log/Logout';
import "./navi.css";
import { withRouter } from 'react-router-dom';

const Navbar = ({history}) => {


    const [isSubmit, setIsSubmit] = useState(false)
    const navBar = useRef(null);
    const logo = useRef(null);

    const submitForm =()=> {
        setIsSubmit(!isSubmit)
        history.push("./login")
    }

    const ticket = localStorage.getItem("user")


    function scrollDown() {
        if (navBar.current != null) {
            // y scroll event
            if (
              document.body.scrollTop > 80 ||
              document.documentElement.scrollTop > 80
            ) {
              navBar.current.style.height = '100px';
              navBar.current.style.backgroundColor = 'rgba(0,0,0,0.85)';
            } else {
              navBar.current.style.height = '150px';
              navBar.current.style.backgroundColor = 'rgba(0,0,0,0)';
            }
            // x scroll event
            if (
              document.body.scrollLeft > 0 ||
              document.documentElement.scrollLeft > 0
            ) {
              const left =
                document.body.scrollLeft === 0
                  ? document.documentElement.scrollLeft
                  : document.body.scrollLeft;
      
              navBar.current.style.left = `${0 - left}px`;
            } else {
              navBar.current.style.left = 0;
            }
          }
    }

    window.onscroll = () => {
        scrollDown()
      };
    

    return (
        <>
            <div className="nav-header" ref={navBar}>
                <div className="nav-bar">
                    { ticket === null &&(
                        <>
                            <div style={{width:"100%"}}>
                                <h1>Before Login Page</h1>
                                <button style={{float:"right"}} onClick={submitForm}>로그인</button>
                            </div>
                        </>
                    )}

                    { ticket !== null &&(
                        <>
                            <div style={{width:"100%"}}>
                                <h1>After Login Page</h1>
                                <div style={{float:"right", display:"flex"}}>
                                    <a href="/mypage"><button >마이페이지</button></a>
                                    <Logout />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default withRouter(Navbar);