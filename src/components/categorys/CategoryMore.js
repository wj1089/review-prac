import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryDetail from './CategoryDetail';

const CategoryMore = ({history}) => {

    const categoryAllUrl = "https://childsnack-test.appspot.com/_ah/api/category/v1/getList?id=";
    const [cateList, setCateList] = useState([])
    // const [cateList, setCateList] = useState([])
    // const [cateList, setCateList] = useState([])

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    //뒤로가기
      const goBack = () =>{
        history.goBack();
    }

    useEffect(()=>{
        axios
        .get(categoryAllUrl+getId)
        .then((response)=>{
            console.log("get id list 들어옴")
            console.log(response)
            const listArr = []
            // const shippingFee = response.data.items.products.shippingCompany.shippingFee
            response.data.items[0].products.map((category)=>listArr.push({
                id:category.productId,
                // cateId: category.categoryId,
                // fullNo:category.fullNo,
                // fullName:category.fullName,
                name:category.name,
                mainDisplay:category.mainDisplay,
                content:makeCategoryElement(
                    category.thumnail,
                    category.distributor,
                    category.name,
                    category.retailPrice,
                    category.price,
                    category.reviewCount,
                    category.reviewPoint,
                )
            }))
            setCateList(listArr)

            // response.data.items[1].products.map((category)=>listArr.push({
            //     id: category.categoryId,
            //     fullName:category.fullName,
            //     name:category.name,
            //     mainDisplay:category.mainDisplay,
            //     // content:makeCategoryElement(
            //     //     category.products.thumnail,
            //     //     category.products.distributor,
            //     //     category.products.name,
            //     //     category.products.retailPrice,
            //     //     category.products.price,
            //     //     category.products.reviewCount,
            //     //     category.products.reviewPoint,
            //     // )
            // }))
            // setCateList(listArr)

            // response.data.items[2].products.map((category)=>listArr.push({
            //     id: category.categoryId,
            //     fullName:category.fullName,
            //     name:category.name,
            //     mainDisplay:category.mainDisplay,
            //     content:makeCategoryElement(
            //         category.products.thumnail,
            //         category.products.distributor,
            //         category.products.name,
            //         category.products.retailPrice,
            //         category.products.price,
            //         category.products.reviewCount,
            //         category.products.reviewPoint,
            //     )
            // }))
            // setCateList(listArr)
        })
    },[])
    console.log("cateList")
    console.log(cateList)

    function makeCategoryElement(thumnail,distributor,name,retailPrice,price,reviewCount,reviewPoint){
        return(
            <>
                <div>
                    <div className="category-thumnail">{thumnail}</div>
                    <p className="category-distributor">{distributor}</p>
                    <p className="category-name">{name}</p>

                    <div style={{display:"flex"}}>
                        <p className="category-retailPrice">{retailPrice}</p>
                        <p className="category-price">{price}</p>
                    </div>

                    <div style={{display:"flex"}}>
                        <p className="category-reviewCount">{reviewCount}</p>
                        <p className="category-reviewPoint">{reviewPoint}</p>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <div>
                <button type="button" onClick={goBack}>뒤로가기</button>
                category More
                <div style={{border:"1px solid", width:500}}>
                    <h1>{cateList.name}</h1>
                    <h3>{cateList.fullName}</h3>
                    <CategoryDetail 
                        data={cateList}
                        containerCss="itemContainer"
                        contentCss="contentLayout"
                        imgCss="imgLayout"
                    />
                </div>
            </div>
        </>
    );
};

export default CategoryMore;