import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from '../navi/Navbar';
import "./home.css"

import Products from "../products/Products"

const Home = () => {

    const productGetList = "https://childsnack-test.appspot.com/_ah/api/product/v1/getProductList?count=10&startCursor=0";
    const productGetItem = "https://childsnack-test.appspot.com/_ah/api/product/v1/get?id="

    //임의로 넣은 product info
    const [itemInfo, setItemInfo] = useState([])
    console.log("itemInfo")
    console.log(itemInfo)
    
    const [itemList,setItemList] = useState([])
    console.log("itemList")
    console.log(itemList)

    const [itemClick, setItemClick] = useState(false)
    const [certificate, setCertificate] = useState('')

    //물품 리스트 가져오기
    useEffect(()=>{
        console.log("물품 리스트 진입")
        axios
        .get(productGetList)
        .then((response)=>{
            const listArr = [];
            console.log("axios를 타고 response확인")
            console.log(response.data.item)
            response.data.item.map((item)=> listArr.push({
                id: item.productId,
                img: item.thumnail,
                content: makeGetItemElement(
                    item.name,
                    item.description
                    )
                }));
                
                setItemList(listArr)
                setItemClick(true)
                console.log("listArr")
                console.log(listArr)

                // //링크 배열을 알아내서 고유키로 해당 자료에 라우터
                // const proId = listArr[3].id
                // setCertificate(proId)
                // console.log("proId")
                // console.log(proId)
            });
    }, []);


    function makeGetItemElement(name, description) {
        return (
          <>
            <div className="contentText">
              <p className="contentName">{name}</p>
              <p className="contentDescrip">{description}</p>
            </div>
          </>
        );
      }
    

    //물품 가져오기
    // useEffect(()=>{
    //     console.log("물품 가져오기 진입")
    //     if(itemClick){
    //         console.log("Product Detail approach")
    //         alert("제품의 상세페이지로 넘어갑니다.")
    //     }
    //     axios
    //     .get(productGetItem)
    //     .then((response)=>{
    //         const listArr = [];
    //         console.log("물품 가져오기 detail")
    //         console.log(response)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // },[itemInfo.productId,itemInfo.name,itemInfo.price,itemInfo.thumnail])

    return (
        <>
            <div className="full-screen">
                <div className="screen-layout">
                    <div style={{width:"100%",backgroundColor:"lightPink",height:400, border:"1px solid"}} />
                </div>

                    <Navbar />

                <div className="screen-main">
                    <div className="main-center">
                        <header style={{width:"100%",height:400, border:"1px solid", backgroundColor:"lightgray"}}>
                            <div>
                                header Bener
                            </div>
                        </header>



                        <body style={{ border:"1px solid"}}>
                            <div style={{display:"flex", alignContent:"center",justifyContent:"center", height:400, border:"1px solid",textAlign:"center"}}>
                                <Products 
                                    data={itemList}
                                    containerCss="itemContainer"
                                    contentCss="contentLayout"
                                    imgCss="imgLayout"

                                />
                            </div>
                            <div style={{ height:400, border:"1px solid",textAlign:"center"}}>
                                Slider
                            </div>
                            <div style={{ height:400, border:"1px solid",textAlign:"center"}}>
                                Slider
                            </div>
                        </body>

                        


                        <footer style={{backgroundColor:"lightBlue", height:400, border:"1px solid"}}>
                            <div>
                                footer
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Home);

