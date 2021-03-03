import axios from 'axios';
import React, { useState, useEffect } from 'react';
import authHeader from "../../actions/userAction"
import "./coupon.css";

const Coupon = ({history}) => {

    const getAllCouponUrl = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAllCoupon"
    const getMyCouponUrl = "https://childsnack-test.appspot.com/_ah/api/user/v1/getCoupons"


    const [couponWalet, setCouponWalet] = useState([])
    const [toggle, setToggle] = useState(1)

    const onClickDetailInfo = (index) =>{
        console.log(index)
        setToggle(index)
    }

    const goback =()=>{
        history.goBack()
    }

    useEffect(()=>{
        axios
        .get(getAllCouponUrl,{ headers: authHeader()})
        .then((response)=>{
            console.log("전체 쿠폰")
            console.log(response)
            const couponNum = response.data.items.length
            console.log(" 내 couponNum")
            console.log(couponNum)
            setCouponWalet(couponNum)
        })
    },[])



    useEffect(()=>{
        axios
        .get(getMyCouponUrl,{ headers: authHeader()})
        .then((response)=>{
            console.log("내 쿠폰")
            console.log(response)
            const listArr =[]
            response.data.items.map((coupon)=>listArr.push({
                content : coupon.content,
                id : coupon.id,
                title : coupon.title
            }))
            // setCouponWalet(listArr)
        })
    },[])

    function makeMyCouponElement(){
        <>
            <div>

            </div>
        </>
    }


    return (
        <>
            <div>
                <div style={{display:"flex"}}>
                    <button type="button" onClick={goback}>뒤로가기</button>
                    <h1>쿠폰함</h1>
                </div>
                <div>
                    

                    <div style={{ display:"flex",width:"100%"}}>
                        <div 
                            style={{width:100, fontSize:25}}  
                            type="button" 
                            id="productExplain" 
                            className={toggle === 1?"able":"disable"} 
                            onClick={()=>onClickDetailInfo(1)}>
                            내쿠폰
                        </div>
                        <div 
                            style={{width:100, fontSize:25}}  
                            type="button" 
                            id="productInfo" 
                            className={toggle === 2?"able":"disable"} 
                            onClick={()=>onClickDetailInfo(2)}>
                            쿠폰존
                        </div>
                    </div>
                    <div>
                        {toggle === 1 &&(
                            <>
                                <h3 name="myCoupon">현재 사용가능 쿠폰 {couponWalet}장</h3>
                                <div>
                                    {couponWalet===0? <div>사용가능한 쿠폰이 없습니다.</div> : makeMyCouponElement()}
                                </div>
                                <div>
                                    <b>쿠폰 이용안내</b>
                                    <p>text</p>
                                </div>
                            </>
                        )}
                        {toggle === 2 &&(
                            <>
                                <h2 name="couponZone">쿠폰존</h2>
                                <div>
                                    사용가능한 쿠폰이 없습니다.

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Coupon;