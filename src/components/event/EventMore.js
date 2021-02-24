import React, { useEffect, useState } from 'react';
import axios from "axios"
import EventDetail from './EventDetail';

const EventMore = ({history}) => {

    const eventBener = "https://childsnack-test.appspot.com/_ah/api/event/v1/getEvent?id="
    const [eventSnack, setEventSnack] = useState([])
    const [snackImg, setSnackImg] = useState('')

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')
    console.log(getId)

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }

    useEffect(()=>{
        axios
        .get(eventBener + getId)
        .then((response)=>{
            const mainImg = response.data.detailImg
            const listArr = []
            if(response.data.products){
            response.data.products.map((eventlist)=>listArr.push({
                id: eventlist.productId,
                img:eventlist.thumnail,
                content:makeEventElement(
                    eventlist.name,
                    eventlist.description,
                    eventlist.distributor,
                    eventlist.retailPrice,
                    eventlist.price
                )
            }))
            }
                setSnackImg(mainImg)
                setEventSnack(listArr)
        })
        },[])

        
    function makeEventElement (name,distributor,description,retailPrice,price){
        return(
            <>
                <div>
                    <p className="eventCompany">{distributor}</p>
                    <p className="eventDescription">{description}</p>
                    <p className="eventName">{name}</p>
                    <p className="eventPrice">{price}</p>
                    <p className="eventRetailPrice">{retailPrice}</p>
                </div>
            </>
        )
    }

    return (
        <>
            <button type="button" onClick={goBack}>뒤로가기</button>
            <div>
                <h1>이벤트 리스트페이지</h1>
                <img src={snackImg} alt={eventSnack.id} />
                <EventDetail 
                    data={eventSnack} 
                    containerCss="itemContainer"
                    contentCss="contentLayout"
                    imgCss="imgLayout"
                />
            </div>
        </>
    );
};

export default EventMore;