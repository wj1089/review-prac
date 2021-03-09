import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DownNav from "../navi/DownNav"
import "./category.css"



const CategoryMore = ({history}) => {

    const categoryGetUrl = "https://childsnack-test.appspot.com/_ah/api/category/v1/getList?id=";
    
    const [categoryList, setCategoryList] = useState([])
    const [itemsList, setItemsList] = useState([])
    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    useEffect(()=>{
        axios
        .get(categoryGetUrl + getId)
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
            setItemsList(listArr[0].products)
        })
    },[])
    
    console.log("categoryList")
    console.log(categoryList)
    console.log("itemsList")
    console.log(itemsList)


    // useEffect(()=>{
    //     axios
    //     .get()
    //     .then()
    //     .catch((error)=>[
    //         console.log(error)
    //     ])
    // },[])


    //장바구니 버튼
    const [cart, setCart] = useState(true)
    const ticket = localStorage.getItem("user")

    const handleCertificate =() =>{
        if(cart === true){
        if(ticket === null){
            alert("로그인을 먼저 진행해주세요")
            history.push('./login')
            return
        }else{
            history.push(`./cart`)
        }
        }
    }
    
    function comma(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      }


    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./category">
                    <i class="fas fa-arrow-left" style={{outline:"none", textDecoration:"none"}}/>
                </a>
                {categoryList.map((list)=>(<div className="info-topic">{list.fullName}</div>))}

                <div type="button" onClick={handleCertificate}>
                    <span class="material-icons">shopping_cart</span>
                </div>
            </div>

            <div style={{display:"flex",borderBottom:"1px solid #e0e0e0"}}>
                {categoryList.map((list)=>(<div className="productTopNav">{list.name}</div>))}
            </div>

            <div style={{padding:"28px 16px 52px 16px"}}>
                <div style={{width:"100%",textAlign:"center"}}>

                        {itemsList.map((items)=>(
                            <a href={`/productDetail?id=${items.productId}`}>
                                <div className="cateItemContainer">
                                    <div className="contentLayout">
                                        <img className="imgLayout" src={items.thumnail} alt={items.productId} />
                                        <div style={{textAlign:"left"}}>
                                            <div style={{fontSize: 12, color: "#757575", marginTop:6,textAlign: "left"}}>{items.distributor}</div>
                                            <div 
                                            style={{overflow: "hidden", textOverflow: "ellipsis", 
                                            whiteSpace: "nowrap",  fontSize: 14,color: "#424242",
                                            textAlign: "left",fontWeight: 500
                                            }}>{items.name}</div>
                                        </div>
                                        <div style={{display:"flex", alignItems:"center"}}>
                                            <p style={{color: "#000000", fontSize: 16, fontWeight:"bold", marginRight:5}}>{comma(items.price)}</p>
                                            <p style={{color: "#bdbdbd", fontSize: 12,textDecoration:"line-through"}}>{comma(items.retailPrice)}</p>
                                        </div>
                                        <div style={{display:"flex", alignItems:"center"}}>
                                            <p style={{color: "#000000", fontSize: 12, fontWeight:"bold", marginRight:5}}>별 : {items.reviewPoint.toFixed(1)}</p>
                                            <p style={{color: "#757575", fontSize: 12, fontWeight:"bold"}}>리뷰 {items.reviewCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        
                </div>
            </div>
            <DownNav/>
        </>
        );
    };  


                    

export default CategoryMore;

CategoryMore.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerCss : PropTypes.string,
    contentCss : PropTypes.string,
    imgCss: PropTypes.string,
}
