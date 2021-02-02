import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userAction';
import './login.css';

const Signin = (props) => {
    const dispatch = useDispatch();
    const [signInput,setSignInput] = useState({
        email:'',
        password:'',
        checkPw:'',
        name:'',
        phone:'',
        address:'',
        addressDetail:'',
        gender:''
    })
    const {email,password,checkPw,name,
        phone,address,addressDetail,gender} = signInput;
        
    // const [birth,setBirth] = useState('')
    console.log("signInput")
    console.log(signInput)

    const onChange = (e) =>{
        const {value, name} = e.target;

        setSignInput({
            ...signInput,
            [name]:value
        })
    }



    const onSubmit = (e) =>{
        e.preventDefault()
        //바디라는 이름으로 전달내용을 묶는다.
        let body = {
            email : email,
            password : password,
            name : name,
            address: address,
            addressDetail: addressDetail,
            phone : phone,
            gender: gender
        };
        //계정 생성 도중 비밀번호가 다를 경우 alert를 띄운다 
        if(password === checkPw){
            dispatch(registerUser(body)).then((res)=>{
                console.log("res")
                console.log(res)
                alert("정상가입 성공!")
                props.history.push("/login")
            })
        }else{
            alert("비밀번호가 일치하지 않습니다");
        }
        console.log("Submit")
    }


    return (
        <>
            <div className="full-screen">
                <div className="outline">

                    <header><h2> Please Sign Account </h2></header>

                    <div className="mid-area">
                        <input className="sign-input" value={email} name="email" type="text" placeholder="아이디" onChange={onChange} />
                        <input className="sign-input" value={password} name="password" type="text" placeholder="비밀번호" onChange={onChange} />
                        <input className="sign-input" value={checkPw} name="checkPw" type="text" placeholder="비밀번호 확인" onChange={onChange} />
                        <input className="sign-input" value={name} name="name" type="text" placeholder="이름" onChange={onChange} />
                        <input className="sign-input" value={phone} name="phone" type="text" placeholder="휴대폰" onChange={onChange} />
                        <input className="sign-input" value={address} name="address" type="text" placeholder="주소" onChange={onChange} />
                        <input className="sign-input" value={addressDetail} name="addressDetail" type="text" placeholder="주소" onChange={onChange} />
                        <input className="sign-input" value={gender} name="gender" type="text" placeholder="성별" onChange={onChange} />

                        {/* <div>
                            <input className="idpw-input" type="checkbox" >남</input>
                            <input className="idpw-input" type="checkbox" >녀</input>
                            <input className="idpw-input" type="checkbox" >선택안함</input>
                        </div> */}
                        {/* <input className="sign-input" value={birth} type="text" placeholder="생년월일" onChange={signInput} /> */}
                    </div>
                    <a href="/login"><button>back to Login</button></a>
                    <a href="/"><button>back to Home</button></a>
                    <form onSubmit={onSubmit}>
                        <button type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default withRouter(Signin);