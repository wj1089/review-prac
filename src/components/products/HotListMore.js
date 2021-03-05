import axios from "axios"
import React,{useEffect, useState} from 'react';
import HotListDetail from "./HotListDetail"
import "../remote.css"

const HotListMore = () => {

    const getAllList = "https://childsnack-test.appspot.com/_ah/api/category/v1/getAllList"

    const [hotList, setHotList] = useState([])

    useEffect(()=>{
        axios
        .get(getAllList)
        .then((response)=>{
            console.log(response)
            const ListArr = [];
            response.data.items[5].products.map((newItems)=>ListArr.push({
                id:newItems.productId,
                img:newItems.thumnail,
                content:makeHotList(
                    newItems.distributor,
                    newItems.description,
                    newItems.price,
                    newItems.retailPrice,
                    newItems.reviewPoint.toFixed(1),
                    newItems.reviewCount
                )
            }))
            setHotList(ListArr)
        })
    },[])
    console.log(hotList)

    function makeHotList(distributor,description,price,reviewPoint,reviewCount,retailPrice){
        return(
            <>
                <div className="newListText">
                    <p className="newListCompany">{distributor}</p>
                    <p className="newListDescription">{description}</p>
                    <div style={{display:"flex"}}>
                        <p className="newListPrice">{price}</p>
                        <p className="newListRetailPrice">{retailPrice}</p>
                    </div>
                    <div style={{display:"flex"}}>
                        <p className="newListreviewPoint">별 : {reviewPoint}</p>
                        <p className="newList">리뷰 : {reviewCount}</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./"><button>뒤로</button></a>
                <div className="info-topic">인기상품</div>
            </div>
            <div style={{padding:"28px 0 52px 0"}}>
                <div style={{display:"flex",width:"100%",textAlign:"center"}}>
                    <HotListDetail 
                    data={hotList}
                    containerCss="itemContainer"
                    contentCss="contentLayout"
                    imgCss="imgLayout"
                    />
                </div>
            </div>
        </>
    );
};

export default HotListMore;