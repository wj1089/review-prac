import axios from "axios"
import React,{useEffect, useState} from 'react';
import HotListDetail from "./HotListDetail"
import DownNav from "../navi/DownNav"
import "../remote.css"

const HotListMore = ({history}) => {

    const getAllList = "https://childsnack-test.appspot.com/_ah/api/category/v1/getAllList"

    const [hotList, setHotList] = useState([])

    useEffect(()=>{
        axios
        .get(getAllList)
        .then((response)=>{
            console.log(response)
            const ListArr = [];
            response.data.items[5].products.map((newItems)=>ListArr.push({
                id:newItems.productId,
                img:newItems.thumnail,
                content:makeHotList(
                    newItems.distributor,
                    newItems.description,
                    newItems.price,
                    newItems.retailPrice,
                    newItems.reviewPoint.toFixed(1),
                    newItems.reviewCount
                )
            }))
            setHotList(ListArr)
        })
    },[])
    console.log(hotList)

    function makeHotList(distributor,description,price,reviewPoint,reviewCount,retailPrice){
        return(
            <>
                <div className="newListText">
                    <p className="newListCompany">{distributor}</p>
                    <p className="newListDescription">{description}</p>
                    <div style={{display:"flex"}}>
                        <p className="newListPrice">{price}</p>
                        <p className="newListRetailPrice">{retailPrice}</p>
                    </div>
                    <div style={{display:"flex"}}>
                        <p className="newListreviewPoint">별 : {reviewPoint}</p>
                        <p className="newList">리뷰 : {reviewCount}</p>
                    </div>
                </div>
            </>
        )
    }
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

    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./">
                    <div>
                        <i class="fas fa-arrow-left" 
                            style={{outline:"none", textDecoration:"none"}}
                        />
                    </div>
                </a>
                <div className="info-topic">인기상품</div>
                <div type="button" onClick={handleCertificate}>
                    <span class="material-icons">shopping_cart</span>
                </div>
            </div>
            <div style={{padding:"28px 0 52px 0"}}>
                <div style={{display:"flex",width:"100%",textAlign:"center"}}>
                    <HotListDetail 
                        data={hotList}
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

export default HotListMore;