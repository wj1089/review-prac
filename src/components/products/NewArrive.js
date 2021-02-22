import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./list.css"
import NewDetail from './NewDetail';

const NewArrive = () => {
    const getAllList = "https://childsnack-test.appspot.com/_ah/api/category/v1/getAllList"

    const [newlist, setNewList] = useState([])

    useEffect(()=>{
        axios
        .get(getAllList)
        .then((response)=>{
            console.log(response)
            const ListArr = [];
            response.data.items[7].products.map((newItems)=>ListArr.push({
                id:newItems.productId,
                img:newItems.thumnail,
                content:makeNewList(
                    newItems.distributor,
                    newItems.description,
                    newItems.price,
                    newItems.reviewPoint,
                    newItems.reviewCount
                )
            }))
            setNewList(ListArr)
        })
    },[])
    console.log(newlist)

    function makeNewList(distributor,description,price,reviewPoint,reviewCount){
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
        <p>
           <div>
               <h3>신상품 리스트</h3>
               <div>
                    <NewDetail 
                    data={newlist}
                    containerCss="item-Container"
                    contentCss="item-contentLayout"
                    imgCss="item-imgLayout"
                    />
                </div>
            </div> 
        </p>
    );
};

export default NewArrive;