import React,{useEffect, useState} from 'react';
import axios from 'axios'
import Navbar from "../navi/Navbar"
import authHeader from "../../actions/userAction"
import {Modal, Button} from "react-bootstrap"

const ProductDetail = ({history}) => {
    
    const productGetItem = "https://childsnack-test.appspot.com/_ah/api/product/v1/get?id="
    const addItemURL = "https://childsnack-test.appspot.com/_ah/api/cart/v1/insert"
    const cartUrl = 'https://childsnack-test.appspot.com/_ah/api/cart/v1/getCartList';

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    const [infoMenu, setInfoMenu] = useState([])
    const [toggle, setToggle] = useState(1)
    const [able, setAble] = useState(false)
    const [cartList, setCartList] = useState([]) 

    const [show, setShow] = useState(false);
    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}
    const [count, setCount] = useState(1)


    const turnToNum = JSON.stringify(infoMenu.price)
    const countNum = parseInt(count)
    const calcItems = parseInt(turnToNum)*countNum;


    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }

    const increaseNum = ()=>{
        setCount(count +1)
    }
    const decreaseNum = ()=>{
        setCount(count -1)
        if(count <= 0){
            setCount(0)
        }
    }

    const addProduct = () =>{
        setAble(!able)
        console.log("추가하기")
        console.log(able)
        setShow(true)
        axios
        // headers: authHeader()
        .post(addItemURL,{
            orderItems: [ // 상품정보 목록
            {
                productId: infoMenu.productId,
                optionId: infoMenu.optionId,
                quantity: count
            }
            ],
        })
        .then((response)=>{
            console.log("추가버튼 useEffect")
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
            console.log(error.response.message)
        })
    }

    const onClickDetailInfo = (index) =>{
        console.log(index)
        setToggle(index)
    }


    useEffect(()=>{
        axios
        .get(productGetItem + getId)
        .then((response)=>{

            console.log(response)
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
            const addressInfo = baseUrl.madeInfo
            const listArr = []
            const optionId = baseUrl.options.map((option)=>listArr.push({
                optionId : option.optionId
            }))

            const detailInfo = {altId,headImg,distributor,description,name,shippingInfo,addressInfo,optionId,
                price,retailPrice,shippingFee,detailImg,exchangeInfo,paymentInfo,serviceInfo}

            console.log(detailInfo)
            setInfoMenu(detailInfo)
        })
    },[])
    console.log("infoMenu.optionId")
    console.log(infoMenu.optionId)
    console.log("infoMenu.productId")
    console.log(infoMenu.productId)

    // useEffect(()=>{
    //     console.log("카트에 진입")
    //     axios
    //     .get(cartUrl, {headers: authHeader()})
    //     .then((response)=>{
    //         console.log("cart response 내부")
    //         console.log(response)
    //         const listArr = []
    //         response.data.items.map((cart)=>listArr.push({
    //             id: cart.productId,
    //             img: cart.thumnail,
    //             // content: makeCartelement(
    //             //     cart.originClassification,
    //             //     cart.name,
    //             //     cart.retailPrice,
    //             //     cart.price,
    //             //     )
    //             }))
    //             setCartList(listArr)
    //     })
    //     .catch((error)=>{
    //         console.log("error")
    //         console.log(error)
    //     })
    // },[])

    
    // function makeCartelement(name,){
    //     return(
    //         <>
    //             <input type="checkBox" style={{width:30,height:30, border:"1px solid"}} onClick={handleEachItemCheck} />
    //             <div style={{display:"flex",alignItems:"center", float:"right", width:"100%", border:"1px solid"}}>
    //                 {/* company */}
    //                 <h3 className="cartItemName">{name}</h3>
    //                 <div style={{textAlign:"right"}}>
    //                 {/* shipping fee */}
    //                     <p className="cartItemFee">{}</p>
    //                     <p>제주, 도서지역 추가 3,000원(개별 연락)</p>
    //                 </div>
    //                 <div>
    //                     {/* cartProductName */}
    //                     <p className="cartProductName">{}</p>
    //                     {/* cartProductDiscrip */}
    //                     <p className="carItemIngred">{}</p>
    //                     <div style={{display:"flex"}}>
    //                         <button type="button" onClick={decreaseNum}>-</button>
    //                         <div>{count}</div>
    //                         <button type="button" onClick={increaseNum}>+</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }


    return (
        <>
            <div>
                <Navbar />
                <h4>Product Detail</h4>
                <button type="button" onClick={goBack}>뒤로가기</button>
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
                        <div style={{border:"1px solid"}}>
                            <p>배송비{infoMenu.shippingFee}</p>
                            <p>제주, 도서지역 추가 3,000원</p>
                            {/* <p>shipping place{infoMenu.addressInfo}</p> */}
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

                <Button variant="primary" onClick={addProduct}>
                추가하기
                </Button>
                <Modal 
                    show={show} 
                    data-toggle="modal"
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>상품선택</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <div>
                                <div>{infoMenu.name}</div>
                                <div>
                                    <div style={{display:"flex", justifyContent:"right"}}>
                                        <p>{infoMenu.price}</p>
                                        <button onClick={decreaseNum}>-</button>{count}<button onClick={increaseNum}>+</button>
                                    </div>
                                    <p>총 금액 : {calcItems}</p>
                                </div>
                                <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                                    <button type="button" onClick={addProduct}>장바구니 담기</button>
                                </div>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>   





            </div>  
        </>
    );
};

export default ProductDetail;