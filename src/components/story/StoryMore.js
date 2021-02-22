import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoryDetail from './StoryDetail';
import authHeader from "../../actions/userAction"

const StoryMore = () => {
    const getAllList = "https://childsnack-test.appspot.com/_ah/api/category/v1/getAllList"
    // const blogLink ="https://childsnack-test.appspot.com/_ah/api/blogcontent/v1/list?count=5"
    const getStoryList = "https://childsnack-test.appspot.com/_ah/api/blogcontent/v1/list?count=10&startCursor=0"

    const [story, setStory] = useState([])
    // const query = window.location.search
    // const urlParams = new URLSearchParams(query)
    // const getId = urlParams.get('id')

    useEffect(()=>{
        axios
        .get(getStoryList, {headers: authHeader()})
        .then((response)=>{
            console.log("스토리 more")
            console.log(response)
            const ListArr = [];
            response.data.item.map((story)=>ListArr.push({
                id:story.id,
                blogUrl:story.blogUrl,
                img:story.thumbnail,
                title:story.title
            }))
            setStory(ListArr)
        })
    },[])
    console.log("story")
    console.log(story)

    return (
        <>
            <h1>스토리 리스트</h1>
            <StoryDetail 
            data={story}
            containerCss="story-Container"
            contentCss="story-contentLayout"
            imgCss="story-imgLayout"
            />
        </>
    );
};

export default StoryMore;