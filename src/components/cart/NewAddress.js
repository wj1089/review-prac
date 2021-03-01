import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"

const NewAddress = ({
    history
}) => {
    
    const userAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"
    const updateAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/updateReceiver"
    const removeAdrsUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/deleteReceiver?id="
    const addUserAddres = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/insertReceiver"

    
    const [userInfo, setUserInfo] = useState([])
    const [modifyText, setModifyText] = useState('')

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    const [newAdrs,setNewAdrs] = useState({
        name:'',
        phone:'',
        address:'',
        addressDetail:''
    })

    const handleAdrsInfo = (e) =>{  
        const {value, name} = e.target;
        setNewAdrs({
            ...newAdrs,
            [name]:value
        })
        console.log("newAdrs")
        console.log(newAdrs)
    
    }
 //뒤로가기
    const goBack = () =>{
        history.goBack();
    }
    
    const adrsSearch = () =>{
        console.log("주소검색")
    }

    const saveAddressInfo =()=>{
        console.log("데이타 추가 등록")
        axios
        .post(addUserAddres,{
            id: newAdrs.receiverId,
            name: newAdrs.name,
            phone: newAdrs.phone,
            address: newAdrs.address,
            addressDetail: newAdrs.addressDetail,
        }, {headers: authHeader()})
        .then((response)=>{
            console.log(response)
            history.push("./changeAdrs")
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    }

    return (
        <>
          <button onClick={goBack}>뒤로가기</button>

          <div>
              <p type="text">수령인 : 
                <input 
                    id="name"
                    name="name"
                    type="name"
                    onChange={handleAdrsInfo} 
                    value={newAdrs.name} 
                />
              </p>
              <p>연락처 : 
                  <input 
                    id="phone"
                    name="phone"
                    type="phone"
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
                        onChange={handleAdrsInfo} 
                        value={newAdrs.address}
                    />
                </p>
                <button type="button" onClick={adrsSearch}>주소검색</button>
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

        </>


    );
};


export default NewAddress;