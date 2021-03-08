import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NewDetail from './NewDetail';
import DownNav from "../navi/DownNav"
import "./product.css"
import "../remote.css"

const NewArrive = ({history}) => {
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
                    newItems.reviewCount,
                    newItems.retailPrice
                )
            }))
            setNewList(ListArr)
        })
    },[])
    console.log(newlist)

    function makeNewList(distributor,description,price,reviewPoint,reviewCount,retailPrice){
        return(
            <>
                <div className="newListText">
                    <p className="newListCompany">{distributor}</p>
                    <p className="newListDescription">{description}</p>
                    <div style={{display:"flex"}}>
                        <b><p className="newListPrice">{price}</p></b>
                        <p className="newListRetailPrice">{retailPrice}</p>
                    </div>
                    <div style={{display:"flex"}}>
                        <p className="newListreviewPoint">별 : <b>{reviewPoint}</b></p>
                        <p className="newList"> 리뷰 : {reviewCount}</p>
                    </div>
                </div>
            </>
        )
    }
    //장바구니 버튼
    const [cart, setCart] = useState(true)
    const ticket = localStorage.getItem("user")

    const handleCertificate =() =>{
        setCart(true)
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

    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./"><div><i class="fas fa-arrow-left"></i></div></a>
                <div className="info-topic">신상품</div>
                <div type="button" onClick={handleCertificate}>
                    <span class="material-icons">shopping_cart</span>
                </div>
            </div>
            <div style={{padding:"28px 0 52px 0"}}>
                <div style={{display:"flex",width:"100%",textAlign:"center"}}>
                    <NewDetail 
                    data={newlist}
                    containerCss="itemContainer"
                    contentCss="contentLayout"
                    imgCss="imgLayout"
                    />
                </div>
            </div>
            <DownNav />
        </>
    );
};

export default NewArrive;