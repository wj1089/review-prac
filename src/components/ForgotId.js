import React, {useState} from 'react';
import axios from 'axios';
import validate from './validationInfo';

const ForgotId = (props) => {
    const phoneCode = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAuthNum?phone=%7bparam1%7d";
    
    const [forgotInfo,setForgotInfo] = useState({
        name : '',
        phone : ''
    })

    const {name,phone} = forgotInfo

    const [rqustSwitch, setRqustSwitch] = useState(true)
    // const [rqustAuth, setRqustAuth] = useState('')
    // const [codeNum, setCodeNum] = useState('')

    const handleChange = (e) =>{  
        const {value, name} = e.target;
        console.log(e.target)
        setForgotInfo({
            ...forgotInfo,
            [name]:value
        })
    }

    // setRqustSwitch(rqustSwitch)
    // 인증번호 요청 버튼 클릭
    const hanldeCodeSwitch = (e) =>{
        e.preventDefault()
        console.log(e)
        console.log("sending Auth number")
        console.log(rqustSwitch)
        const body = {
            name : '',
            phone : ''
        }

        let checkValidate = validate(body);
        console.log("checkValidate")
        console.log(checkValidate)

        if(!checkValidate.success){
            console.log("success")
            console.log(checkValidate)
            alert(checkValidate.message.content);
            return
        }

        axios
        .get(phoneCode)
            console.log("진입")
        // .then((response)=>{
        //     console.log("response")
        //     console.log(response)
        //     if(response && response.data){
        //         const parseJson = JSON.parse(response.data.authId);
        //         setRqustAuth(parseJson)
        //         console.log("inside then")
        //     }
        // })
    }


    const requestAuth = () =>{
        setRqustSwitch(rqustSwitch)
    }  


    //버튼 클릭시 아래 인증번호 <div>영역 발생 element
    const mackReqElement = () =>{
        
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

                            <button onClick={hanldeCodeSwitch} style={{float:'right'}}> 인증요청 </button>
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