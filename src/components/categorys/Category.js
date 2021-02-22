import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import CategoryDetail from './CategoryDetail';
import "./category.css";

const Category = ({history}) => {

    const CategoryURL="https://childsnack-test.appspot.com/_ah/api/category/v1/getMainList"

    const [category, setCategory] = useState([])

    // const [linkClick, setLinkClick] = useState('')

    // const ItemMenuLink =()=>{
    //     setLinkClick(!linkClick)
    //     console.log(linkClick)
    // }

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }


    // useEffect(()=>{
    //     axios
    //     .get(CategoryURL,{headers: authHeader()})
    //     .then((response)=>{
    //         if(response.data.items){
    //             const ListArr = []
    //             response.data.items.map((category)=>ListArr.push({
    //                 cateId:category.categoryId,
    //                 img:category.thumbnail,
    //                 fullName:category.fullName,
    //                 name:category.name
    //             }))
    //             setCategory(ListArr)
    //             console.log(ListArr)
    //         }
    //     })
    // },[])

        useEffect(()=>{
            axios
            .get(CategoryURL,{headers: authHeader()})
            .then((response)=>{
                console.log(response)
                // if(response.data.items){
                const ListArr = []
                response.data.items.map((category)=>ListArr.push({
                    cateId:category.categoryId,
                    img:category.thumbnail,
                    fullName:category.fullName,
                    name:category.name
                }))
                setCategory(ListArr)
                console.log(ListArr)
                // }
            })
        },[])


    return (
        <>
            <div>
                <h1>Categorys</h1>
                <button type="button" onClick={goBack}>뒤로가기</button>
                <div type="button" style={{textAlign:"center", width:"100%",height:50, border:"1px solid", backgroundColor:"lightpink"}}>
                    전체보기
                </div>
                <div style={{border:"1px solid",display:"flex"}}>
                    <CategoryDetail 
                        data={category}
                        containerCss="categoryContainer"
                        contentCss="categoryContent"
                        imgCss="categoryImg"
                    />
                </div>
            </div>
        </>
    );
};

export default Category;