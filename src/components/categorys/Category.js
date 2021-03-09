import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import authHeader from "../../actions/userAction"
import naviLogo from "../../resource/banners/logo_color.png"
import "./category.css";
import "../remote.css"
import DownNav from "../navi/DownNav"
const Category = ({history,containerCss,contentCss,imgCss}) => {

    const CategoryAllURL="https://childsnack-test.appspot.com/_ah/api/category/v1/getAllList"

    const [category, setCategory] = useState([])
    console.log("category")
    console.log(category)

    useEffect(()=>{
        axios
        .get(CategoryAllURL,{headers: authHeader()})
        .then((response)=>{
            console.log("category")
            console.log(response)
            const listArr = []
            response.data.items.map((item)=>{
                if(item.depth === 0 && item.mainDisplay === 1){
                    listArr.push({
                        categoryId : item.categoryId,
                        name : item.name,
                        thumbnail : item.thumbnail
                    })
                }
                console.log(listArr)
            }
            )
            setCategory(listArr)
        })
    },[])
    //장바구니 버튼
    const [cart, setCart] = useState(true)
    const ticket = localStorage.getItem("user")

    // const handleCertificate =() =>{
    //     if(cart === true){
    //     if(ticket === null){
    //         alert("로그인을 먼저 진행해주세요")
    //         history.push('./login')
    //         return
    //     }else{
    //         history.push(`./cart`)
    //     }
    //     }
    // }
        
    return (
        <>
            <div>
                <div className="info-lightTopicArea">
                    <a href="./">
                        <div type="button">
                            <img className="banerLogo" src={naviLogo} alt="igre-logo" />
                        </div>
                    </a>
                    <div type="button">
                        <span class="material-icons">shopping_cart</span>
                    </div>
                </div>

                <div style={{padding:"28px 16px 38px 16px",border:"1px solid", 
                            width:"100%",textAlign:"center"}}>
                    <a href="./totalProducts">
                        <div type="button" style={{fontSize: 14, color: "#000000",marginBottom:13,textAlign:"right", width:"100%"}}>전체 상품보기</div>
                    </a>
                    <div style={{width:"100%"}}>
                        {category.map((category)=>(
                            <a href={`/categoryMore?id=${category.categoryId}`}>
                                <div className="categoryContainer">
                                    <div className="categoryContent">
                                        <img className="categoryImg" src={category.thumbnail} alt={category.categoryId} />
                                        <div style={{fontSize: 16,color: "#000000",fontWeight: 500 }}>{category.name}</div>
                                    </div>
                                </div>
                            </a>
                        ))
                        }
                    </div>
                </div>

                <DownNav/>
            </div>
        </>
    );
};

export default Category;
Category.propTypes={
    data:PropTypes.arrayOf(PropTypes.object),
    containerCss: PropTypes.string,
    contentCss: PropTypes.string,
    imgCss: PropTypes.string
}

PropTypes.defaultType= {
    data:[],
    containerCss:"categoryContainer",
    contentCss:"categoryContent",
    imgCss:"categoryImg"
}

