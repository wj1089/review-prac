import React, { useEffect, useState } from 'react';
import axios from 'axios';
import authHeader from "../../actions/userAction"

const RvCenter = () => {

    const reviewListURL = "https://childsnack-test.appspot.com/_ah/api/review/v1/getAccountReviewList?count=3&startCursor=0"
    const userReviewURL = "https://childsnack-test.appspot.com/_ah/api/review/v1/getReviewList?count=5&startCursor=0"

    const [reviews,setReviews]= useState([])

    useEffect(()=>{
        axios
        .get(reviewListURL,{headers: authHeader()})
        .then((response)=>{
            const ListArr = []
            console.log("review response")
            console.log(response)
            
            response.data.map((reviews)=>ListArr.push({

            }))
            setReviews(ListArr)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    })

    return (
        <>
            <div>
                <h1>Review manage Center</h1>
                <div>

                </div>
            </div>
        </>
    );
};

export default RvCenter;