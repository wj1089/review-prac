import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"

const OrderHistory = () => {

    const OrderURL = "https://childsnack-test.appspot.com/_ah/api/order/v1/getList"

    const [orderList, setOrderList] = useState([])

    useEffect(()=>{
        axios
        .get(OrderURL,{headers: authHeader()})
        .then((response)=>{
            const ListArr = []
            response.data.items.map((order)=>ListArr.push({
                id:order.orderId,
                buyer:order.buyer,
                receiver:order.receiver,
                shipmentStatus:order.shipmentStatus,
                shippingPrice:order.shippingPrice
            }))
            setOrderList(ListArr)
            console.log(ListArr)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])

    return (
        <>
            <div>
                <h1>OrderHistory</h1>
            </div>
        </>
    );
};

export default OrderHistory;