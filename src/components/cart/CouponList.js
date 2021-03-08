import axios from 'axios';
import React, { useEffect } from 'react';
import authHeader from "../../actions/userAction"
// import "./cart.css";
import "../remote.css"

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
                <div className="info-topicArea">
                    <a href="./mypage">
                        <div>
                            <i class="fas fa-arrow-left" 
                                style={{outline:"none", textDecoration:"none"}}
                            />
                        </div>
                    </a>
                    <div className="info-topic">쿠폰함</div>
                </div>
                <button type="button" onClick={goBack}>뒤로가기</button>
                <div style={{height:300, border:"1px solid"}}>

                </div>
                <button>적용하기</button>
            </div> 
        </>
    );
};

export default CouponList;