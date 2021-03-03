import React from 'react';
import "./userinfo.css"

const CheckPw = ({history}) => {

    const goBack = ()=>{
        history.goBack()
    }

    return (
        <>
            <div className="info-topicArea">
                <button onClick={goBack}>뒤로</button>
                <div className="info-topic">회원정보수정</div>
            </div>
            <div style={{textAlign:"left",padding :"0 16px 0 16px"}}>
                <div className="check-title">비밀번호 확인</div>
                <p className="info-descrip">회원님은 정보를 보호하기 위해 비밀번호를 다시 한 번 확인해주세요.</p>
                <div className="user-infoContent">
                    <div 
                        // value={userInfo.address}
                        type="text" 
                        placeholder="주소" 
                        className="user-textbox"
                    >
                        이메일
                    </div>
                </div>

                <div className="user-infoContent">
                    <div 
                            // value={userInfo.address}
                            type="text" 
                            placeholder="주소" 
                            className="user-textbox"
                        >
                            비밀번호 
                    </div>
                </div>

                <div className="user-infoBtn">
                    <a href="./changePw">
                        <div  type="button" className="user-btnbox">
                            확인
                        </div>
                    </a>
                </div>

            </div>
        </>
    );
};

export default CheckPw;