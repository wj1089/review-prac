import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import {Modal, Button} from "react-bootstrap"
import DaumPostcode from 'react-daum-postcode';

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
            history.push("./changeAdrs")
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
            <button onClick={goBack}>뒤로가기</button>

            <div>
                <p type="text">수령인 : 
                <input 
                    id="name"
                    name="name"
                    type="name"
                    value={modifyAdrs.name} 
                    onChange={handleModifyAdrsInfo}
                />
                </p>
                <p>연락처 : 
                    <input 
                        id="phone"
                        name="phone"
                        type="phone"
                        onChange={handleModifyAdrsInfo} 
                        value={modifyAdrs.phone} 
                    />
                </p>
                <div style={{display:"flex"}}>
                    <p>주소 :  
                        <input 
                            id="address"
                            name="address"
                            type="address"
                            onChange={handleModifyAdrsInfo} 
                            value={isAddress}
                        />
                    </p>
                    <Button variant="primary" type="button" onClick={handleAddShow}>
                        주소검색
                    </Button>
                </div>

                <p>상세주소 : 
                    <input 
                        id="addressDetail"
                        name="addressDetail"
                        type="addressDetail"
                        onChange={handleModifyAdrsInfo} 
                        value={modifyAdrs.addressDetail}
                    />
                </p>
            </div>
            {/* <button type="button" onClick={modifyInfo}>수정하기</button>    */}
            <button type="button" onClick={saveModifyInfo}>저장</button>   
            <button type="button" onClick={removeInfo}>삭제</button>   

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
        </>
    );
};

export default AddressForm;