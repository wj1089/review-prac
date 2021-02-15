import axios from 'axios';
import React, { useEffect, useState,useCallback } from 'react';
import authHeader from "../hoc/authHeader"
import { request } from "../util/axios";
import {Modal, Button} from "react-bootstrap"

const UserInfo = (props) => {
    const userInfomation = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"
    const changeProfile = "https://childsnack-test.appspot.com/updateProfile"
    const exitService = "https://childsnack-test.appspot.com/_ah/api/user/v1/exitService"

    const [clickAction, setClickAction] = useState(false)
    const [show, setShow] = useState(false);
    const [changeInfos, setChangeInfos] = useState({
     
    })
    const [userInfo, setUserInfo]  = useState('')


    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}

    const handleChange = useCallback((e) =>{  
        const {value, name} = e.target;
        
        setChangeInfos({
            ...changeInfos,
            [name]:value
        })
    },[changeInfos])

    const handleClickEvent = () =>{
        setClickAction(!clickAction)
        console.log("clickAction")
        console.log(clickAction)
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
            console.log(error.response.data.error.message)
            alert(error.response.data.error.message)
        })
    } 


    useEffect(()=>{
        console.log("useEffect 들어옴")
        axios
        .get(userInfomation,{headers: authHeader()})
        .then((response)=>{
            console.log("response 들어옴")
            console.log(response.data)
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
                <h1>회원정보수정</h1>
                <div style={{display:"flex",width:500, border:"1px solid", backgroundColor:"lightGray", textAlign:"right"}}>
                    <div style={{width:500, border:"1px solid", backgroundColor:"lightGray"}}>

                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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

                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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

                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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

                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <p>비밀번호</p>
                            <div type="text" placeholder="비밀번호" style={{border: "1px solid", width:100,height:30}}>
                            </div>
                        </div>

                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <p>전화번호</p>
                            <div type="text" placeholder="전화번호" style={{border: "1px solid", width:100,height:30}}>
                                {userInfo.phone}
                            </div>
                        </div>

                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <p>주소</p> 
                            <div type="text" placeholder="주소" style={{border: "1px solid",height:30}}>
                                {userInfo.address}
                            </div>
                        </div>

                        <button>수정하기</button>
                    </div>
                </div>

                {/* 모달로 탈퇴여부 확인 */}
                {/* 확인 & 취소로 판단 */}
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

                <div style={{display:'flex',justifyContent:'center'}}>
                    <a href="/login"><button>back to Login</button></a>
                    <a href="/mypage"><button>뒤로가기</button></a>
                </div>
            </div>
        </>
    );
};

export default UserInfo;