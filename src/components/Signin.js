import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userAction';
import axios from 'axios';
import validate from './validationInfo';
import moment from 'moment';
import DatePicker from "react-datepicker";
import './login.css';
import "react-datepicker/dist/react-datepicker.css";

// import useFrom from './useForm';
// import { useDispatch } from 'react-redux';


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
            // birthday : ''
        })
    const [birthday, setBirthday] = useState(new Date());
    const [error, setError] = useState({})
    
    const {email,password,name, phone,address,
        addressDetail,gender} = signInput;
    
    const onError =(error)=>{
        alert(error.response.data.error.message)
    }

    const handleCheckYn = ()=>{
        setCheckAgree(!checkAgree)
    }


    const handleInfoChange = (e) =>{  
        const {value, name} = e.target;
        setSignInput({
            ...signInput,
            [name]:value
        })
    }

    const HandleDatePick = ({ value, onClick }) => {
        // console.log("birthday")
        // console.log(birthday)
        // console.log(moment(birthday).format('YYMMDD'))
        console.log("value")
        console.log(value)
        // console.log(moment(value).format('YYMMDD'))
        console.log("date")
        const date = moment(value).format('YYMMDD');
        console.log(date)
        
    return(
        <button className="example-custom-input" onClick={onClick}>
            {date}
        </button>
        )
    }
    // );

    const onSubmit = (e) =>{
        console.log("Submit event")
        console.log(e)
        e.preventDefault()
        let body = {
            email : email,
            name : name,
            address: address,
            addressDetail: addressDetail,
            birthday : birthday,
            gender: gender,
            phone : phone,
            password : password
        };
   
        setError(validate(body));
        // console.log("setError")
        // console.log(setError)
            dispatch(registerUser(body))
            .then((response)=>{
                localStorage.getItem('user')
                // console.log("response")
                // console.log(response)
                alert("정상가입 성공!")
                validate.history.push("/login")
            })
            .catch((error)=>{
                alert(error.response.data.error.message)
            })
        
        console.log("Submit")
    }

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
                            type="text" 
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
                                value={signInput.checkPw} 
                                name="checkPw" 
                                id="checkPw"
                                type="text" 
                                placeholder="비밀번호 확인" 
                                onChange={handleInfoChange} 
                                />
                            {error.checkPw && <p>{error.checkPw}</p>}
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
                        <div>
                            <input 
                                className="sign-input" 
                                value={signInput.address} 
                                name="address" 
                                type="text" 
                                placeholder="주소" 
                                onChange={handleInfoChange} 
                            />
                            {error.address && <p>{error.address}</p>}
                        </div>

                        <div>
                            <input 
                            className="sign-input" 
                            value={signInput.addressDetail} 
                            name="addressDetail" 
                            type="text" 
                            placeholder="상세주소" 
                            onChange={handleInfoChange} />
                            {error.addressDetail && <p>{error.addressDetail}</p>}
                        </div>
                        <div>
                            {/* <input 
                            className="sign-input" 
                                value={signInput.value} 

                            name="birthday" 
                            type="text" 
                            placeholder="생년월일" 
                            onChange={handleInfoChange} /> */}
                            {/* {error.birthday && <p>{error.birthday}</p>} */}

                            <DatePicker
                                value={birthday}
                                selected={birthday}
                                onChange={HandleDatePick}
                                customInput={<HandleDatePick/>}
                            />

                        </div>
                        {/* checked={gender === "Man"} */}
                        <div>
                            <input 
                                className="sign-input" 
                                value={signInput.gender}
                                name="Man" 
                                placeholder="성별" 
                                onChange={handleInfoChange} 
                            />
                            {error.gender && <p>{error.gender}</p>}
                        </div>

                        
                        {/* <h1>checkbox : {checkAgree ? "true" : "false" }</h1> */}
                        {/* <h1>checkbox : {gender}</h1>
                        <div>
                            <label style={{display:"flex"}}>
                                <input className="sign-input" checked={gender === "Man"} value={"Man"} name="gender" type="checkbox" placeholder="성별"  onChange={(e)=>{handleInfoChange()}} />
                                남
                            </label>
                            <label style={{display:"flex"}}>
                                <input className="sign-input" checked={gender === "Woman"} value={"Woman"} name="gender" type="checkbox" placeholder="성별"  onChange={(e)=>{handleInfoChange()}} />
                                여
                            </label>
                        </div> */}
                    </div>
                    
                    <div style={{display:"flex"}}>
                        <input style={{width:30, height:30}} onClick={handleCheckYn} type="checkbox" /> 
                        <p>개인정보 수집/이용에 동의합니다.</p>
                    </div>

                    <div style={{display:"flex", paddingLeft:50}}>
                        <a href="/login"><button >back to Login</button></a>

                        {(checkAgree === true) && (
                            <form onSubmit={onSubmit} style={{marginLeft:50}}>
                                <button type="submit">Sign in</button>
                            </form>
                            )
                        }
                        {(checkAgree === false) && (
                            <form style={{marginLeft:50}}>
                                <button type="submit" onClick={onError}>Sign in</button>
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