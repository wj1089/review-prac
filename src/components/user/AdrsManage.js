import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from "../../actions/userAction"

const AdrsManage = ({history,data}) => {
        const addressUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"
        const defaultAddres = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/setDefault"

        const [isAdres, setIsAdres] = useState([])


        const defaultAdrs =(e)=>{
            const targerName = e.target.name
            console.log(isAdres.reverse())
            axios
            .post(defaultAddres,
                {id: targerName},
                {headers: authHeader()})
            .then((response)=>{
                console.log(response)
                isAdres.reverse()
                console.log("대표 주소 바뀜")
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    

        //뒤로가기
        const goBack = () =>{
            history.push("./userInfo");
        }
    
        useEffect(()=>{

            // if(isAdres.defaultReceiver === "1"){
            //    
            //     console.log(isAdres.reverse())
            // }

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
                setIsAdres(listArr)
            })
        },[])

        return (
            <>
                <div style={{border:"1px solid"}}>
                    <div style={{display:"flex"}}>
                        <button type="button" onClick={goBack}>뒤로가기</button>
                        <h3>주소록관리</h3>
                    </div>
                    <div>
                        {isAdres.map((adrs)=>(
                            <div style={{border:"1px solid"}}>
                                <div>{adrs.defaultReceiver}</div>
                                <p>수령인 : {adrs.name}</p>
                                <p>연락처 : {adrs.phone}</p>
                                <p>주소 : {adrs.address + "("+adrs.addressDetail+")"}</p>
                                <div>
                                    <a href={`/addressForm?id=${adrs.receiverId}`}><button type="button" style={{width:"50%", backgroundColor:"white"}}>배송지 수정</button></a>
                                    <button 
                                        type="button"
                                        id={adrs.receiverId}
                                        name = {adrs.receiverId}
                                        onClick={defaultAdrs} 
                                        style={{width:"50%", backgroundColor:"lightpink"}}>기본배송지로 선택</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <a href={`/newAddress?id=${isAdres.receiverId}`}>
                            <button type="button" style={{width:"100%"}}>+추가등록</button>
                        </a>
                    </div>
                </div>  
            </>
        );
};

export default AdrsManage;