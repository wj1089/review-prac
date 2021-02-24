import axios from 'axios';
import React, { useEffect } from 'react';
import authHeader from "../../actions/userAction"

const Coupon = () => {

    const getAllCouponUrl = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAllCoupon"

    useEffect(()=>{
        axios
        .get(getAllCouponUrl,{ headers: authHeader()})
        .then((response)=>{
            console.log(response)
        })
    })

    return (
        <>
            <h1>Coupon</h1>
            




        </>
    );
};

export default Coupon;