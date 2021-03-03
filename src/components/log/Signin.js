import React, { useState,useCallback } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../actions/userAction';
import validate from '../validationInfo';
import moment from 'moment';
import DatePicker from "react-datepicker";
import './login.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from "react-bootstrap"
import DaumPostcode from 'react-daum-postcode';
import PasswordMask from 'react-password-mask';

const Signin = (props) => {


    const searchPhone = 'https://childsnack-test.appspot.com/_ah/api/user/v1/getAuthNum?phone=';
    const checkAuthNum = 'https://childsnack-test.appspot.com/_ah/api/user/v1/checkAuthNum'

    const dispatch = useDispatch();
    const [checkAgree, setCheckAgree] = useState(false);
    const [signInput,setSignInput] = useState({
            email:'',
            password:'',
            name:'',
            phone:'',
            gender:'',
            pswcheck:'',
            addressDetail:''
        })
    console.log("signInput")
    console.log(signInput)

    const {email,password,name, phone,gender,pswcheck,addressDetail} = signInput;
    const [birthday, setBirthday] = useState(new Date());
    const [isAddress, setIsAddress] = useState('');

    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState({})
    const [show, setShow] = useState(false);

 
    // 코드 요청
    const [rqustSwitch, setRqustSwitch] = useState(false)
    // 입력받은 코드넘버
    const [rqustAuth, setRqustAuth] = useState('')
    // 입력한 코드넘버
    const [codeNum, setCodeNum] = useState('')
    const [agreeRqst, setAgreeRqst] = useState(false)
    // 최종확인
    const [finalCheck, setFinalCheck] = useState(false)




    const codeNumChange = (e) =>{
        setCodeNum(e.target.value)
        console.log("codeNum")
        console.log(codeNum)
    }

    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}

    const handleComplete = (data) => {
        let fullAddress = data.roadAddress;
        let extraAddress = ''; 

        if (data.addressType === 'R') {
            extraAddress += data.bname;
            }  if (data.bname !== '') {
            
            if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setIsAddress(fullAddress)
        setShow(false)
    }


    const handleCheckYn = ()=>{
        setCheckAgree(!checkAgree)
        setDisabled(false)
    }

    const handleInfoChange = (e) =>{  
        const {value, name} = e.target;
        setSignInput({
            ...signInput,
            [name]:value
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        let body = {
            email : email,
            name : name,
            address: isAddress,
            addressDetail: addressDetail,
            birthday : moment(birthday).format('YYMMDD'),
            gender: gender,
            phone : phone,
            password : password,
            pswcheck : pswcheck
        };
        if(finalCheck === false){
            alert("인증절차를 다시 진행해주세요.")
            return
        }
        // checkValidate를 등록하여 
        // validation이 통과할 경우,다음 단계로 진입을 하는 형식

        let checkValidate = validate(body);
        if(!checkValidate.success){
            alert(checkValidate.message.content);
            return
        }
        console.log('진입 성공')
        dispatch(registerUser(body))
        .then((response)=>{
            console.log("response")
            console.log(response)
            localStorage.getItem('user',JSON.stringify(response.payload))
            alert("정상가입 성공!")
            props.history.push("/login")
        })

        .catch((error)=>{
            console.log("error log")
            alert(error.response.data.error.message)
        })
    }
    
    // 인증번호 요청 버튼 클릭
    const handleCodeSwitch = useCallback(() =>{
        // e.preventDefault()
        setRqustSwitch(true)
        console.log("sending Auth number")
        console.log(rqustSwitch)
        // setRqustSwitch(rqustSwitch);

        if(signInput.phone.length > 11 || signInput.phone.length < 10){
            alert("전화번호 입력이 틀림")
            setRqustSwitch(false);
            console.log(rqustSwitch)
            return
        }else{
            setRqustSwitch(true);
        }
        axios
        .get(searchPhone+signInput.phone)
        .then((response)=>{
            if(response && response.data){
            const parseJson = JSON.parse(response.data.authId)
            console.log("response.data")
            console.log(parseJson)
            setRqustAuth(parseJson)
            // setRqustSwitch(true);
            // setMinutes(3);
            console.log(rqustSwitch)
        }
        })
        // .catch((error)=>{
        //     console.log("error log")
        //     console.log(error.response.data.error.message)
        //     alert(error.response.data.error.message)
        // })
    },[])

     //인증번호 입력후 완료 절차
     function handleCFcode() {
        if (codeNum.length !== 6 && agreeRqst === false) {
            console.log("return까지 왔음")
            alert("인증번호 틀림")
            return;
        }
        // if (minutes === 0 && seconds === 0) {
        //     return;
        // }
        // else {
        //     console.log("통과")
        //     setRqustSwitch(true)
        //     setAgreeRqst(true)
        // }
        axios
          .post(checkAuthNum,{
            authId : rqustAuth, 
            code : codeNum
        } )
          .then((response) => {
            if(response && response.data.code === "1"){
                console.log("완료")
                console.log(response)
                alert("인증 성공!")
                setAgreeRqst(true)
                setFinalCheck(true)
            }
          })
          .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    }
    console.log("signInput")
    console.log(signInput)




    // forgotInfo.name, forgotInfo.phone, rqustSwitch

    const LogModal = () => {
        return (
            <>
            <Button variant="primary" onClick={handleShow}>
                주소 찾기
            </Button>
            <Modal 
                show={show} 
                data-toggle="modal"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DaumPostcode onComplete={handleComplete}/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>   
            </>
        );
    };
   
    return (
        <>
            <div className="full-screen">
                <div className="outline">
                    <header><h2> Please Sign Account </h2></header>
                    <div className="mid-area">
                        <div>
                            <input 
                                className="sign-input" 
                                id="email"
                                name="email" 
                                type="email" 
                                placeholder="아이디" 
                                value={signInput.email} 
                                onChange={handleInfoChange} 
                            />
                            {error.email && <p>{error.email}</p>}
                        </div>

                        <div>
                            <PasswordMask 
                                className="sign-input" 
                                id="password"
                                name="password" 
                                type="text" 
                                placeholder="비밀번호" 
                                value={signInput.password} 
                                onChange={handleInfoChange} 
                            />
                            {error.password && <p>{error.password}</p>}
                        </div>

                        <div>
                            <PasswordMask 
                                className="sign-input" 
                                id="pswcheck"
                                name="pswcheck" 
                                type="text" 
                                placeholder="비밀번호 확인"
                                value={signInput.pswcheck}
                                onChange={handleInfoChange}
                            />
                                {error.pswcheck && <p>{error.pswcheck}</p>}
                        </div>

                        <div>
                            <input 
                                className="sign-input" 
                                value={signInput.name} 
                                name="name" 
                                type="text" 
                                placeholder="이름" 
                                onChange={handleInfoChange} 
                            />
                                {error.name && <p>{error.name}</p>}
                        </div>




















                        <div style={{}}>
                            <input 
                                className="sign-input"
                                value={signInput.phone}
                                name="phone"
                                type="tel"
                                placeholder="휴대폰"
                                onChange={handleInfoChange}
                            />
                            <button type="button" onClick={handleCodeSwitch}>인증하기</button>
                            
                            {rqustSwitch === false &&
                                (
                                    <div>

                                    </div>
                                )
                            }
                            {rqustSwitch === true &&
                                (
                                    <>
                                        <input 
                                            type='text'
                                            name="codeNum"
                                            value={codeNum}
                                            onChange={codeNumChange}
                                            style={{width:"100%",border:"1px solid"}}
                                            placeholder="인증번호를 입력해주세요."
                                        />
                                            
                                        <div style={{width:"100%",border:"1px solid"}}>
                                            <button type="button" onClick={handleCodeSwitch}>다시전송</button>
                                            <button type="submit" onClick={handleCFcode}>확인</button>
                                        </div>
                                    </>
                                )
                            }
                            {error.phone && <p>{error.phone}</p>}
                        </div>















                        {/* 다음주소 API */}
                        <div>
                            <div style={{display:"flex"}}>
                                <input 
                                    className="sign-input" 
                                    type="text" 
                                    id="address" 
                                    name="address"
                                    placeholder="도로명주소"
                                    value={isAddress}
                                    selected={isAddress}
                                />
                                <LogModal type="button" value="도로명주소 찾기" />
                                {error.address && <p>{error.address}</p>}
                            </div>

                            <input 
                                className="sign-input" 
                                type="text" 
                                id="addressDetail" 
                                name="addressDetail"
                                placeholder="상세주소" 
                                value={signInput.addressDetail}
                                onChange={handleInfoChange}
                            />

                            {error.addressDetail && <p>{error.addressDetail}</p>}
                        </div>

                        <div>
                            <DatePicker
                                className="sign-input"
                                name="birthday"
                                value={birthday}
                                selected={birthday}     
                                onChange={date => setBirthday(date)}
                            />
                        </div>
                        
                        <div 
                            className="sign-input"  
                            style={{display:"flex", 
                            justifyContent:'center', 
                            alignItems:'center',
                            backgroundColor:'white'
                            }}   
                        >
                            <div>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="male" 
                                    onChange={handleInfoChange} 
                                />
                                Male
                            </div>
                            
                            <div>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="female" 
                                    onChange={handleInfoChange} 
                                />
                                Female
                            </div>
                            {error.gender && <p>{error.gender}</p>}
                        </div>
                    </div>
                    
                    <div style={{display:"flex"}}>
                        <input style={{width:30, height:30}} onClick={handleCheckYn} type="checkbox" /> 
                        <p>개인정보 수집/이용에 동의합니다.</p>
                    </div>

                    <div style={{display:"flex", paddingLeft:50}}>
                        <a href="/login"><button >back to Login</button></a>

                        {(checkAgree === true) && (
                            <form onSubmit={onSubmit} style={{marginLeft:50}}>
                                <button type="submit" value="submit" >Sign in</button>
                            </form>
                            )
                        }
                        {(checkAgree === false) && (
                            <form style={{marginLeft:50}}>
                                <button type="submit" value="submit" disabled={!disabled}>Sign in</button>
                            </form>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Signin);


