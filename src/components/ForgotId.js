import React, {useCallback, useState} from 'react';
import axios from 'axios';
import validate from './validationInfo';
import PropTypes from 'prop-types';

const ForgotId = () => {
    const adrsUrl = ""

    const phoneCode = adrsUrl +"/_ah/api/user/v1/getAuthNum?phone=%7bparam1%7d";
    const searchEmail = 'https://childsnack-test.appspot.com/_ah/api/user/v1/findEmail?phone=';
    
    const sendEmail = adrsUrl + '/_ah/api/user/v1/sendEmail';
    const searchPass = adrsUrl + '/_ah/api/user/v1/findPassword?email=';
    const sendPassword = adrsUrl + '/_ah/api/user/v1/sendPassword';


    const [forgotInfo,setForgotInfo] = useState({
        name : '',
        phone : ''
    })

    const [rqustSwitch, setRqustSwitch] = useState(true)
    const [rqustAuth, setRqustAuth] = useState(false)
    const [codeNum, setCodeNum] = useState('')

    const [finalCheck, setFinalCheck] = useState(false)

    const [show, setShow] = useState(false);

    const handleShow = useCallback(()=>{
        setFinalCheck(false)
        setShow(true)
    })

    const handleClose = () => {setShow(false);}

    const codeNumChange = () =>{
        setCodeNum(codeNum)
    }

    console.log("codeNum")
    console.log(codeNum)

    const handleChange = (e) =>{  
        const {value, name} = e.target;
        setForgotInfo({
            ...forgotInfo,
            [name]:value
        })
    }

    // 인증번호 요청 버튼 클릭
    const hanldeCodeSwitch = (e) =>{
        e.preventDefault()
        console.log("sending Auth number")
        console.log(rqustSwitch)
        
        if(rqustSwitch === false){
            console.log(rqustSwitch)
            setFinalCheck(false);
            return
        }
        axios
        .get(adrsUrl + searchEmail + forgotInfo.phone + '&name=' + forgotInfo.name)
        .then((response)=>{
            // const parseJson = JSON.parse(response.data.  )
            console.log("response")
            console.log(response)
            setRqustAuth(rqustAuth)
            setFinalCheck(true);

        })
        .catch((error)=>{
            console.log("error log")
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    }


    const makeInputElement = () =>{
        return(
            <>
                <button onClick={hanldeCodeSwitch} style={{float:'right'}}> 인증요청 </button>


            </>
        )
    }


    //버튼 클릭시 아래 인증번호 <div>영역 발생 element
    const makeReqElement = () =>{
        return(
            <>
            <div>
                <input
                    // className="modal-input"
                    type='text'
                    onChange={codeNumChange}
                    value={codeNum}
                />
                {codeNum.length !== 6 &&(
                    <button type="button">인증</button>
                )
                }
               
            </div>
            <div className="footer">
                <div className="modal-timer">
                    인증번호가 발송되었습니다 
                    {/* (남은 시간 {minutes}: */}
                    {/* {seconds < 10 ? `0${seconds}` : seconds}) */}
                    
                </div>
            </div>
        </>
        )
    }

    function handleCFcode() {
        if (codeNum.length !== 6) {
          return;
        }
        // if (minutes === 0 && seconds === 0) {
        //   return;
        // }
        axios
          .post(phoneCode, { authId: rqustAuth, code: codeNum })
          .then((response) => {
            if (response && response.data.code === '1') {
              handleClose();
            }
          });
      }
    //인증번호 입력후 다음 전송
    const nextSubmit = () =>{
        console.log("next Submit on")

    }


    return (
        <>
            <div style={{height:'350px', display:'flex',justifyContent:'center', border:"1px solid"}}>
                <div className="full-screen">
                    <div className="outline">
                    <h3 style={{display:'flex',justifyContent:'center'}}>
                        Did you forgot own ID?
                    </h3>
                        <div className="mid-area" style={{height:'200px'}}>
                            <div>
                                <input 
                                    className="sign-input" 
                                    id="name"
                                    name="name"
                                    type="text" 
                                    placeholder="사용자 이름 입력" 
                                    value={forgotInfo.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
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
                            
                            <div>
                                {/* <button onClick={hanldeCodeSwitch} style={{float:'right'}}> 인증요청 </button> */}
                                {finalCheck ? makeReqElement() : makeInputElement()}

                            </div>

                            <button onClick={nextSubmit} style={{float:'right',width:'100%'}}>다음</button>

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

export default ForgotId;

    ForgotId.propTypes = {
        
    };

    ForgotId.defaultTypes = {
        
    };
    