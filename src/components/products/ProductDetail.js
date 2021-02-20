import React,{useEffect, useState} from 'react';
import axios from 'axios'
import Navbar from "../navi/Navbar"

const ProductDetail = () => {
    
    const productGetItem = "https://childsnack-test.appspot.com/_ah/api/product/v1/get?id="
    
    const query = window.location.search
    console.log(query)
    
    const urlParams = new URLSearchParams(query)
    console.log(urlParams)

    const getId = urlParams.get('id')
    console.log(getId)



    const [infoMenu, setInfoMenu] = useState([])
    const [toggle, setToggle] = useState(1)
    const [able, setAble] = useState([infoMenu])







    const onClickDetailInfo = (index) =>{
        // e.preventDefault()
        console.log(index)
        setToggle(index)
        // setAble(able)

        // if(infoMenu === "productExplain"){
        //     console.log("productExplain")

        // }
        // else if (infoMenu === "productInfo"){
        //     console.log("productInfo")

        // }
        // else if (infoMenu === "review"){
        //     console.log("review")
            
        // }
    }


    useEffect(()=>{
        console.log("디테일 왔음")
        console.log("data")
        axios
        .get(productGetItem + getId)
        .then((response)=>{
            console.log("response")
            console.log(response)
            // response.data.map((demo)=>listArr.push({
            //     id
            // }))
            const baseUrl = response.data

            const altId = baseUrl.productId
            const headImg = baseUrl.detailImage
            const distributor = baseUrl.distributor
            const description = baseUrl.description
            const name = baseUrl.name
            const price = baseUrl.price
            const retailPrice = baseUrl.retailPrice
            const shippingFee = baseUrl.shippingCompany.shippingFee
            const detailImg = baseUrl.detailImage
            const exchangeInfo = baseUrl.exchangeInfo
            const paymentInfo = baseUrl.paymentInfo
            const shippingInfo = baseUrl.shippingInfo
            const serviceInfo = baseUrl.serviceInfo

            const detailInfo = {altId,headImg,distributor,description,name,shippingInfo,
                price,retailPrice,shippingFee,detailImg,exchangeInfo,paymentInfo,serviceInfo}
            console.log(detailInfo)
            setInfoMenu(detailInfo)
        })
    },[])
    console.log("infoMenu")
    console.log(infoMenu)



    return (
        <>
            <div>
                <Navbar />
                <h4>Product Detail</h4>
                <div 
                    style={{
                    backgroundColor:"lightYellow",
                    width:500, 
                    border:"1px solid"}}>
                    <div style={{width:"100%", height:150, border:"1px solid", textAlign:"center"}}>image
                        <img src={infoMenu.headImg} alt={infoMenu.altId} />
                    </div>
                    <div style={{border:"1px solid"}}>
                        <p>company{infoMenu.distributor}</p>
                        <p>product name{infoMenu.name}</p>
                        <p>product discription {infoMenu.description}</p>
                        {/* <p>product name {infoMenu.name}</p> */}
                        <div style={{border:"1px solid", display:"flex"}}>
                            <p>product price {infoMenu.price}</p> 
                            <p>product retailPrice {infoMenu.retailPrice}</p> 
                        </div>
                        <div style={{display:"flex", border:"1px solid"}}>
                            <p>배송비{infoMenu.shippingFee}</p>
                            <p>shipping fee</p>
                            <p>shipping place</p>
                        </div>
                    </div>

                    <div style={{width:"100%"}}>
                        <div style={{ display:"flex",width:"100%"}}>
                            <div style={{width:100}}  type="button" id="productExplain" className={toggle === 1?"able":"disable"} onClick={()=>onClickDetailInfo(1)}>상품설명</div>
                            <div style={{width:100}}  type="button" id="productInfo" className={toggle === 2?"able":"disable"} onClick={()=>onClickDetailInfo(2)}>상세정보</div>
                            <div style={{width:100}}  type="button" id="review"  className={toggle === 3?"able":"disable"} onClick={()=>onClickDetailInfo(3)}>리뷰</div>
                        </div>
                        <div>
                            {toggle === 1 &&(
                                <>
                                    <img src={infoMenu.detailImg} alt={infoMenu.productId} />
                                </>
                            )}
                            {toggle === 2 &&(
                                <>
                                    <p><b>필수표기정보</b><br />
                                    {infoMenu.serviceInfo}</p>

                                    <p><b>문의관련정보</b><br />
                                    {infoMenu.shippingInfo}</p>

                                    <p><b>주문취소 안내</b><br />
                                    {infoMenu.paymentInfo}</p>

                                    <p><b>교환 및 환불안내</b><br />
                                    {infoMenu.exchangeInfo}</p>
                                </>
                            )}
                            {toggle === 3 &&(
                                <>
                                    <h1>리뷰</h1>
                                    <div style={{ display:"flex",width:"100%",justifyContent:"center"}}>
                                        <p>구매자평점({0})</p>
                                        <div>point{0}</div>
                                    </div>
                                    <div>
                                        <div>


                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>  
        </>
    );
};

export default ProductDetail;