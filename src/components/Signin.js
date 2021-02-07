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
            // gender:'',
            // birthday : ''
        })
    const [gender,setGender] = useState('')
    const [birthday, setBirthday] = useState(new Date());
    const [pswcheck,setPswcheck]= useState('')
    const [error, setError] = useState({})

    console.log("gender")
    console.log(gender)

    const {email,password,name, phone,address,
        addressDetail} = signInput;
    
    const onError =(error)=>{
        alert(error.response.data.error.message)
    }

    const handleCheckYn = ()=>{
        setCheckAgree(!checkAgree)
    }

    const handleGdrCheck =()=>{
        setSignInput(signInput.gender)
        console.log("signInput.gender")
        console.log(signInput.gender)
    }

    const handleInfoChange = (e) =>{  
        const {value, name} = e.target;
        setSignInput({
            ...signInput,
            [name]:value
        })
    }
    const handlePwsChange  = (e) =>{
        setPswcheck(e.target.value)
        console.log("handlePwsChange")
        console.log(pswcheck)
    }

    const HandleDatePick = ({ value, onClick }) => {
        // console.log("birthday")
        // console.log(birthday)
        // console.log(moment(birthday).format('YYMMDD'))
        // console.log("value")
        // console.log(value)
        // console.log(moment(value).format('YYMMDD'))
        // console.log("date")
        const date = moment(value).format('YYMMDD');
        // console.log(date)
        
        
        return(
            <button className="example-custom-input" onClick={onClick}>
            {date}
        </button>
        )
    }
        const handleMailCheck = (e)=>{
            setGender(e.target.value)
        }
        const handleFemailCheck = (e)=>{
            setGender(e.target.value)
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
        if(pswcheck === signInput.password){
            console.log("비밀번호 통과")
            setPswcheck(pswcheck)
        }else {
            console.log("pswcheck")
            console.log(pswcheck)
            alert("비밀번호가 맞지 않습니다 다시 입력해주세요!")
            return
        }
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
                                value={pswcheck} 
                                name="pswcheck" 
                                // id="pswcheck"
                                type="text" 
                                placeholder="비밀번호 확인" 
                                onChange={handlePwsChange} 
                                />
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
                        {/* <div>
                            <input 
                                className="sign-input" 
                                value={signInput.gender}
                                name="Man" 
                                placeholder="성별" 
                                onChange={handleInfoChange} 
                            />
                            {error.gender && <p>{error.gender}</p>}
                        </div> */}
                        <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                            <div>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="male" 
                                    // checked={gender.value === "male" ? true : false} 
                                    onChange={handleMailCheck} 
                                />
                                Male
                            </div>
                            
                            <div>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    value="female" 
                                    // checked={gender.value === "femail" ? true : false}
                                    onChange={handleFemailCheck} 
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