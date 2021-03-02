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

 //뒤로가기
    const goBack = () =>{
        history.goBack();
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
            goBack()
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
          <button onClick={goBack}>뒤로가기</button>

          <div>
              <p type="text">수령인 : 
                <input 
                    id="name"
                    name="name"
                    // type="name"
                    onChange={handleAdrsInfo} 
                    value={newAdrs.name} 
                />
              </p>
              <p>연락처 : 
                  <input 
                    id="phone"
                    name="phone"
                    // type="phone"
                    onChange={handleAdrsInfo} 
                    value={newAdrs.phone}
                  />
                </p>
              <div style={{display:"flex"}}>
                <p>주소 :  
                    <input 
                        id="address"
                        name="address"
                        type="address"
                        // onChange={handleAdrsInfo} 
                        value={isAddress}
                        selected={isAddress}
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
                    onChange={handleAdrsInfo} 
                    value={newAdrs.addressDetail}
                  />
                </p>
          </div>
          <button type="button" onClick={saveAddressInfo}>저장</button>   
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


export default NewAddress;