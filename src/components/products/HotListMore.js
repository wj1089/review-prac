import axios from "axios"
import React,{useEffect, useState} from 'react';
import HotListDetail from "./HotListDetail"


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
                    newItems.reviewPoint,
                    newItems.reviewCount
                )
            }))
            setHotList(ListArr)
        })
    },[])
    console.log(hotList)

    function makeHotList(distributor,description,price,reviewPoint,reviewCount){
        return(
            <>
                <div className="newListText">
                    <p className="newListCompany">{distributor}</p>
                    <p className="newListDescription">{description}</p>
                    <p className="newListPrice">{price}</p>
                    <p className="newListreviewPoint">{reviewPoint}</p>
                    <p className="newList">{reviewCount}</p>
                </div>
            </>
        )
    }

    return (
        <>
            <h3>인기상품 리스트</h3>
            <div>
                <HotListDetail 
                data={hotList}
                containerCss="itemContainer"
                contentCss="contentLayout"
                imgCss="imgLayout"
                />
            </div>
        </>
    );
};

export default HotListMore;