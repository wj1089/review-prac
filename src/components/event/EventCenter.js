import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"

const EventCenter = () => {
    const EventURL = "https://childsnack-test.appspot.com/_ah/api/event/v1/getAllEvent?type=pc"

    const [events, setEvents] = useState([])

    useEffect(()=>{
        axios
        .get(EventURL,{headers: authHeader()})
        .then((response)=>{
            console.log(response)
            const ListArr = []
            response.data.items.map((event)=>ListArr.push({
                id:event.id,
                name:event.name,
                img:event.thumbnail
            }))
            setEvents(ListArr)
            console.log(ListArr)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])
    
    return (
        <>
            <h1>EventCenter</h1>
        </>
    );
};

export default EventCenter;