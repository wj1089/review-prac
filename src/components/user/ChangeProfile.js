import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from "../../actions/userAction"
import {Modal, Button} from "react-bootstrap"

const ChangeProfile = ({history}) => {
    const updateInfo = "https://childsnack-test.appspot.com/updateProfile"
    const phoneCodeCheck = "https://childsnack-test.appspot.com/_ah/api/user/v1/checkAuthNum"
    const phoneCode = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAuthNum?phone="
    const exitService = "https://childsnack-test.appspot.com/_ah/api/user/v1/exitService"

    const infoAcount ="https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"



    // //주소 모달 show
    const [addShow, setAddShow] = useState(false)
    //Phone 모달 show
    const [phoneShow, setPhoneShow] = useState(false)
    
    //회원 정보
    const [userInfo, setUserInfo]  = useState('')
    console.log("userInfo")
    console.log(userInfo)

    // //입력한 주소
    // const [isAddress, setIsAddress] = useState('');
    //  //입력한 주소
    //  const [isAddressDetail, setIsAddressDetail] = useState('');
    //등록한 번호
    const [phoneInput, setPhoneInput] = useState('')
    console.log("phoneInput")
    console.log(phoneInput)
    //요청받은 코드번호
    const [codeInput, setCodeInput] = useState('');
    //수락여부 
    const [allow,setAllow] = useState(false)
    //상세주소
    const [addDetail,setAddDetail] = useState(false)
    //비밀번호 변경
    const [newPw, setNewPw] = useState('')
    console.log("newPw")
    console.log(newPw)
    const [checkPw, setCheckPw] = useState('')
    console.log("checkPw")
    console.log(checkPw)
    const [isAuthId, setIsAuthId] = useState('')
    // //회원정보 변경버튼 
    // const [sendClick, setSendClick] = useState(false)
    // //수정완료 버튼
    // const [clickAction, setClickAction] = useState(false)

    const [show, setShow] = useState(false);
    const handleShow = () => {setShow(true)}
    const handleClose = () => {setShow(false)}
    // const handleAddShow = () =>{setAddShow(true)}
    // const handleAddClose = () =>{setAddShow(false)}
    // const handlePhoneShow = () =>{setPhoneShow(true)}
    // const handlePhoneClose = () =>{
    //     setPhoneShow(false)
    //     setSendClick(false)
    // }
    const [notherNum, setNotherNum] = useState(false)
    //마켓팅 동의 버튼
    const [marketing, setMarketing] = useState(false)
    //인증번호 전송 후 하단 input 
    const [requestNum, setRequestNum] =useState(false)

    const handleMarketCheck = () =>{
        setMarketing(!marketing)
    }
    //다른 번호클릭
    const handleNotherNum = () =>{
        setNotherNum(true)
        console.log("다른번호로 인증번호로 변경클릭")
    }
    const handleRqstNum = (e) =>{
        console.log("해당번호로 인증코드를 보냅니다")
    }
    //수정 최종버튼 

    //New Passward
    const newPwChange = (e) =>{
        setNewPw(e.target.value)
    }
    //신규 비밀번호 재입력
    const checkPwChange = (e) =>{setCheckPw(e.target.value)}
    //비밀번호
    // const [agreeSign, setAgreeSign] = useState(false)
    // const [passwordClick, setPasswordClick] = useState(false)
    //상세주소 확인
    const phoneNumChange = (e) =>{
        console.log("phoneCodeChange")
        setPhoneInput(e.target.value)
        console.log(phoneInput)
    }
    //인증코드 입력
    const phoneCodeChange = (e) =>{
        console.log("phoneCodeChange")
        setCodeInput(e.target.value)
        console.log(codeInput)
    }
    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }

    // 인증번호 요청 버튼 클릭
    const handleCodeSwitch = (e) =>{
        e.preventDefault()
        if(phoneInput.length !== 10 && phoneInput.length !== 11 ){
            alert("전화번호를 정확히 입력해주세요")
            return
        }
        axios
        .get(phoneCode + phoneInput)
        .then((response)=>{
            if(response && response.data){
            console.log("정상 전송")
            console.log("response")
            console.log(response)
            const parseJson = JSON.parse(response.data.authId)
            console.log("response.data")
            console.log(parseJson)
            setRequestNum(true)
            setIsAuthId(parseJson)
            // setSendClick(true);
        }
        })
        .catch((error)=>{
            console.log("error log")
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    }

    //핸드폰 인증번호 입력후 완료절차
    function handlePhoneCheck() {
        console.log("최종변경절차까지 왔음")
        if(codeInput.length !== 6 ){
            alert("정확한 수신인증번호를 입력해주세요.")
            return;
        }
        else{
            console.log("통과")
            alert("인증에 성공했습니다!")
        }
        axios
        .post(phoneCodeCheck,{
            authId : isAuthId, 
            code : codeInput, 
            phone : phoneInput, 
            name : userInfo.name,
        })
        .then((response)=>{
            if(response.data.code === "1"){
                console.log(response)
                setAllow(true)
            }
        })
        .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    }

    //변경완료 확인버튼
    const changeSubmit = () =>{
        console.log("최종변경")
        axios
        .post(updateInfo, {
            email : userInfo.eamil, 
            name : userInfo.name,
            password : newPw,
            phone : phoneInput && userInfo.phone,
        }, {headers: authHeader()})

        .then((response)=>{
            console.log("재등록 보냄")
            console.log(response)
            if(response && response.data.code === "1"){
                localStorage.getItem('user',JSON.stringify(response.payload))
                alert("변경이 완료되었습니다")
                console.log( "password : newPw")
                console.log(newPw)
                // props.history.push("/myPage")
                goBack()
            }
        })
        .catch((error)=>{
            console.log("error log")
            console.log(error)
            console.log(error.response)
            alert(error.response)
        })
    }
  
    //회원 탈퇴 
    const handleRemoveId = () =>{
        console.log("탈퇴 시작")
        axios
        .get(exitService,{headers: authHeader()})
        .then((response)=>{
            if(response.data.code === "1"){
                history.push("./Home")
            }
        })
        .catch((error)=>{
            console.log(error.response)
            alert(error.response)
        })
    } 

    //회원탈퇴 모달
    const RemoveModal = () => {
        return (
            <>
                <Button type="button" onClick={handleShow}>회원탈퇴</Button>
                <Modal 
                    show={show} 
                    data-toggle="modal"
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>회원탈퇴를 진행할까요?</h3>
                        <div>
                            <button onClick={handleRemoveId}>진행할께요</button>
                            <button onClick={handleClose}>취소</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>   
            </>
        )
    }
    const phoneCertifiCheck = (
        <>
            {codeInput === '' && (
                <button 
                    style={{
                        width:"48.2%", 
                        fontSize: 16,
                        color: "#ffffff",
                        border: "solid 1px #cccccc",
                        outline:"none",
                        backgroundColor:"#cccccc",
                        borderRadius: 4,
                        fontWeight: 500,
                        padding: "11px 0 11px 0"
                    }} 
                    variant="primary" 
                >
                    확인
                </button>
            )}

            {codeInput !== '' && (
                <button 
                    style={{
                        width:"48.2%", 
                        fontSize: 16,
                        color: "#ffffff",
                        border: "solid 1px #ec9281",
                        outline:"none",
                        backgroundColor:"#ec9281",
                        borderRadius: 4,
                        fontWeight: 500,
                        padding: "11px 0 11px 0"
                    }} 
                    variant="primary" 
                    onClick={handlePhoneCheck}
                >
                    확인
                </button>
            )}
        </>
    )

    const doneCertifiCheck = (
        <>
            <button 
                style={{
                    width:"48.2%", 
                    fontSize: 16,
                    color: "#ffffff",
                    border: "solid 1px #cccccc",
                    outline:"none",
                    backgroundColor:"#cccccc",
                    borderRadius: 4,
                    fontWeight: 500,
                    padding: "11px 0 11px 0"
                }} 
                variant="primary" 
            >
                확인
            </button>
            <p style={{margin:0}}>*인증이 완료되었습니다.</p>
        </>
    )

    useEffect(()=>{
        axios
        .get(infoAcount, {headers: authHeader()})
        .then((response)=>{
            console.log("get inside")
            console.log(response)
            const accountId =  response.data
            setUserInfo(accountId)
        })
    },[])



    return (
        <>
            <div className="info-topicArea">
                <a href="./mypage"><button>뒤로</button></a>
                <div className="info-topic">개인정보 수정</div>
            </div>

            <div style={{textAlign:"left",padding :"0 16px 0 16px"}}>

                <div className="user-infoContent">
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

                <h>*이메일 주소는 아이디로 사용됩니다.</h>
                <div className="user-infoContent">
                    <div 
                        type="text"
                        name="email" 
                        value={userInfo.email}
                        className="user-textbox"
                        placeholder="계정 이메일" 
                    >
                        {userInfo.email}
                    </div>
                </div>
                
                <div className="user-blankContent">
                    <input 
                        style={{ outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        value={newPw}
                        type="password"
                        name="password"
                        placeholder="비밀번호" 
                        className="user-textbox"
                        onChange={newPwChange}
                    />
                </div>

                    {newPw.length <= 8 && (
                        <h>*8자리 이상 입력해주세요.</h>
                    )}
                    <div className="user-blankContent">
                        <input 
                            style={{ outline:"none", border:"none", font: "small-caption", width:"100%"}}
                            value={checkPw}
                            type="password"
                            name="password"
                            placeholder="비밀번호 확인" 
                            className="user-textbox"
                            onChange={checkPwChange}
                        />
                    </div>
                    {newPw !== checkPw && (
                        <h>*비밀번호가 일치하지 않습니다.</h>
                    )}
                    {notherNum === false && (
                        <>
                            <div style={{display:"flex", paddingBottom: 20}}>
                                <div className="user-infoContent" style={{width:"100%", marginRight:8}}>
                                    <div 
                                        type="text" 
                                        placeholder="전화번호" 
                                        className="user-textbox"
                                        style={{width:"100%"}}
                                    >
                                        {userInfo.phone}
                                    </div>
                                </div>
                                <button 
                                style={{
                                    width:180, 
                                    marginBottom: 16,
                                    fontSize: 16,
                                    color: "#de6e57",
                                    borderRadius: 4,
                                    border: "solid 1px #ec9281",
                                    backgroundColor:"#ffffff",
                                    fontWeight: 500
                                    }} 
                                    variant="primary" 
                                    onClick={handleNotherNum}>
                                    다른번호 인증
                                </button>
                            </div>
                        </>
                        )   
                    }

                    {notherNum === true && (
                        <>
                            <div style={{display:"flex"}}>
                                <div className="user-infoContent" style={{width:"100%", marginRight:8}}>
                                <input 
                                        style={{ 
                                            outline:"none", 
                                            border:"none", 
                                            font: "small-caption", 
                                            width:"100%"
                                        }}
                                        className="user-textbox"
                                        type="tel"
                                        name="phone"
                                        placeholder="휴대폰 번호(- 없이 입력)" 
                                        onChange={phoneNumChange}
                                    />
                                </div>
                                {requestNum === false && (
                                    <button 
                                        style={{
                                            width:180, 
                                            marginBottom: 16,
                                            fontSize: 16,
                                            color: "#ffffff",
                                            border: "solid 1px #ec9281",
                                            backgroundColor:"#ec9281",
                                            borderRadius: 4,
                                            fontWeight: 500
                                        }} 
                                        variant="primary" 
                                        onClick={handleCodeSwitch}
                                    >
                                        인증번호 전송
                                    </button>
                                    )
                                }
                                {requestNum === true && (
                                    <button 
                                        style={{
                                            width:180, 
                                            marginBottom: 16,
                                            fontSize: 16,
                                            color: "#ffffff",
                                            border: "solid 1px #cccccc",
                                            backgroundColor:"#cccccc",
                                            borderRadius: 4,
                                            fontWeight: 500
                                        }} 
                                        variant="primary" 
                                    >
                                        인증번호 전송
                                    </button>
                                    )
                                }
                            </div>
                        </>
                        )   
                    }
                    {requestNum === false && (
                        <>
                            <div>

                            </div>
                        </>
                    )}
                    {requestNum === true && (
                        <>
                            <div className="user-infoContent" style={{width:"100%", marginRight:8}}>
                                <input 
                                    type="text" 
                                    name="codeNum"
                                    placeholder="인증번호 입력" 
                                    className="user-textbox"
                                    style={{width:"100%", border:"none"}}
                                    onChange={phoneCodeChange}
                                    // value={codeInput}
                                />
                            </div>
                            <div 
                                className="user-blankContent" 
                                style={{width:"100%", marginRight:8, border:"none", marginBottom:40}}
                            >
                                <button 
                                    style={{
                                        width:"50%", 
                                        fontSize: 16,
                                        marginRight:8,
                                        color: "#565656",
                                        border: "solid 1px #cccccc",
                                        backgroundColor:"#ffffff",
                                        borderRadius: 4,
                                        fontWeight: 500,
                                        padding: "11px 0 11px 0"
                                    }} 
                                    variant="primary" 
                                    onClick={handleCodeSwitch}
                                >
                                    인증번호 재전송
                                </button>
                            {allow? (doneCertifiCheck):(phoneCertifiCheck)}
                                
                            </div>
                        </>
                    )}

                <hr className="info-lightLine"/>
                
                <div type="button"  onClick={handleMarketCheck}>
                    {marketing && (
                        <>
                                <div style={{display:"flex"}}>
                                    <div>(img1)</div>
                                    <p>마케팅 및 광고 활용 동의(선택)</p>
                                    <div>(img2)</div>
                                    close
                                </div>
                                <p style={{marginLeft:32}}>- 마케팅 및 광고 활용 동의를 하지 않을 경우 혜택 및 
                                    이벤트 등의 서비스 이용에 제한이 있을 수 있습니다.
                                </p>
                        </>
                    )}
                    {!marketing && (
                        <>
                            <div style={{display:"flex"}}>
                                <div>(img1)</div>
                                <p>마케팅 및 광고 활용 동의(선택)</p>
                                <div>(img2)</div>
                                open
                            </div>
                        </>
                    )}
                </div>
                
                <div className="user-infoBtn">
                    {newPw < 9 || newPw !== checkPw || !allow || !marketing  ? (
                        <div 
                            type="button" 
                            className="user-btnbox" 
                            style={{ 
                                color:"#ffffff",
                                backgroundColor: "#cccccc", 
                                border:"1px #cccccc",
                                borderRadius: 4
                            }}
                        >수정하기
                        </div>
                    ) : 
                    (
                        <div 
                            onClick={changeSubmit}  
                            type="button" 
                            className="user-btnbox" 
                            style={{ color:"#ffffff",backgroundColor: "#ec9281"}}
                        >수정하기
                        </div>
                    )}
                </div>
                <div type="button" onClick={RemoveModal} style={{color: "#de6e57", fontSize:14,fontWeight:500}}>서비스 탈퇴하기</div>
            </div>
        </>  
    );
};

export default ChangeProfile;