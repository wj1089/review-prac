import React, { useEffect, useState } from 'react';
import axios from "axios"

const EventMore = () => {

    const eventBener = "https://childsnack-test.appspot.com//_ah/api/event/v1/getEvent?id="
    const[eventSnack, setEventSnack] = useState([])
    const[snackImg, setSnackImg] = useState('')
    const[eventCoupon, setEventCoupon] = useState([])
    const[eventMeal , setEventMeal ] = useState([])
    console.log("snackImg")
    console.log(snackImg)

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')
    console.log(getId)
    const [wat, setWat] = useState([])

    useEffect(()=>{
        axios
        .get(eventBener + getId)
        .then((response)=>{
            console.log("event more response")
            console.log(response)
            if(response.data.items){
                const listArr = []
                const urlAddress = response.data.items
                const mainImg = urlAddress.detailImg
                urlAddress.products.map((eventlist)=>listArr.push({
                    id: eventlist.productId,
                    img:eventlist.thumnail,
                    content:makeEventElement(
                        eventlist.name,
                        eventlist.description,
                        eventlist.retailPrice,
                        eventlist.price
                    )
                }))
                setSnackImg(mainImg)
                setEventSnack(listArr)
                // setWat(where)
                // console.log("listArr")
                // console.log(listArr,urlAddress)
                console.log(listArr)
                console.log("mainImg")
                console.log(mainImg)
            }
        //     if(response.data.items === [1]){
        //         // response.data.items.map((eventlist)=>listArr.push({
        //         //     id: eventlist.id,
        //         //     detailImg:eventlist.detailImg,
        //         //     content:makeEventElement(
        //         //         eventlist.products
        //         //     )
        //         // }))
        //         // setEventCoupon(listArr)
        //     }
        //     if(response.data.items === [2]){

        //         // const 


        //         // response.data.items.map((eventlist)=>listArr.push({
        //         //     id: eventlist.id,
        //         //     detailImg:eventlist.detailImg,
        //         //     content:makeEventElement(
        //         //         eventlist.products
        //         //     )
        //         // }))
        //         // setEventMeal(listArr)
        //     }
        })
    },[])

    function makeEventElement (){
        return(
            <>
                <div>

                </div>
            </>
        )
    }
    function makeMealElement (){
        return(
            <>
                <div>
                    <div>{}</div>
                </div>
            </>
        )
    }
    function makeCouponElement (){
        return(
            <>
                <div>

                </div>
            </>
        )
    }



    return (
        <>
            <div>
                {/* {wat === [0] && ( */}
                    <>
                        <img src={snackImg.mainImg} alt={eventSnack.id} />
                        <div>
                            
                        </div>
                    </>
                {/* )} */}
                {/* {wat === [1] && (
                    <>
                        <img src={eventSnack.mainImg} alt={eventSnack.id} />
                        <div>
                            
                        </div>
                    </>
                )}
                {wat === [2] && (
                    <>
                        <img src={eventSnack.mainImg} alt={eventSnack.id} />
                        <div>
                            
                        </div>
                    </>
                )} */}
            </div>
        </>
    );
};

export default EventMore;