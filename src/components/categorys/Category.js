import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import CategoryMenu from './CategoryMenu';
import CategoryMore from './CategoryMore';

import "./category.css";

const Category = ({history}) => {

    const CategoryURL="https://childsnack-test.appspot.com/_ah/api/category/v1/getMainList"
    const CategoryAllURL="https://childsnack-test.appspot.com/_ah/api/category/v1/getAllList"

    const [category, setCategory] = useState([])

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }

        useEffect(()=>{
            axios
            .get(CategoryURL,{headers: authHeader()})
            .then((response)=>{
                console.log("get mainList")
                console.log(response)
                const ListArr = []
                response.data.items.map((category)=>ListArr.push({
                    id:category.categoryId,
                    img:category.thumbnail,
                    fullName:category.fullName,
                    name:category.name
                }))
                setCategory(ListArr)
                console.log(ListArr)
            })
        },[])

      
    return (
        <>
            <div>
                <h1>Categorys</h1>
                <button type="button" onClick={goBack}>뒤로가기</button>
                <a href="./totalProducts">
                    <button type="button" style={{textAlign:"center", width:"100%",height:50, border:"1px solid", backgroundColor:"lightpink"}}>
                        전체보기
                    </button>
                </a>
                <div style={{border:"1px solid",display:"flex"}}>
                    <CategoryMenu
                        data={category}
                        containerCss="categoryContainer"
                        contentCss="categoryContent"
                        imgCss="categoryImg"
                    />
                    {/* <CategoryMore 
                    data={category}
                    containerCss="categoryContainer"
                    contentCss="categoryContent"
                    imgCss="categoryImg"
                    /> */}
                </div>
            </div>
        </>
    );
};

export default Category;