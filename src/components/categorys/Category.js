import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"

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


    useEffect(()=>{
        axios
        .get(CategoryURL,{headers: authHeader()})
        .then((response)=>{
            const ListArr = []
            console.log(response)
            response.data.items.map((category)=>ListArr.push({
                cateId:category.categoryId,
                fullName:category.fullName,
                img:category.thumbnail,
                name:category.name
            }))
            setCategory(ListArr)
            console.log(ListArr)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response)
        })
    },[])

    return (
        <>
            <div>
                <h1>Categorys</h1>

                <button type="button" onClick={goBack}>뒤로가기</button>

                <div style={{border:"1px solid"}}>
                    <h3>이미지</h3>
                    {/* {category[0].img} */}
                    <h3>풀이름</h3>
                    {/* {category[0].fullName} */}
                    <h3>이름</h3>
                    {/* {category[0].name} */}
                </div>
            </div>
        </>
    );
};

export default Category;