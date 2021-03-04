import axios from 'axios';
import { withRouter} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import "./userinfo.css"
import DaumPostcode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';


const UserInfo = ({props,history}) => {
    const userInfomation = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"

    const [clickAction, setClickAction] = useState(false)

    //회원 정보
    const [userInfo, setUserInfo]  = useState('')
    //입력한 주소
    const [isAddress, setIsAddress] = useState('');
     //입력한 주소
     const [isAddressDetail, setIsAddressDetail] = useState('');
    //등록한 번호
    const [phoneInput, setPhoneInput] = useState('')
    //요청받은 코드번호
    const [codeInput, setCodeInput] = useState('');
    //수락여부 
    const [allow,setAllow] = useState(false)
    //상세주소
    const [addDetail,setAddDetail] = useState(false)
    //비밀번호 변경
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [checkPw, setCheckPw] = useState('')
    const [isAuthId, setIsAuthId] = useState('')
     
    const handleClickEvent = () =>{
        setClickAction(!clickAction)
        console.log("clickAction")
        console.log(clickAction)
    }
    
    // const handleAddDetailSwitch = () =>{
    //     setAddDetail(!addDetail)
    //     console.log("addDetail")
    //     console.log(addDetail)
    // }

    //회원정보 진입시 첫화면
    useEffect(()=>{
        axios
        .get(userInfomation,{headers: authHeader()})
        .then((response)=>{
            const userInfo = response.data
            setUserInfo(userInfo)
        })
        .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    },[])
    
    return (
        <>
            <div>
                <div className="info-topicArea">
                    <a href="./mypage"><button>뒤로</button></a>
                    <div className="info-topic">회원정보수정</div>
                </div>

                <div style={{textAlign:"left",padding :"0 16px 0 16px"}}>
                    <hr className="info-boldLine"/>
                    <div className="info-title">회원정보</div>
                    <hr className="info-lightLine"/>
                    <div>
                        {
                            clickAction === false && (
                                <>
                                    <div  className="user-infoContent">
                                        <div 
                                            type="text"
                                            name="name" 
                                            value={userInfo.name} 
                                            className="user-textbox"
                                            placeholder="이름"
                                        >
                                            {userInfo.name}
                                        </div>
                                    </div>

                                    <div className="user-infoContent">
                                        <div 
                                            name="email" 
                                            value={userInfo.email}
                                            className="user-textbox" 
                                            placeholder="계정 이메일" 
                                        >
                                            {userInfo.email}
                                        </div>
                                    </div>
                                    
                                    <div className="user-infoContent">
                                        <div 
                                            type="text" 
                                            placeholder="비밀번호" 
                                            className="user-textbox"
                                        >
                                            {"*******"}
                                        </div>

                                    </div>

                                    <div className="user-infoContent">
                                        <div 
                                            type="text" 
                                            placeholder="전화번호" 
                                            className="user-textbox"
                                        >
                                            {userInfo.phone}
                                        </div>
                                    </div>

                                    <div className="user-infoBtn">
                                        <a href="./checkPw">
                                            <div  type="button" className="user-btnbox">
                                                개인정보 수정
                                            </div>
                                        </a>
                                    </div>

                                    <hr className="info-boldLine" />

                                    <div className="info-title">기본 배송지</div>

                                    <div className="user-infoContent">
                                        <div 
                                            value={userInfo.address}
                                            type="text" 
                                            placeholder="주소" 
                                            className="user-textbox"
                                        >
                                            {userInfo.address}
                                        </div>
                                    </div>
                                    

                                    <div className="user-infoContent">
                                        <div 
                                            value={userInfo.addressDetail}
                                            type="text" 
                                            placeholder="상세주소" 
                                            className="user-textbox"
                                        >
                                            {userInfo.addressDetail}
                                        </div>
                                    </div>

                                    <div className="user-infoBtn">
                                        <a href="./adrsManage">
                                            <div  type="button" className="user-btnbox">
                                                배송지 관리
                                            </div>
                                        </a>
                                    </div>
                                    <hr className="info-boldLine" />
                                    <a href="./myPage"><button>마이페이지</button></a>
                                    <button type="button" onClick={handleClickEvent}>수정하기</button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(UserInfo);