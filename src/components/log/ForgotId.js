import React, {useCallback, useState, useEffect} from 'react';
import axios from 'axios';
import testUtils from 'react-dom/test-utils';
// import validate from './validationInfo';
// import PropTypes from 'prop-types';

const ForgotId = () => {
    // const phoneCode =  "https://childsnack-test.appspot.com/_ah/api/user/v1/getAuthNum?phone=%7bparam1%7d";
    const searchEmail = 'https://childsnack-test.appspot.com/_ah/api/user/v1/findEmail?phone=';
    const sendEmail = 'https://childsnack-test.appspot.com/_ah/api/user/v1/sendEmail'
    
    // 기본 찾기항목
    const [forgotInfo,setForgotInfo] = useState({
        name : '',
        phone : '',
    })
    console.log("forgotInfo")
    console.log(forgotInfo)
    
    // 코드 요청
    const [rqustSwitch, setRqustSwitch] = useState(false)
    // 입력받은 코드넘버
    const [rqustAuth, setRqustAuth] = useState('')
    // 입력한 코드넘버
    const [codeNum, setCodeNum] = useState('')
    //마지막 사용자가 찾은 아이디
    const [userId, setUserId] = useState('')
    console.log("rqustAuth")
    console.log(rqustAuth)

    const [agreeRqst, setAgreeRqst] = useState(false)

    // 최종확인
    const [finalCheck, setFinalCheck] = useState(false)

    // 아이디 보여주기
    // const [showId, setShowId] = useState(false)
    
    // 타이머
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const codeNumChange = (e) =>{
        setCodeNum(e.target.value)
        console.log("codeNumChange")
        console.log(e.target.value)
    }
    
    const handleChange = useCallback((e) =>{  
        const {value, name} = e.target;
        
        setForgotInfo({
            ...forgotInfo,
            [name]:value
        })
    },[forgotInfo])

    // 인증번호 요청 버튼 클릭
    const handleCodeSwitch = useCallback((e) =>{
        e.preventDefault()
        console.log("sending Auth number")
        console.log(rqustSwitch)

        setRqustSwitch(!rqustSwitch);
        if(rqustSwitch === true){
            console.log("통과")
        }else if(rqustSwitch === false && forgotInfo.phone === '' && forgotInfo.name === ''){
            console.log("부합하지않음")
            alert("빈칸 내용을 정확히 입력해주세요")
            setRqustSwitch(false);
            return
        }
        axios
        .get(searchEmail + forgotInfo.phone + '&name=' + forgotInfo.name)
        .then((response)=>{
            if(response && response.data){
            const parseJson = JSON.parse(response.data.authId)
            console.log("response.data")
            console.log(parseJson)
            setRqustAuth(parseJson)
            setRqustSwitch(true);
            setMinutes(3);
            console.log(rqustSwitch)
        }
        })
        .catch((error)=>{
            console.log("error log")
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    },[forgotInfo.name, forgotInfo.phone, rqustSwitch])

    //인증번호 입력후 완료 절차
    function handleCFcode() {
        console.log("일단 탔음")
        console.log("codeNum inside")
        console.log(codeNum)
        if (codeNum.length !== 6 && agreeRqst === false) {
            console.log("return까지 왔음")
            alert("정확한 수신인증번호를 입력해주세요.")
            return;
        }
        if (minutes === 0 && seconds === 0) {
            return;
        }
        else {
            console.log("통과")
            setRqustSwitch(true)
            setAgreeRqst(true)
        }
        axios
          .post(sendEmail,{
            authId : rqustAuth, 
            code : codeNum, 
            phone : forgotInfo.phone, 
            name :  forgotInfo.name
        } )
          .then((response) => {
            if(response && response.data){
                const findId = response.data.email
                setUserId(findId)
            }
            setAgreeRqst(true)
            setFinalCheck(true)
          })
          .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })



      }
      
    //인증번호 발송 후 입력과정
    const pressCertiBtn = (
        <>
            <div>
                <input
                    // className="modal-input"
                    type='text'
                    name="codeNum"
                    value={codeNum}
                    onChange={codeNumChange}
                />
               
                <button type="submit" onClick={handleCodeSwitch}>다시인증</button>
                <div className="footer">
                    <div className="modal-timer">
                        인증번호가 발송되었습니다 
                        <div>(남은 시간 {minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds})
                        </div>
                    </div>
                </div>

                <button type="submit" onClick={handleCFcode} style={{float:'right',width:'100%',backgroundColor:"cyan"}}>다음</button>
            </div>
        </>
    )
    //인증요청 발송 전
    const notPressCertiBtn = (
        <button onClick={handleCodeSwitch} style={{float:'right'}}> 인증요청 </button>
    )

    const makeInputElement = () =>{
        return(
            <>
                <div>
                    <h3 style={{display:'flex',justifyContent:'center'}}>
                        Did you forgot own ID?
                    </h3>
                    <div className="mid-area">
                        <input
                            className="sign-input" 
                            id="name"
                            name="name"
                            type="text" 
                            placeholder="사용자 이름 입력" 
                            value={forgotInfo.name}
                            onChange={handleChange}
                        />

                        <input 
                            className="sign-input"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="휴대폰번호 입력"
                            value={forgotInfo.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{height:100}}>
                        {rqustSwitch===true ? pressCertiBtn : notPressCertiBtn}
                    </div>
                </div>
            </>
        )
    }
   
  
    
    
    
    //최종 아이디 보여지는부분
    const makeReqElement = () =>{
        return(
            <>
            <div>
                <h3 style={{display:'flex',justifyContent:'center'}}>
                    Did you forgot own ID?
                </h3>
                <div className="mid-area" style={{height:150}}>
                    <div>고객님의 아이디를 알려드립니다.</div>
                    {userId}
                </div>
        </div>
        </>
        )
    }


    useEffect(() => {
        const countdown = setInterval(() => {
          if (Number(seconds) > 0) {
            setSeconds(Number(seconds) - 1);
          }
          if (Number(seconds) === 0) {
            if (Number(minutes) === 0) {
              clearInterval(countdown);
            } else {
              setMinutes(Number(minutes) - 1);
              setSeconds(59);
            }
          }
        }, 1000);
        return () => clearInterval(countdown);
      }, [minutes, seconds]);


    
    return (
        <>
            <div style={{border:"1px solid"}}>
                <div className="full-screen">
                    <div className="outline">
                        {finalCheck ? makeReqElement() : makeInputElement()}
                        <div>
                            <a href="/login"><button>back to Login</button></a>
                            <a href="/"><button>back to Home</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotId;