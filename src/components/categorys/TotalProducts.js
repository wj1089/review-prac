import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import CategoryDetail from './CategoryDetail';

const TotalProducts = ({history}) => {

    const TotalList = "https://childsnack-test.appspot.com/_ah/api/product/v1/getProductList?count=20&startCursor=0"
    const [productTotal, setProductTotal] = useState([])
    
    
    
    
    useEffect(()=>{
        axios
        .get(TotalList,{headers: authHeader()})
        .then((response)=>{
            console.log("전체가져오기")
            console.log(response)
            const listArr = []
            response.data.item.map((totalList)=>listArr.push({
                id: totalList.productId,
                img: totalList.thumnail,
                content: makeTotalListElement(
                    totalList.name,
                    totalList.description,
                    totalList.distributor,
                    totalList.retailPrice,
                    totalList.price
                )
            }))
            setProductTotal(listArr)
            console.log("productTotal")
            console.log(productTotal)
        })
    },[])

    function makeTotalListElement(name,description,distributor,retailPrice,price){
        return(
            <>
                <div>
                    <p>{name}</p>
                    <p>{description}</p>
                    <p>{distributor}</p>
                    <div style={{display:"flex"}}>
                        <p>{retailPrice}</p>
                        <p>{price}</p>
                    </div>
                </div>
            </>
        )
    }

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }


    return (
        <>
            <div style={{width:500, border:"1xp solid"}}>
                <h1>Total Products</h1>
                <button type="button" onClick={goBack}>뒤로가기</button>
                <div>
                    <CategoryDetail
                        data={productTotal}
                        containerCss="categoryContainer"
                        contentCss="categoryContent"
                        imgCss="categoryImg"
                    />
                </div>
            </div>
        </>
    );
};

export default TotalProducts;