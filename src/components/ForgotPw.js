import React from 'react';

const ForgotPw = () => {
    return (
       <>
            <div style={{display:'flex',justifyContent:'center', border:"1px solid"}}>
                <div className="full-screen">
                    <div className="outline">
                    <h4 style={{display:'flex',justifyContent:'center'}}>
                        Did you forgot own PW?
                    </h4>
                        <div className="mid-area">
                            <div>
                                <input 
                                className="sign-input" 
                                id="email"
                                name="email" 
                                type="email" 
                                placeholder="아이디" 
                                />
                            </div>

                            <div>
                                <input 
                                className="sign-input" 
                                id="password"
                                name="password" 
                                type="text" 
                                placeholder="비밀번호" 
                                />
                            </div>

                            <div>
                                <input 
                                className="sign-input" 
                                id="pswcheck"
                                name="pswcheck" 
                                type="text" 
                                placeholder="비밀번호 확인"
                                />
                            </div>

                            <div>
                                <input 
                                className="sign-input" 
                                type="text" 
                                placeholder="이름" 
                                />
                            </div>

                            <div>
                                <input 
                                className="sign-input"
                                name="phone"
                                type="tel"
                                placeholder="휴대폰"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{display:'flex',justifyContent:'center'}}>
                    <a href="/login"><button>back to Login</button></a>
                    <a href="/"><button>back to Home</button></a>
                </div>
            </div>
       </>
    );
};

export default ForgotPw;