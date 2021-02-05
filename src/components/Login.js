import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from "../actions/userAction"
import "./login.css"

const Login = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [os, setOs] = useState('')
    const [uuid, setUuid] = useState('')

    const changeId = e =>{
        setEmail(e.currentTarget.value)
    }

    const changePw = e =>{
        setPassword(e.currentTarget.value)
    }

    const changeOs = e =>{
        setOs(e.currentTarget.value)
    }
    
    const changeUuid = e =>{
        setUuid(e.currentTarget.value)
    }

    const onSubmit = () =>{
     
        const body = {
            email : email,
            password : password,
            os : os,
            uuid : uuid,
        }
      
        dispatch(loginUser(body))
        .then((response) => {
        console.log("respose")
        console.log(response.payload)

        if(response.payload.accountEntity !== false){
            alert("로그인 성공! 환영합니다")
            
            localStorage.setItem("user", JSON.stringify(response.payload));
            props.history.push("/Logout")

            console.log("localStorage")
            console.log(localStorage)
        }
        })
        .catch((error)=>{
            alert(error.response.data.error.message)
        })
    }

    return (
    <>
        <div className="full-screen">
            <div className="outline">
                <header><h1>Login Page</h1></header>
                <div className="mid-area">
                    <input className="idpw-input" value={email} name="email" type="text" placeholder="아이디" onChange={changeId} />
                    <input className="idpw-input" value={password} name="password" type="text" placeholder="비밀번호" onChange={changePw} />
                    <input className="idpw-input" value={os} name="os" type="text" placeholder="OS" onChange={changeOs} />
                    <input className="idpw-input" value={uuid} name="uuid" type="text" placeholder="uuid" onChange={changeUuid} />

                    <div className="find-area">
                        <a href="./forgotid"><button className="btn-find" type="button">아이디 찾기</button></a>
                        <a href="./forgotpw"><button className="btn-find" type="button">비밀번호 찾기</button></a>
                    </div>
                </div>
                <div className="select-btn">
                    {/* submit */}
                    <button className="btn-item" type="submit" onClick={onSubmit}>로그인</button>

                    {/* signin */}
                    <a href="./Signin"><button className="btn-item" type="button" >회원가입</button></a>
                    <a href="./"><button>뒤로가기</button></a>
                </div>
            </div>  
        </div>
    </>
    );
};

export default withRouter(Login);