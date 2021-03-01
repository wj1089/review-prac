import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from "../../actions/userAction"
import AddressItems from './AddressItems';

const ChangeAdrs = ({history}) => {

    const addressUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"
    const defaultAddres = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/setDefault"
    const [isAddress, setIsAddres] = useState([])
    

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }


    useEffect(()=>{
        axios
        .get(addressUrl, {headers: authHeader()})
        .then((response)=>{
            console.log(response)
            const listArr = []
            response.data.items.map(personInfo=>listArr.push({
                address : personInfo.address,
                addressDetail : personInfo.addressDetail,
                defaultReceiver : personInfo.defaultReceiver,
                name : personInfo.name,
                receiverId : personInfo.receiverId,
                phone : personInfo.phone
            }))
            setIsAddres(listArr)
        })
    },[])
    console.log(isAddress)
    console.log(isAddress)


    // useEffect(()=>{
    //     axios
    //     .get(defaultAddres, {headers: authHeader()})
    //     .then((response)=>{
    //         console.log(response)
    //     })
    // })


    return (
        <>
            <div style={{border:"1px solid"}}>
                <div style={{display:"flex"}}>
                    <button type="button" onClick={goBack}>뒤로가기</button>
                    <h3>배송지변경</h3>
                </div>
                <div>
                    { isAddress.defaultAddres === "1" && (
                        <AddressItems 
                        data={isAddress}
                        style={{border:"1px solid", backgroundColor:"lightpink"}}
                        />
                    )}
                    { isAddress.defaultAddres !== "1" && (
                        <AddressItems 
                        data={isAddress}
                        />
                    )}
                </div>
                <div>
                    <a href={`/newAddress?id=${isAddress.receiverId}`}>
                        <button type="button" style={{width:"100%"}}>+추가등록</button>
                    </a>

                </div>
            </div>  
        </>
    );
};

export default ChangeAdrs;