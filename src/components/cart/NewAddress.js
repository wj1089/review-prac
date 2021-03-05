import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import {Modal, Button} from "react-bootstrap"
import DaumPostcode from 'react-daum-postcode';

const NewAddress = ({
    history
}) => {
    
    const userAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"
    const updateAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/updateReceiver"
    const removeAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/deleteReceiver?id="
    const addUserAddres = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/insertReceiver"

    const [newAdrs,setNewAdrs] = useState({
        name:'',
        phone:'',
        addressDetail:''
    })
    console.log("newAdrs")
    console.log(newAdrs)

     //주소 모달 show
     const [addShow, setAddShow] = useState(false)
     const handleAddShow = () =>{setAddShow(true)}
     const handleAddClose = () =>{setAddShow(false)}
 
     //입력한 주소
     const [isAddress, setIsAddress] = useState('');
     console.log("isAddress")
     console.log(isAddress)

    const handleAdrsInfo = (e) =>{  
        const {value, name} = e.target;
        setNewAdrs({
            ...newAdrs,
            [name]:value
        })
    }

    const saveAddressInfo =()=>{
        console.log("데이타 추가 등록")
        axios
        .post(addUserAddres,{
            id: newAdrs.receiverId,
            name: newAdrs.name,
            phone: newAdrs.phone,
            address: isAddress,
            addressDetail: newAdrs.addressDetail,
        }, {headers: authHeader()})
        .then((response)=>{
            console.log(response)
            history.push("./adrsManage")
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
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
    }


    return (
        <>

            <div className="info-topicArea">
                {/* <button onClick={goBack}>뒤로가기</button> */}
                <a href="./userInfo"><div>뒤로</div></a>
                <div className="info-topic">배송지 추가</div>
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
                        placeholder="수령인"
                        value={newAdrs.name} 
                        style={{fontSize: 16,fontWeight: 500,outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        onChange={handleAdrsInfo}
                    />
                </div>
               
                <div className="user-blankContent">
                    <input 
                        id="phone"
                        type="tel"
                        name="phone" 
                        className="user-textbox"
                        placeholder="휴대폰 번호(- 없이 입력)" 
                        value={newAdrs.phone}
                        style={{fontSize: 16,fontWeight: 500, outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        onChange={handleAdrsInfo}
                    />
                </div>
               
                <div style={{display:"flex"}}>
                        
                        {isAddress !== ''  &&(
                            <div className="user-blankContent" style={{width:"100%", marginRight:8}}>
                                <div 
                                    type="address"
                                    id="address"
                                    name="address"
                                    className="user-textbox"
                                    placeholder="주소"
                                    onChange={handleAdrsInfo} 
                                    value={isAddress}
                                    selected={isAddress}
                                    style={{
                                        width:"100%",
                                        fontSize: 16,
                                        fontWeight: 500
                                    }}
                                >
                                    {isAddress}
                                </div>
                            </div>
                        )}

                        {isAddress === '' &&(
                            <div className="user-infoContent" style={{width:"100%", marginRight:8}}>
                                <div 
                                    type="address"
                                    id="address"
                                    name="address"
                                    className="user-textbox"
                                    placeholder="주소"
                                    // onChange={handleAdrsInfo} 
                                    // value={isAddress}
                                    // selected={isAddress}
                                    style={{
                                        width:"100%",
                                        fontSize: 16,
                                        fontWeight: 500
                                    }}
                                >
                                    주소
                                </div>
                            </div>
                        )}
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
                        placeholder="상세주소입력" 
                        // value={newAdrs.addressDetail}
                        style={{fontSize: 16,fontWeight: 500, outline:"none", border:"none", font: "small-caption", width:"100%"}}
                        // onChange={handleAdrsInfo}
                    />
                    {/* {modifyAdrs.addressDetail} */}
                </div>
               
            </div>
            <div 
                type="button" 
                style={{ 
                    width:"100%",
                    height: 52,
                    display:"flex", 
                    justifyContent:"center", 
                    alignItems:"center", 
                    borderRadius: 6, 
                    backgroundColor: "#ec9281",
                    fontSize: 17,
                    color: "#ffffff",
                }}
                onClick={saveAddressInfo}
            >
                저장
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


export default NewAddress;