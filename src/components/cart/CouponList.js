import axios from 'axios';
import React, { useEffect } from 'react';
import authHeader from "../../actions/userAction"

const CouponList = ({history}) => {
    const couponUrl = "https://childsnack-test.appspot.com/_ah/api/user/v1/getCoupons"

     //뒤로가기
     const goBack = () =>{
        history.goBack();
    }

    useEffect(()=>{
        axios
        .get(couponUrl,{headers: authHeader()})
        .then((response)=>{
            console.log(response)
        })
    })


    return (
        <>
            <div>
                <h1>쿠폰</h1>
                <button type="button" onClick={goBack}>뒤로가기</button>
                <div style={{height:300, border:"1px solid"}}>

                </div>
                <button>적용하기</button>
            </div> 
        </>
    );
};

export default CouponList;