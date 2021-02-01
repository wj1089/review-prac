import React, { useEffect, useState } from 'react';
import "./login.css"

const Login = () => {

    const [userId, setUserId] = useState('')
    const [userPw, setUserPw] = useState('')


    useEffect(()=>{
        console.log("effect")
        console.log(userId)

        return() =>{
            console.log("cleanup")
            console.log(userId)
        }
    },[userId,userPw])



    const changeId = e =>{
        setUserId(e.target.value)
        console.log("changeId")
        console.log(e.target.value)
    }

    const changePw = e =>{
        setUserPw(e.target.value)
        console.log("changePw")
        console.log(e.target.value)
    }

    const onClick = (e) =>{
        console.log("Click button")
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log("Submit")
    }

    return (
    <>
        <div className="full-screen">
            <div className="outline">
                <header><h1>Login Page</h1></header>
                <div className="mid-area">
                    <input className="idpw-input" value={userId} type="text" placeholder="아이디" onChange={changeId} />
                    <input className="idpw-input" value={userPw} type="text" placeholder="비밀번호" onChange={changePw} />
                    
                    <div className="find-area">
                        <a href="./forgotid"><button className="btn-find" type="button" onClick={onClick}>아이디 찾기</button></a>
                        <a href="./forgotpw"><button className="btn-find" type="button" onClick={onClick}>비밀번호 찾기</button></a>
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

export default Login;