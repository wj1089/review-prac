import React, { useState } from 'react';
import './login.css';

const Signin = () => {

    const [signId, setSignId] = useState('');
    const [signPw, setSignPw] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const [signName, setName] = useState('');
    const [signEmail, setEmail] = useState('');
    const [signPhone, setPhone] = useState('');
    const [signAdres, setAdres] = useState('');
    const [gender,setGender] = useState('')
    const [birth,setBirth] = useState('')

    const changeId = e =>{
        setSignId(e.target.value);
    }
    const changePw = e =>{
        setSignPw(e.target.value);
    }



    return (
        <>
            <div className="full-screen">
                <div className="outline">

                    <header><h1>Welcome to ~~ Please Signin</h1></header>

                    <div className="mid-area">
                        <input className="idpw-input" value={signId} type="text" placeholder="아이디" onChange={changeId} />
                        <input className="idpw-input" value={signPw} type="text" placeholder="비밀번호" onChange={changePw} />
                        <input className="idpw-input" value={checkPw} type="text" placeholder="비밀번호 확인" onChange={changePw} />
                        <input className="idpw-input" value={signName} type="text" placeholder="이름" onChange={changePw} />
                        <input className="idpw-input" value={signEmail} type="text" placeholder="이메일" onChange={changePw} />
                        <input className="idpw-input" value={signPhone} type="text" placeholder="휴대폰" onChange={changePw} />
                        <input className="idpw-input" value={signAdres} type="text" placeholder="주소" onChange={changePw} />
                        {/* <div>
                            <input className="idpw-input" type="checkbox" >남</input>
                            <input className="idpw-input" type="checkbox" >녀</input>
                            <input className="idpw-input" type="checkbox" >선택안함</input>
                        </div> */}
                        <input className="idpw-input" value={birth} type="text" placeholder="생년월일" onChange={changePw} />
                    </div>
                    
                    <a href="/"><button>back to Login</button></a>
                </div>
            </div>
        </>
    );
};

export default Signin;