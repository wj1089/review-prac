import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userAction';
import validate from './validationInfo';
import moment from 'moment';
import DatePicker from "react-datepicker";
import './login.css';
import "react-datepicker/dist/react-datepicker.css";
// import "http://dmaps.daum.net/map_js_init/postcode.v2.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import LogModal from './LogModal'
import {Modal, Button} from "react-bootstrap"
import DaumPostcode from 'react-daum-postcode';

const Signin = () => {
    const dispatch = useDispatch();
    const [checkAgree, setCheckAgree] = useState(false);
    const [signInput,setSignInput] = useState({
            email:'',
            password:'',
            name:'',
            phone:'',
            address:'',
            addressDetail:'',
            gender:'',
            pswcheck:''
        })

    const {email,password,name, phone,address,gender,addressDetail,pswcheck} = signInput;
    const [birthday, setBirthday] = useState(new Date());
    
    const [error, setError] = useState({})

    const [disabled, setDisabled] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);}
    const handleShow = () => {setShow(true);}

    const handleComplete = (data) => {
        console.log("최상단data")
        console.log(data)

    let fullAddress = data.address;
    let extraAddress = ''; 

      if (data.addressType === 'R') {
        console.log("data")
        console.log(data)

        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      }

        console.log("fullAddress")
        console.log(fullAddress)
        console.log("extraAddress")
        console.log(extraAddress)
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
            address: address,
            addressDetail: addressDetail,
            birthday : moment(birthday).format('YYMMDD'),
            gender: gender,
            phone : phone,
            password : password,
            pswcheck : pswcheck
        };

        if(validate(body)){
            setError(validate(body));
            alert("입력정보을 확인하여 다시 시도해주세요.")
            console.log('진입 막힘')
            return
        }else{
            console.log('진입 성공')
            dispatch(registerUser(body))
            .then((response)=>{
                localStorage.getItem('user')
                alert("정상가입 성공!")
                validate.history.push("/login")
            })
            .catch((error)=>{
                alert(error.response.data.error.message)
            })
        }
    }

    const LogModal = () => {

        // function Postcode (props){
        // const [isAddress, setIsAddress] = useState("");
        // const [isZoneCode, setIsZoneCode] = useState();
        //         console.log("isAddress")
        //         console.log(isAddress)
        //   }
        return (
            <>
            <Button variant="primary" onClick={handleShow}>
                우편번호 찾기
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



    
    // function makeInputElement(){
    //     return(
    //         <div>
    //             <div style={{display:"flex"}}>
    //                 {/* isZoneCode */}
    //                 <input 
    //                     type="text" 
    //                     id="postcode" 
    //                     placeholder="우편번호" 
    //                     address={handleComplete}
    //                 />
    //                 <LogModal  type="button" value="우편번호 찾기"  />
    //             </div>

    //             {/* isAddress */}
    //             <input 
    //                 type="text" 
    //                 id="roadAddress" 
    //                 // onChange={}
    //                 placeholder="도로명주소" 
    //             />
    //         </div>
    //     )
    // }

    


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
                            <input 
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
                            <input 
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
                                {/* isZoneCode */}
                                <input 
                                    type="text" 
                                    id="postcode" 
                                    placeholder="우편번호" 
                                    onChange={handleComplete}
                                    value={data=>data.target.value}
                                />
                                <LogModal  type="button" value="우편번호 찾기" />
                            </div>

                            {/* isAddress */}
                            <input 
                                type="text" 
                                id="roadAddress" 
                                // onChange={}
                                placeholder="도로명주소" 
                            />
                        </div>



                        {/* <input 
                            className="sign-input" 
                            value={signInput.address} 
                            name="address" 
                            type="text" 
                            placeholder="주소" 
                            onChange={handleInfoChange} 
                        />
                        {error.address && <p>{error.address}</p>}
                        */}
                        {/* <div>
                            <input 
                                className="sign-input" 
                                type="text" 
                                value={signInput.addressDetail} 
                                name="addressDetail" 
                                placeholder="상세주소" 
                                onChange={handleInfoChange} 
                            />
                                {error.addressDetail && <p>{error.addressDetail}</p>}
                        </div> */}


                        <div>
                            <DatePicker
                                className="sign-input" 
                                name="birthday"
                                value={birthday}
                                selected={birthday}     
                                onChange={date => setBirthday(date)}
                                // customInput={<HandleDatePick/>}
                            />
                        </div>
                        
                        <div 
                            className="sign-input"  
                            style={{display:"flex", 
                            justifyContent:'center', 
                            alignItems:'center'}}   
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
                                 {/* onClick={onError} */}
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