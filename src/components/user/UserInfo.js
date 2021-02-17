import axios from 'axios';
import { withRouter} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import {Modal, Button} from "react-bootstrap"
import "./userinfo.css"
import DaumPostcode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';

const UserInfo = ({props,history}) => {
    const userInfomation = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"
    const exitService = "https://childsnack-test.appspot.com/_ah/api/user/v1/exitService"
    const phoneCode = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAuthNum?phone="
    const phoneCodeCheck = "https://childsnack-test.appspot.com/_ah/api/user/v1/checkAuthNum"
    const updateInfo = "https://childsnack-test.appspot.com/updateProfile"

    const [clickAction, setClickAction] = useState(false)

    const [passwordClick, setPasswordClick] = useState(false)

    //회원정보 변경버튼 
    const [sendClick, setSendClick] = useState(false)
    console.log("sendClick")
    console.log(sendClick)

    const [show, setShow] = useState(false);
    //주소 모달 show
    const [addShow, setAddShow] = useState(false)
    //Phone 모달 show
    const [phoneShow, setPhoneShow] = useState(false)
    //비밀번호
    const [agreeSign, setAgreeSign] = useState(false)

    const handleShow = () => {setShow(true)}
    const handleClose = () => {setShow(false)}
    const handleAddShow = () =>{setAddShow(true)}
    const handleAddClose = () =>{setAddShow(false)}
    const handlePhoneShow = () =>{setPhoneShow(true)}
    const handlePhoneClose = () =>{
        setPhoneShow(false)
        setSendClick(false)
    }
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
    //Old Passward
    const oldPwChange = (e) =>{setOldPw(e.target.value)}
    //New Passward
    const newPwChange = (e) =>{setNewPw(e.target.value)}
    //신규 비밀번호 재입력
    const checkPwChange = (e) =>{
    setCheckPw(e.target.value)
    }

    //validation check Passward
    const validatePw = () =>{
        // if(userInfo.password !== oldPw){
        //     alert("기존비밀번호와 다릅니다!")
        //     return
        // }else{
        //     console.log("통과")
        // }
        if(oldPw.length < 6 || newPw.length < 6 ){
            alert("비밀번호는 6자 이상으로 설정해주세요!")
            console.log("비밀번호 6자 이상으로 설정해주세요!.")
            return
        }
        if(oldPw === newPw){
            alert("과거 비밀번호와 같습니다.")
            console.log("과거 비밀번호와 같습니다.")
            return
        }
        if(checkPw !== newPw || checkPw.length < 6){
            alert("입력한 비밀번호가 틀립니다.")
            console.log("입력한 비밀번호가 틀립니다.")
            return
        }else{
            setAgreeSign(true)
            console.log("통과")
            alert("통과")
            setNewPw(newPw)
            setPasswordClick(false)
        }
    }

     //상세주소 확인
     const phoneNumChange = (e) =>{
        console.log("phoneCodeChange")
        setPhoneInput(e.target.value)
        console.log(phoneInput)
    }

    //신규번호 확인
    const addDetailChange = (e) =>{
        console.log("isAddressDetail")
        setIsAddressDetail(e.target.value)
        console.log(isAddressDetail)
    }
    //인증코드 확인
    const phoneCodeChange = (e) =>{
        console.log("phoneCodeChange")
        setCodeInput(e.target.value)
        console.log(codeInput)
    }
    // //뒤로가기
    const goBack = () =>{
        history.goBack();
    }
    //카카오 주소API
    const handleComplete = (data) => {
        let fullAddress = data.roadAddress;
        let extraAddress = ''; 

        if (data.addressType === 'R') {
            extraAddress += data.bname;
            }  if (data.bname !== '') {
            
            if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setIsAddress(fullAddress)
        setAddShow(false)
        setAllow(true)
    }

    const handleClickEvent = () =>{
        setClickAction(!clickAction)
        console.log("clickAction")
        console.log(clickAction)
    }
    const handleAddDetailSwitch = () =>{
        setAddDetail(!addDetail)
        console.log("addDetail")
        console.log(addDetail)
    }

    //비밀번호 변경 여부 버튼
    const handlePwClick = () =>{
        setPasswordClick(!passwordClick)
        console.log(passwordClick)
        setAgreeSign(false)
    }

    // 인증번호 요청 버튼 클릭
    const handleCodeSwitch = (e) =>{
        e.preventDefault()
        console.log("sendClick")
        console.log(sendClick)
        // setReqstPhoneCode(!reqstPhoneCode);
        // setSendClick(!sendClick);
        if(sendClick === false && phoneInput.length !== 10 && phoneInput.length !== 11 ){
            alert("전화번호를 정확히 입력해주세요")
            setSendClick(false);
            return
        }
        axios
        .get(phoneCode + phoneInput)
        .then((response)=>{
            if(response && response.data){
            console.log("response")
            console.log(response)
            const parseJson = JSON.parse(response.data.authId)
            console.log("response.data")
            console.log(parseJson)
            setIsAuthId(parseJson)
            setSendClick(true);
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
                setSendClick(false);
                setAllow(true)
            }
        })
        .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    }
    console.log("userInfo.address")
    console.log(userInfo.address)


    //변경완료 확인버튼
    const changeSubmit = () =>{
        console.log("최종변경")
        axios
        .post(updateInfo, {
            oldPassword : oldPw,
            password : newPw,
            address: isAddress,
            addressDetail: isAddressDetail,
            name : userInfo.name,
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
            console.log("localStorage")
            console.log(localStorage)
            console.log("response.payload")
            console.log(response)
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
                props.history.push("./Home")
            }
        })
        .catch((error)=>{
            console.log(error.response)
            alert(error.response)
        })
    } 
    

    //전화번호 신규등록 모달
    const PhoneModal = () => {
        return (
            <Button variant="primary" onClick={handlePhoneShow}>
                인증하기
            </Button>
        )
    }

    //주소지 신규등록 모달
    const AddresModal = () => {
        return (
            <Button variant="primary" onClick={handleAddShow}>
                주소검색
            </Button>
        )
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

    //모달 등록번호입력
    const beforeChangePn= (
        <>
            <div>
                <input 
                    value={phoneInput}
                    type="text" 
                    placeholder="번호를 입력해주세요." 
                    onChange={phoneNumChange}
                    style={{border: "1px solid", width:300, height:30}}
                />
                <button 
                    type="button"
                    style={{float:"right", width:100}}
                    onClick={handleCodeSwitch}
                >
                    인증요청
                </button>
            </div>
            <button style={{float:"right"}} onClick={handlePhoneClose}>취소</button>
        </>
    )

    //모달 인증코드입력
    const phoneForm = (
        <>
            <div style={{width:"100%"}}>
                <input 
                    value={codeInput}
                    type='text'
                    name="codeNum"
                    placeholder="인증번호" 
                    onChange={phoneCodeChange}
                    style={{border: "1px solid", width:300, height:30, float:"left"}}
                />
                <button 
                    type="button" 
                    style={{width:100}}
                    onClick={handleCodeSwitch}
                >
                    다시인증
                </button>
            </div>
            <div style={{height:100,width:300}}>
                <button style={{float:"right"}} onClick={handlePhoneCheck}>확인</button>
                <button style={{float:"right"}} onClick={handlePhoneClose}>취소</button>
            </div>
        </>
    )
    
    // 신규 비밀번호 등록
    const pwForm = (
        <>
            <p style={{textAlign:'left'}}>비밀번호 : </p>
            <div style={{width:250, border:"1px solid", textAlign:'left'}}>
                <p>기존 비밀번호</p>
                <input value={oldPw} onChange={oldPwChange} style={{width:"100%"}} type="text" placeholder="기존 비밀번호를 입력해주세요." />
                <p>새로운 비밀번호</p>
                <input value={newPw} onChange={newPwChange} style={{width:"100%"}} type="text" placeholder="새로운 비밀번호를 입력해주세요." />
                <input value={checkPw} onChange={checkPwChange} style={{width:"100%"}} type="text" placeholder="다시 한번 입력해주세요." />
                
                
                <button type="button" onClick={handlePwClick}>취소</button>
                <button onClick={validatePw}>확인</button>
            </div>
        </>
    )

    // 비밀번호 변경 전
    const beforeChange = (
        <>
            <div style={{display:"flex"}}>
                <p>비밀번호</p>
                {agreeSign === false && (
                    <div 
                    value={oldPw}
                    type="text" 
                    placeholder="비밀번호" 
                    style={{border: "1px solid", width:100,height:30}} 
                    >
                    {oldPw}
                    </div>
                )}
                {agreeSign === true && (
                    <div 
                    value={newPw}
                    type="text" 
                    placeholder="비밀번호" 
                    style={{border: "1px solid", width:100,height:30}} 
                    >
                    {newPw}
                    </div>
                )}
                
                <button type="button" onClick={handlePwClick}>변경하기</button>
            </div>
        </>
    )
    
    //사용자 정보 수정 전
    const provideInfo = (
        <>
            <div className="user-infoContent">
                <p>계정 이메일</p>
                <div 
                    name="email" 
                    value={userInfo.email}
                    style={{border: "1px solid",height:30}}  
                    placeholder="계정 이메일" 
                >
                    {userInfo.email}
                </div>
            </div>

            <div  className="user-infoContent"s>
                <p>이름</p>
                <div 
                    type="text"
                    name="name" 
                    value={userInfo.name} 
                    style={{border: "1px solid", width:100,height:30}}  
                    placeholder="이름"
                >
                    {userInfo.name}
                </div>
            </div>

            <div  className="user-infoContent">
                <p>생년월일</p>
                <div 
                    name="birth" 
                    value={userInfo.birth}
                    style={{border: "1px solid", width:100,height:30}}  
                    placeholder="생년월일" 
                >
                    {userInfo.birthday}
                </div>
            </div>

            <div className="user-infoContent">
                <p>비밀번호</p>
                <div 
                    type="text" 
                    placeholder="비밀번호" 
                    style={{border: "1px solid", width:100,height:30}} 
                >
                    {"*******"}
                </div>

            </div>

            <div className="user-infoContent">
                <p>전화번호</p>
                <div 
                    type="text" 
                    placeholder="전화번호" 
                    style={{border: "1px solid", width:100, height:30}}
                >
                    {userInfo.phone}
                </div>

            </div>

            <div className="user-infoContent">
                <p>주소</p> 
                <div 
                    value={userInfo.address}
                    type="text" 
                    placeholder="주소" 
                    style={{border: "1px solid",height:30}}
                >
                    {userInfo.address}
                </div>
            </div>

            <div className="user-infoContent">
                <p>상세주소</p> 
                <div 
                    value={userInfo.addressDetail}
                    type="text" 
                    placeholder="상세주소" 
                    style={{border: "1px solid",width: 100,height:30}}
                >
                    {userInfo.addressDetail}
                </div>
            </div>

            <a href="./myPage"><button>마이페이지</button></a>
            <button type="button" onClick={handleClickEvent}>수정하기</button>
        </>
    )



    //사용자 정보 수정 후
    const modifiedInfo = (
        <>
            <div  className="user-infoContent">
                <p>계정 이메일</p>
                <div 
                    name="email" 
                    value={userInfo.email}
                    style={{border: "1px solid",height:30}}  
                    placeholder="계정 이메일" 
                >
                    {userInfo.email}
                </div>
            </div>

            <div  className="user-infoContent"s>
                <p>이름</p>
                <div 
                    type="text"
                    name="name" 
                    value={userInfo.name} 
                    style={{border: "1px solid", width:100,height:30}}  
                    placeholder="이름"
                >
                    {userInfo.name}
                </div>
            </div>

            <div  className="user-infoContent">
                <p>생년월일</p>
                <div 
                    name="birth" 
                    value={userInfo.birth}
                    style={{border: "1px solid", width:100,height:30}}  
                    placeholder="생년월일" 
                >
                    {userInfo.birthday}
                </div>
            </div>

            <div className="user-infoContent">
                <div>{passwordClick ? pwForm : beforeChange}</div>
            </div>

            <div className="user-infoContent">
                <p>전화번호</p>
                <div 
                    type="text" 
                    placeholder="전화번호" 
                    style={{border: "1px solid", width:100, height:30}}
                >
                    {allow === true && (
                        phoneInput
                    )}
                    {allow === false && (
                        userInfo.phone
                    )}
                </div>
                <PhoneModal type="button" />
            </div>

            <div className="user-infoContent">
                <p>주소</p> 
                    <div 
                        type="text" 
                        id="address" 
                        name="address"
                        placeholder="주소" 
                        value={isAddress}
                        selected={isAddress}
                        style={{border: "1px solid", maxWidth: 250}}
                    >
                        {allow === true && (
                            isAddress
                        )}
                        {allow === false && (
                            userInfo.address
                        )}
                    </div>
                <AddresModal type="button"/>
            </div>
            <div className="user-infoContent">
                <p>상세주소</p> 
                {addDetail === true && (
                <>
                    <input 
                        value={isAddressDetail}
                        type="text" 
                        placeholder="상세주소" 
                        style={{border: "1px solid",width: 100,height:30}}
                        onChange={addDetailChange}
                    />
                    <button onClick={handleAddDetailSwitch}>취소</button>
                </>
                )}
                
                {addDetail === false && (
                <>
                    <div 
                        value={userInfo.addressDetail}
                        type="text" 
                        placeholder="상세주소" 
                        style={{border: "1px solid",width: 100,height:30}}
                        onChange={addDetailChange}
                    >
                        {userInfo.addressDetail}
                    </div>
                    <button onClick={handleAddDetailSwitch}>입력하기</button>
                </>
                )}
            </div>
            <button onClick={handleClickEvent}>뒤로가기</button>
            <button onClick={changeSubmit}>변경확인</button>
        </>
    )

    //회원정보 진입시 첫화면
    useEffect(()=>{
        console.log("useEffect 들어옴")
        axios
        .get(userInfomation,{headers: authHeader()})
        .then((response)=>{
            console.log("response 들어옴")
            console.log(response.data)
            const userInfo = response.data
            setUserInfo(userInfo)
            console.log("userInfo.address")
            console.log(userInfo.address)
        })
        .catch((error)=>{
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    },[])
    

    return (
        <>
            <div>
                <h1>회원정보수정</h1>
                <div 
                style={{display:"flex", justifyContent:"center",width:600, border:"1px solid", textAlign:"right"}}>
                    <div style={{width:500, border:"1px solid", backgroundColor:"lightGray"}}>
                        {!clickAction ? provideInfo : modifiedInfo}
                    </div>
                </div>

                {/* 모달 번호인증 확인 */}
                <Modal 
                    show={phoneShow} 
                    data-toggle="modal"
                    onHide={handlePhoneClose}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>번호인증</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{textAlign:"center"}}>
                            <div style={{textAlign:"center"}}>
                                <p >신규 번호</p>
                                {sendClick ?  phoneForm : beforeChangePn}
                            </div>
                            <br />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>   

                {/* 모달 주소검색 확인 */}
                <Modal 
                    show={addShow} 
                    data-toggle="modal"
                    onHide={handleAddClose}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>주소검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DaumPostcode onComplete={handleComplete}/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>   
                {/* 모달 회원탈퇴여부 확인 */}
                <RemoveModal type="button" />
            </div>
        </>
    );
};

export default withRouter(UserInfo);