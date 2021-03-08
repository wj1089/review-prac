import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from "../../actions/userAction"
import "../remote.css"
import "./userReview.css"
const RvCenter = () => {

    const reviewListURL = "https://childsnack-test.appspot.com/_ah/api/review/v1/getAccountReviewList?count=3&startCursor=0"
    const userReviewURL = "https://childsnack-test.appspot.com/_ah/api/review/v1/getReviewList?count=5&startCursor=0"

    const [reviews,setReviews]= useState([])

    useEffect(()=>{
        axios
        .get(reviewListURL,{headers: authHeader()})
        .then((response)=>{
            console.log("review response")
            console.log(response)
            setReviews(response.data)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])
    console.log("reviews")
    console.log(reviews)

    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./mypage">
                    <div>
                        <i class="fas fa-arrow-left" 
                            style={{outline:"none", textDecoration:"none"}}
                        />
                    </div>
                </a>
                <div className="info-topic">리뷰관리</div>
                <div type="button" />
            </div>

            <div>
                <div className="reviewTitle">
                    <div className="writeTitle">작성가능한 리뷰</div>
                    <div className="writeInfo">
                        리뷰작성시 50포인트 적립!
                    </div>
                </div>
                <div style={{paddingTop:"20px"}}>
                    <div style={{ padding:"0 16px 0 16px", display:"flex"}}>
                        <div style={{width:"70%",borderBottom:"1px solid"}}>
                            123
                        </div>
                        <div style={{width:"30%", paddingBottom:"20px",borderBottom:"1px solid"}}>
                            <a href="./NewReview"><button style={{textAlign:"center"}}>리뷰 쓰기</button></a>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div  className="reviewTitle" style={{backgroundColor: "#f5f5f5"}}>
                    <div className="writeTitle">
                        <div>작성한 리뷰</div>
                    </div>
                </div>
                <div style={{
                        padding:"60px 16px 0 16px", 
                        display:"flex", 
                        justifyContent:"center",
                        color: "#9e9e9e",
                        fontSize: 17
                    }}>
                    <div>
                        작성하신 리뷰가 없습니다.
                    </div>
                    {/* <div style={{width:"30%", border:"1px solid"}}>
                        <button style={{textAlign:"center"}}>리뷰 쓰기</button>
                    </div> */}
                </div>
            </div>

        </>
    );
};

export default RvCenter;