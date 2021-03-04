import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from "../../actions/userAction"

const AdrsManage = ({history,data}) => {
        const addressUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"
        const defaultAddres = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/setDefault"

        const [isAdres, setIsAdres] = useState([])


        // 클릭을 했을때 현 클릭위치를 위한 효과(hover? or click 효과?)가 나타나야함
        // 저장버튼을 클릭했을때 alert같은게 떠야함
        // 체크 박스구조로 하나가 클릭되었을때 다른게 삭제되어야한다.

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

        // const clickPosition = (e)=>{
        //     const targerName = e.target.name
        //     if(targerName){
                
        //     }
        // }


        //뒤로가기
        const goBack = () =>{
            history.push("./userInfo");
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
                setIsAdres(listArr)
            })
        },[])

        return (
            <>
                <div style={{border:"1px solid"}}>

                    <div className="info-topicArea">
                        <a href="./mypage"><div>뒤로</div></a>
                        <div className="info-topic">배송지 관리</div>
                        <a href={`/newAddress?id=${isAdres.receiverId}`}>
                            <div type="button" style={{width:"100%",outlin:"none", textDecoration:"none"}}>추가</div>
                        </a>
                    </div>

                    <div style={{textAlign:"left",padding :"0 16px 0 16px",borderRadius: 5}}>
                        {isAdres.map((adrs)=>(
                            <div style={{
                                borderRadius: 5, 
                                padding:"22px 12px 28px 12px", 
                                marginBottom:12,
                                border: "solid 2px #e0e0e0"
                            }}
                                >
                                <div style={{display:"flex", marginBottom:18}}>
                                    <button 
                                        type="button"
                                        id={adrs.receiverId}
                                        name = {adrs.receiverId}
                                        // onClick={defaultAdrs} 
                                        style={{backgroundColor:"lightpink"}}
                                    >
                                        O
                                    </button>
                                    <div>
                                        {adrs.defaultReceiver === 1 &&(
                                            <div>
                                                <p>기본배송지</p>
                                            </div>
                                        )}
                                    </div>
                                    <a href={`/addressForm?id=${adrs.receiverId}`}>
                                        <button type="button" style={{backgroundColor:"white"}}>
                                            ㅁ
                                        </button>
                                    </a>
                                </div>
                                <div style={{display:"flex"}}>
                                    <p style={{fontSize: 14,color: "#757575"}}>수령인</p> 
                                    <p style={{marginLeft:32,fontSize: 16,fontWeight: 500}}>{adrs.name}</p>
                                </div>
                                <div style={{display:"flex"}}>
                                    <p style={{fontSize: 14,color: "#757575"}}>연락처</p>
                                    <p style={{marginLeft:32,fontSize: 16,fontWeight: 500}}>{adrs.phone}</p>
                                </div>
                                <div style={{margin : 0,display:"flex"}}>
                                    <p style={{fontSize: 14,color: "#757575"}}>주소</p>
                                    <p style={{marginLeft:45,fontSize: 16,fontWeight: 500}}>{adrs.address + "("+adrs.addressDetail+")"}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr style={{marginTop:32.5, border: "solid 8px #eeeeee"}} />
                    <div 
                        type="button" 
                        style={{ 
                            height: 52,
                            display:"flex", 
                            justifyContent:"center", 
                            alignItems:"center", 
                            borderRadius: 6, 
                            backgroundColor: "#ec9281",
                            fontSize: 17,
                            color: "#ffffff",
                            margin:"8px 10px 6px 10px"
                        }}
                        onClick={defaultAdrs}
                    >
                        저장하기
                    </div>
                </div>  
            </>
        );
};

export default AdrsManage;