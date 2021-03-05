import React, { useEffect,useState } from 'react';
import Logout from '../log/Logout';
import DownNav from "../navi/DownNav";
import axios from 'axios';
import authHeader from "../../actions/userAction"
import "./userinfo.css"
import "../remote.css"

const MyPage = ({history}) => { 

    const reviewListURL = "https://childsnack-test.appspot.com/_ah/api/review/v1/getAccountReviewList?count=3&startCursor=0"
    const getAccount = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"
    const getCoupon = "https://childsnack-test.appspot.com/_ah/api/user/v1/getCoupons"
    const [userMemo, setUserMemo] = useState([])
    const [userPoint, setUserPoint] = useState([])
    const [userReview, setUserReview] = useState('')
    const [userCoupon, setUserCoupon] = useState(0)
    console.log(userMemo)
    //뒤로가기
    const goBack = () =>{
        history.push("./");
    }
    //쿠폰
    useEffect(()=>{
        axios
        .get(getCoupon,{headers: authHeader()})
        .then((response)=>{
            console.log("coupon response")
            console.log(response)
            const coupon = response.data.items.length
            setUserCoupon(coupon)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])

    //리뷰
    useEffect(()=>{
        axios
        .get(reviewListURL,{headers: authHeader()})
        .then((response)=>{
            const review = response.data
            setUserReview(review)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])

    //포인트
    useEffect(()=>{
        axios
        .get(getAccount,{headers: authHeader()})
        .then((response)=>{
            // console.log(response)
            const userInfo = response.data
            const point = response.data.group

            setUserMemo(userInfo)
            setUserPoint(point)
        })
        .catch((error)=>{
            console.log(error)
            alert(error)
        })
    },[])


    return (
        <>
            <div style={{border:"1px solid"}}>
                <div className="info-bigTitleArea">
                    <a href="./">뒤로</a>
                    <div className="info-topic">마이페이지</div>
                </div>

                <div className="info-bigContentArea">
                    <div className="info-pointArea">
                        <div style={{
                            width:"60%", 
                            border:"1px solid", 
                            display:"flex",
                            alignItems:"center", 
                            justifyContent:"left",
                            // padding:"27px 0 27px 0"
                            }}
                        >
                        <div style={{height:52, width:52, border:"1px solid"}}>a</div>
                            <div>
                                <p>Level : {userPoint.buyBenefits}</p>
                                <p>적립 {userPoint.pointPercent}%</p>
                            </div>
                        </div>
                        <div 
                            style={{width:"40%", 
                            border:"1px solid", display:"flex",
                            alignItems:"center", 
                            justifyContent:"center",
                        }}
                        >
                            <a href="/userInfo">
                                <button 
                                    type="button" 
                                    style={{
                                        borderRadius:"24px", 
                                        border:"none", padding:"0 12px 0 12px", 
                                        backgroundColor:"#cccccc", 
                                        fontSize:"16px"
                                    }}
                                >
                                    회원정보 수정
                                </button>
                            </a>
                        </div>
                    </div>
                    <div style={{display:"flex", paddingBottom:18}}>
                        <div style={{ width:"33%", textAlign:"center",borderRight:"1px solid #e0e0e0"}}>
                            <a href="/coupon"><div>쿠폰함</div></a>
                            <p>{userCoupon}개</p>
                        </div>
                        <div style={{ width:"33%", textAlign:"center",borderRight:"1px solid #e0e0e0"}}>
                            <a href="/point"><div>포인트</div></a>
                            <p>{userMemo.totalPoints}원</p>
                        </div>
                        <div style={{ width:"33%", textAlign:"center"}}>
                            <a href="/reviewCenter"><div>리뷰</div></a>
                            <p>{userReview.totalCount}건</p>
                        </div>
                    </div>
                </div>

                <div className="info-bigContentArea">
                    <div className="info-insideContent">
                        <a href="/orderHistory"><div>주문내역</div></a>
                    </div>
                </div>

                <div className="info-bigContentArea">
                    <div className="info-insideContent"
                        style={{borderBottom: "1px solid #e0e0e0"}}>
                        <a href="/eventCenter"><div>이벤트</div></a>
                    </div>
                    <div className="info-insideContent"
                        style={{borderBottom: "1px solid #e0e0e0"}}>
                        <a href="/notice"><div>공지사항</div></a>
                    </div>
                    <div className="info-insideContent">
                        <a href="/serviceCenter"><div>고객센터</div></a>
                    </div>
                </div>

                <div className="info-LastArea">
                    <Logout  />
                </div>
                <DownNav />
            </div>
        </>
    );
};

export default MyPage;