import axios from 'axios';
import React, { useState, useCallback} from 'react';
// import { updateProfile } from '../actions/userAction';
import PasswordMask from 'react-password-mask';

// https://childsnack-test.appspot.com/_ah/api/auth/v1/findPassword?email=

const searchPass = 'https://childsnack-test.appspot.com/_ah/api/user/v1/findPassword?email=';
const sendPassword = 'https://childsnack-test.appspot.com/_ah/api/user/v1/sendPassword';

const ForgotPw = () => {
    //기본 입력항목
    const [forgotPw, setForgotInfo] = useState({
        email : '',
        phone : ''
    })
    console.log("forgotPw")
    console.log(forgotPw)

    //비밀번호 재설정 
    const [pwNum,setPwNum] = useState('')
    //인증번호
    const [pwCodeNum, setPwCodeNum] = useState('')
    //다음버튼
    const [pwSwitchCheck, setPwSwitchCheck] = useState(false)
    //인증요청 버튼
    const [agreeCheck, setAgreeCheck] = useState(false)
    //기본입력항목 input
    const handleChange = useCallback((e) =>{  
        const {value, name} = e.target;
        
        setForgotInfo({
            ...forgotPw,
            [name]:value
        })
    },[forgotPw])

    //다음버튼
    const onSubmitPwChage =()=>{
        setPwSwitchCheck(!pwSwitchCheck)
        console.log("pwSwitchCheck")
        console.log(pwSwitchCheck)
    }

    //인증버튼 스위치
    const handlePwCodeSwitch = (e) =>{
        e.preventDefault()
        setAgreeCheck(!agreeCheck)
        console.log("agreeCheck")
        console.log(agreeCheck)
        axios
        .get(searchPass + forgotPw.email + '&phone=' + forgotPw.phone)
        .then((response)=>{
            console.log("들어옴")
            console.log("response")
            console.log(response)
        })
        .catch()
    }

    //인증번호 inputChage
    const inputPwCode =(e)=>{
        setPwCodeNum(e.target.value)
        console.log("pwCodeNum")
        console.log(pwCodeNum)
    }

    //비밀번호 재설정 input
    const pwInputChange = (e) =>{
        setPwNum(e.target.value)
        console.log("pwNum")
        console.log(pwNum)
    }

    console.log("pwSwitchCheck")
    console.log(pwSwitchCheck)

    //
    const makePwInput = () =>{
        return (
        <>
            <div>
                <input 
                // className="sign-input" 
                id="email"
                name="email" 
                type="email" 
                placeholder="이메일계정" 
                onChange={handleChange}
                />
            </div>

            <div>
                <input 
                // className="sign-input"
                name="phone"
                type="tel"
                placeholder="전화번호"
                onChange={handleChange}
                />
            </div>
                {agreeCheck===true ? pressPwCertifi : notPressPwCertifi}
            <button type="submit"  onClick={onSubmitPwChage} style={{width:"100%"}}>다음</button>
        </>
        )
    }

    const makePwChange = () =>{
        return(
        <>
            <div>
                <input 
                type="text"
                placeholder="비밀번호"
                onChange={pwInputChange}
                />

                <input 
                type="text"
                placeholder="비밀번호 재입력"
                onChange={pwInputChange}
                />
            </div>

            <button type="button" style={{width:"100%"}}>로그인하러 가기</button>
        </>
        )
    }
    
    const notPressPwCertifi = (
        <div>
            <div style={{height:100}}>
                <button type="button" style={{float:"right"}} onClick={handlePwCodeSwitch}>인증요청</button>
            </div>
        </div>
    )

    const pressPwCertifi = (
        <div>
            <div style={{height:100}}>
                <input
                    // className="modal-input"
                    type='text'
                    name="codeNum"
                    value={pwCodeNum}
                    onChange={inputPwCode}
                    placeholder="인증번호 입력"
                />
               
                <button 
                    type="submit" 
                    onClick={handlePwCodeSwitch}
                >
                    다시인증
                </button>

                <div className="footer">
                    <div className="modal-timer">
                        {/* 인증번호가 발송되었습니다  */}
                        {/* <div>(남은 시간 {minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds})
                        </div> */}
                    </div>
                </div>
                <button type="button" style={{float:"right"}} onClick={handlePwCodeSwitch}>뒤로</button>
            </div>
        </div>
    )

    return (
       <>
            <div style={{display:'flex',justifyContent:'center', border:"1px solid"}}>
                <div className="full-screen">
                    <div className="outline">
                    
                        <h4 style={{display:'flex',justifyContent:'center'}}>
                            Did you forgot own PW?
                        </h4>

                        <div className="mid-area">
                            {pwSwitchCheck === true ? makePwChange() : makePwInput()}
                        </div>

                        <div style={{display:'flex',justifyContent:'center'}}>
                            <a href="/login"><button>back to Login</button></a>
                            <a href="/"><button>back to Home</button></a>
                        </div>
                    </div>
                </div>
            </div>
       </>
    );
};

export default ForgotPw;