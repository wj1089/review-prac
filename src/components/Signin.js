import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userAction';
import validate from './validationInfo';
import moment from 'moment';
import DatePicker from "react-datepicker";
import './login.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from "react-bootstrap"
import DaumPostcode from 'react-daum-postcode';
import PasswordMask from 'react-password-mask';

const Signin = (props) => {
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

    const {email,password,name, phone,gender,pswcheck,addressDetail} = signInput;
    const [birthday, setBirthday] = useState(new Date());
    const [isAddress, setIsAddress] = useState('');

    const [show, setShow] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState({})

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
        // checkValidate를 등록하여 
        // validation이 통과할 경우,다음 단계로 진입을 하는 형식

        let checkValidate = validate(body);
        if(!checkValidate.success){
            alert(checkValidate.message.content);
        }
        console.log('진입 성공')
        dispatch(registerUser(body))
        .then((response)=>{
            console.log("response")
            console.log(response)
            localStorage.getItem('user')
            alert("정상가입 성공!")
            props.history.push("/login")
        })

        .catch((error)=>{
            console.log("error log")
            alert(error.response.data.error.message)
        })
    }

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
                                value={signInput.name} name="name" 
                                type="text" 
                                placeholder="이름" 
                                onChange={handleInfoChange} 
                            />
                                {error.name && <p>{error.name}</p>}
                        </div>

                        <div>
                            <input 
                                className="sign-input"
                                value={signInput.phone}
                                name="phone"
                                type="tel"
                                placeholder="휴대폰"
                                onChange={handleInfoChange}
                            />
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
                                <LogModal  type="button" value="도로명주소 찾기" />
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


