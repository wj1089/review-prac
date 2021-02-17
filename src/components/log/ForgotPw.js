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
    //입력 받은 Auth
    const [rqstPsAuth, setRqstPsAuth] = useState('')
    //기본입력항목 input
    const handleChange = useCallback((e) =>{  
        const {value, name} = e.target;
        
        setForgotInfo({
            ...forgotPw,
            [name]:value
        })
    },[forgotPw])

  
      //다음버튼, 입력 받은 코드넘버 보내기
      function handlePwCF(){
        console.log("인증번호 수신 부분")
        console.log("pwCodeNum")
        console.log(pwCodeNum)
        setPwSwitchCheck(!pwSwitchCheck)

        if(pwCodeNum.length !== 6 && agreeCheck === false){
            console.log("return 까지왔음")
            alert("정확한 수신인증번호를 입력해주세요.")
            return
        }
        else{
            console.log("비밀번호 통과")
            setPwSwitchCheck(true)
            setAgreeCheck(true)
        }

        axios
        .post(sendPassword,{
            authId : rqstPsAuth, 
            code : pwCodeNum, 
            email :  forgotPw.email
        })

        .then((response) =>{
            console.log("response")
            console.log(response)
            if(response && response.data){
                console.log("response.data")
                console.log(response.data)
                setPwSwitchCheck(true)
            }
        })

        .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })

    }

    // const onSubmitPwChage =()=>{
    //     console.log("pwSwitchCheck")
    //     console.log(pwSwitchCheck)
    // }

    //인증버튼 스위치
    const handlePwCodeSwitch = (e) =>{
        e.preventDefault()
        setAgreeCheck(!agreeCheck)
        console.log("agreeCheck")
        console.log(agreeCheck)
        if(pwSwitchCheck === true){
            console.log("통과")
        }else if (pwSwitchCheck === false && forgotPw.email==='' && forgotPw.phone === ''){
            console.log("부합하지않음")
            alert("빈칸 내용을 정확히 입력해주세요")
            setPwSwitchCheck(false);
            setAgreeCheck(false);
            return
        }
        axios
        .get(searchPass + forgotPw.email + '&phone=' + forgotPw.phone)
        .then((response)=>{
            console.log("response")
            console.log(response)
            if(response&& response.data){
                const parseJason = JSON.parse(response.data.authId)
                setRqstPsAuth(parseJason)
                console.log("parseJason")
                console.log(parseJason)
            }
        })
        .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
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
            <button type="submit"  onClick={handlePwCF} style={{width:"100%"}}>다음</button>
        </>
        )
    }

    const makePwChange = () =>{
        return(
        <>
            {/* <div>
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
            </div> */}

            <div>
                <p>등록하신 휴대전화 문자로 임시 비밀번호를 발송하였습니다.</p>
                <p>다시 로그인 해주세요.</p>
            </div>

            <a href="/login"><button type="button" style={{width:"100%"}}>확인</button></a>
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