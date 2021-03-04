import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import {Modal, Button} from "react-bootstrap"
import DaumPostcode from 'react-daum-postcode';
import "./cart.css"

const AddressForm = ({
    history
}) => {

    const userAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"
    const updateAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/updateReceiver"
    const removeAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/deleteReceiver?id="
    
    
    const [userInfo, setUserInfo] = useState([])
    console.log("userInfo")
    console.log(userInfo)

    const [modifyAdrs,setModifyAdrs] = useState({
        name:'',
        phone:'',
        address:'',
        addressDetail:''
    })

    //주소 모달 show
    const [addShow, setAddShow] = useState(false)
    const handleAddShow = () =>{setAddShow(true)}
    const handleAddClose = () =>{setAddShow(false)}

    //입력한 주소
    const [isAddress, setIsAddress] = useState('');
    console.log("isAddress")
    console.log(isAddress)

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    
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
        setUserInfo(fullAddress)
    }

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }

    //배송정보 수정 input
    const handleModifyAdrsInfo = (e)=>{
        const {value, name} = e.target;
        setModifyAdrs({
            ...modifyAdrs,
            [name]:value
        })
    }
    console.log("userInfo")
    console.log(userInfo)
    console.log("modifyAdrs")
    console.log(modifyAdrs)

    //데이터 저장
    const saveModifyInfo =()=>{
        console.log("데이터 저장")
        axios
        .post(updateAdrsUrl,{
            id: userInfo.receiverId,
            name: modifyAdrs.name,
            phone: modifyAdrs.phone,
            address: isAddress,
            addressDetail: modifyAdrs.addressDetail,
        }, {headers: authHeader()})
        .then((response)=>{
            console.log(response)
            history.push("/changeAdrs")
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    }

    //데이터 삭제
    const removeInfo = () =>{
        console.log("데이터 삭제")
        axios
        .delete(removeAdrsUrl + getId,{headers: authHeader()})
        .then((response=>{
            console.log(response)
            history.push("./adrsManage")
        }))
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    }

    useEffect(()=>{
        axios
        .get(userAdrsUrl, {headers: authHeader()})
        .then((response)=>{
            console.log("들어왔음")
            console.log(response)
            const data = response.data.items[0]
            console.log("data")
            console.log(data)
            setUserInfo(data)
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    },[])




    return (
        <>
            <div className="info-topicArea">
                <a href="./mypage"><div>뒤로</div></a>
                <div className="info-topic">배송지 수정</div>
                {/* <a href={`/newAddress?id=${isAdres.receiverId}`}>
                    <div type="button" style={{width:"100%",outlin:"none", textDecoration:"none"}}>추가</div>
                </a> */}
            </div>
            <div style={{textAlign:"left",padding :"0 16px 0 16px",borderRadius: 5}}>

            <div>
                <div className="user-blankContent">
                    <input 
                        type="text"
                        name="name" 
                        className="user-textbox"
                        // placeholder="수령인"
                        value={userInfo.name} 
                        style={{fontSize: 16,fontWeight: 500,outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        onChange={handleModifyAdrsInfo}
                    />
                </div>

                <div className="user-blankContent">
                    <input 
                        type="tel"
                        name="phone" 
                        className="user-textbox"
                        placeholder="휴대폰 번호(- 없이 입력)" 
                        value={userInfo.phone}
                        style={{fontSize: 16,fontWeight: 500, outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        onChange={handleModifyAdrsInfo}
                    />
                </div>

                <div style={{display:"flex"}}>
                    <div className="user-infoContent" style={{width:"100%", marginRight:8}}>
                        <div 
                            type="address"
                            id="address"
                            name="address"
                            className="user-textbox"
                            onChange={handleModifyAdrsInfo} 
                            value={userInfo.address}
                            style={{width:"100%",fontSize: 16,
                            fontWeight: 500,}}
                        >
                            {isAddress}
                        </div>
                    </div>
                    <Button 
                        variant="primary" 
                        type="button" 
                        onClick={handleAddShow}
                        style={{
                            width:180,
                            marginBottom: 16,
                            borderRadius: 4,
                            fontSize: 16,
                            fontWeight: 500,
                            border: "solid 1px #ec9281",
                            backgroundColor:"#ec9281",
                            color: "#ffffff",
                        }}
                    >
                        주소검색
                    </Button>
                </div>
                <div className="user-blankContent">
                    <input 
                        type="text"
                        name="addressDetail" 
                        className="user-textbox"
                        // placeholder="상세주소입력" 
                        value={userInfo.addressDetail}
                        style={{fontSize: 16,fontWeight: 500, outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        onChange={handleModifyAdrsInfo}
                    />
                    {/* {modifyAdrs.addressDetail} */}
                </div>
            </div>
            {/* <button type="button" onClick={modifyInfo}>수정하기</button>    */}
            <div style={{display:"inline-flex", width:"100%"}}>
                <div 
                    type="button" 
                    style={{ 
                        width:"50%",
                        height: 52,
                        display:"flex", 
                        justifyContent:"center", 
                        alignItems:"center", 
                        borderRadius: 6, 
                        backgroundColor: "#ffffff",
                        fontSize: 17,
                        border:"1px solid #cccccc",
                        color: "#565656",
                        marginRight: 8
                    }}
                    onClick={removeInfo}
                >
                    삭제
                </div>
                <div 
                    type="button" 
                    style={{ 
                        width:"50%",
                        height: 52,
                        display:"flex", 
                        justifyContent:"center", 
                        alignItems:"center", 
                        borderRadius: 6, 
                        backgroundColor: "#ec9281",
                        fontSize: 17,
                        color: "#ffffff",
                        // margin:"8px 10px 6px 10px"
                    }}
                    onClick={saveModifyInfo}
                >
                    저장
                </div>
            </div>
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
            </div>
        </>
    );
};

export default AddressForm;