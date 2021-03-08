import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryDetail from './CategoryDetail';
import PropTypes from 'prop-types';
import "./category.css"

const CategoryMore = ({
    history, 
    containerCss,
    contentCss,
    imgCss
}) => {

    const categoryAllUrl = "https://childsnack-test.appspot.com/_ah/api/category/v1/getList?id=6242045807034368";
    
    const [categoryList, setCategoryList] = useState([])
    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    //뒤로가기
      const goBack = () =>{
        history.goBack();
    }

    useEffect(()=>{
        axios
        .get(categoryAllUrl)
        .then((response)=>{
            console.log("get id list 들어옴")
            console.log(response.data)
            const listArr = []
            response.data.items.map((data)=>{
                if(data.depth === 1){
                    listArr.push({ 
                        categoryId : data.categoryId,
                        name : data.name,
                        fullName: data.fullName,
                        products : data.products
                    })
                }
            })
            setCategoryList(listArr)
            // setDepth(depths)
        })
    },[])
    
    console.log("categoryList")
    console.log(categoryList)

    return (
        <>
            <div>
                <button type="button" onClick={goBack}>뒤로가기</button>
                    category More
                <div style={{border:"1px solid", display:"flex"}}>
                    {/* <div>{categoryList}</div> */}


                </div>
                </div>
            </>
        );
    };  


                    

export default CategoryMore;

CategoryDetail.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerCss : PropTypes.string,
    contentCss : PropTypes.string,
    imgCss: PropTypes.string,
}

PropTypes.defaultType = {
    data :[],
    containerCss : 'cateItemContainer',
    contentCss : 'contentLayout',
    imgCss : 'imgLayout'
}
