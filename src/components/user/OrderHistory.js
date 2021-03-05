import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"

const OrderHistory = () => {

    const OrderURL = "https://childsnack-test.appspot.com/_ah/api/order/v1/getList"

    const [orderList, setOrderList] = useState([])
    const [clickShow, setClickShow] = useState(false)
    useEffect(()=>{
        axios
        .get(OrderURL,{headers: authHeader()})
        .then((response)=>{
            console.log(response)
            setOrderList(response.data.items)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])

    const handleDetail =()=>{
        setClickShow(!clickShow)
        console.log(clickShow)
    }



    return (
        <>
            <div>
                <div className="info-lightTopicArea">
                    <a href="./userinfo"><button>뒤로</button></a>
                    <div className="info-topic">주문내역</div>
                </div>
                <div style={{padding:"28px 16px 52px 16px"}}>
                    {orderList.length === 0?
                        (<><div>주문내역이 없습니다.</div></>):
                        (
                            <>
                                <div style={{padding:"20px 16px 20px 16px",border:"1px solid #eeeeee", borderRadius: 4}}>
                                    <div style={{display:"flex"}}>
                                        <p style={{width:"70%"}}>2020~~~~</p>
                                        <button 
                                            onClick={handleDetail}
                                            style={{
                                            display:"flex",width:"30%", 
                                            textAlign:"center", border:"none",
                                            borderRadius:16, 
                                            fontSize: 12, color:"#000000"
                                        }}>
                                            주문상세보기
                                        </button>
                                    </div>
                                    <div style={{display:"flex", marginTop:18}}>
                                        <div style={{ width: 52, height: 52, border:"1px solid", borderRadius:4}}>img</div>
                                        <div style={{border:"1px solid",marginLeft:11, width:"100%"}}>
                                            <div style={{fontSize: 15,color: "#000000"}}>상품이름</div>
                                            <div style={{fontSize: 15,color: "#6da77e",fontWeight: "bold"}}>상품 준비 현황</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default OrderHistory;