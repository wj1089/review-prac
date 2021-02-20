import React, { useRef, useState } from 'react';
import Logout from '../log/Logout';
import authHeader from "../../actions/userAction"
import "./navi.css";
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({history},data) => {
    const cartHistory = "https://childsnack-test.appspot.com/_ah/api/cart/v1/getCartList"

    const [isSubmit, setIsSubmit] = useState(false)
    //장바구니 버튼
    const [cart, setCart] = useState(true)
    
    const navBar = useRef(null);
    const logo = useRef(null);

    const ticket = localStorage.getItem("user")

    //장바구니 버튼
    const cartSwitch = () =>{
        setCart(cart)
        console.log(cart)
    }


    // const submitForm =()=> {
    //     setIsSubmit(!isSubmit)
    //     history.push("./login")
    // }

    const query = window.location.search
    console.log("query")
    console.log(query)
    const urlParams = new URLSearchParams(query)
    console.log("urlParams")
    console.log(urlParams)
    const getId = urlParams.get('id')
    console.log("getId")
    console.log(getId)





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
    console.log("getId")
    console.log(getId)

    const handleCertificate =() =>{

      if(cart === true){
        if(ticket === null){
          alert("로그인을 먼저 진행해주세요")
          history.push('./login')
          return
        }
        axios
        .get(cartHistory, {headers: authHeader()})
        .then((response)=>{
          console.log("장바구니 진입")
          console.log(response)

            history.push(`./cart?id=+${cart}`)

          // {data.map((cart)=>(
          // ))
        })
        .catch((error)=>{
          console.log("error log")
          console.log(error)
        })
        // .catch((error)=>{
             
        //       console.log(error.response.data.error.message)
        //       alert(error.response.data.error.message)
        //   })
      }
    }
  
  

    return (
        <>
                <div className="nav-bar" style={{width:"100%"}}>
                    { ticket === null &&(
                        <>
                            <div style={{width:"100%"}}>
                                <h1 style={{float:"left"}}>Before Login Page</h1>
                                {/* <button style={{float:"right"}} onClick={submitForm}>로그인</button> */}
                                <button type="button" onClick={handleCertificate}>카트</button>
                            </div>
                        </>
                    )}

                    { ticket !== null &&(
                        <>
                            <div style={{width:"100%"}}>
                                <h1 style={{float:"left"}}>After Login Page</h1>
                                <div style={{float:"right", display:"flex"}}>
                                    {/* <a href="/mypage"><button >마이페이지</button></a> */}
                                    <Logout />
                                    <button type="button" onClick={handleCertificate}>카트</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
        </>
    );
};

export default withRouter(Navbar);