import React, { useState } from 'react';
import './login.css';

const Signin = () => {

    const [signInput,setSignInput] = useState({
        signId:'',
        signPw:'',
        checkPw:'',
        signName:'',
        signEmail:'',
        signPhone:'',
        signAdres:'',
        gender:'',
        birth:''
    })
    const {signId,signPw,checkPw,signName,signEmail,
        signPhone,signAdres,gender,birth} = signInput;

    // const [birth,setBirth] = useState('')

    const onChange = (e) =>{
        const {value, name} = e.target;

        setSignInput({
            ...signInput,
            [name]:value
        })
        console.log("e.target")
        console.log(e.target)
    }

    return (
        <>
            <div className="full-screen">
                <div className="outline">

                    <header><h1>Welcome to ~~ Please Signin</h1></header>

                    <div className="mid-area">
                        <input className="sign-input" value={signId} name="signId" type="text" placeholder="아이디" onChange={onChange} />
                        <input className="sign-input" value={signPw} name="signPw" type="text" placeholder="비밀번호" onChange={onChange} />
                        <input className="sign-input" value={checkPw} name="checkPw" type="text" placeholder="비밀번호 확인" onChange={onChange} />
                        <input className="sign-input" value={signName} name="signName" type="text" placeholder="이름" onChange={onChange} />
                        <input className="sign-input" value={signEmail} name="signEmail" type="text" placeholder="이메일" onChange={onChange} />
                        <input className="sign-input" value={signPhone} name="signPhone" type="text" placeholder="휴대폰" onChange={onChange} />
                        <input className="sign-input" value={signAdres} name="signAdres" type="text" placeholder="주소" onChange={onChange} />
                        {/* <div>
                            <input className="idpw-input" type="checkbox" >남</input>
                            <input className="idpw-input" type="checkbox" >녀</input>
                            <input className="idpw-input" type="checkbox" >선택안함</input>
                        </div> */}
                        <input className="sign-input" value={birth} type="text" placeholder="생년월일" onChange={signInput} />
                    </div>
                    <a href="/login"><button>back to Login</button></a>
                    <a href="/"><button>back to Home</button></a>
                </div>
            </div>
        </>
    );
};

export default Signin;