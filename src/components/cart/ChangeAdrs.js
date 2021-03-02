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
        history.push("./payment");
    }

    const selectAdrs =(e)=>{
        console.log(" 선택 버튼 클릭")
        const targerName = e.target.name
            console.log(isAddress.reverse())
            axios
            .post(defaultAddres,
                {id: targerName},
                {headers: authHeader()})
            .then((response)=>{
                console.log(response)
                isAddress.reverse()
                console.log("대표 주소 바뀜")
                // window.location.reload();
                history.push("./payment")
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    useEffect(()=>{
        axios
        .get(addressUrl, {headers: authHeader()})
        .then((response)=>{
            console.log("주소 리스트")
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

    return (
        <>
            <div style={{border:"1px solid"}}>
                <div style={{display:"flex"}}>
                    <button type="button" onClick={goBack}>뒤로가기</button>
                    <h3>배송지변경</h3>
                </div>
                <div>
                    {isAddress.map((adrs)=>(
                        <div style={{border:"1px solid"}}>
                            <div>{adrs.defaultReceiver}</div>
                            <p>수령인 : {adrs.name}</p>
                            <p>연락처 : {adrs.phone}</p>
                            <p>주소 : {adrs.address + "("+adrs.addressDetail+")"}</p>
                            <div>
                                <a href={`/addressForm?id=${adrs.receiverId}`}><button type="button" style={{width:"50%", backgroundColor:"white"}}>배송지 수정</button></a>
                                <button 
                                id={adrs.receiverId}
                                name = {adrs.receiverId}
                                onClick={selectAdrs} 
                                style={{width:"50%", backgroundColor:"lightpink"}}>선택</button>
                            </div>
                        </div>
                    ))}
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