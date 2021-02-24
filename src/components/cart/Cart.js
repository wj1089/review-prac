import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import "./cart.css"
import authHeader from "../../actions/userAction"
import Products from "../products/Products"
import CartItem from './CartItem';
import OrderNav from '../navi/OrderNav';
import {Modal, Button} from "react-bootstrap"
import PropTypes from 'prop-types';

const Cart = ({
    history,props,
    containerLayout,
    contentLayout,
    imgLayout}) => {
    const cartUrl = 'https://childsnack-test.appspot.com/_ah/api/cart/v1/getCartList';
    const removeUrl = "https://childsnack-test.appspot.com/_ah/api/cart/v1/delete?id=";
    const orderUrl = "https://childsnack-test.appspot.com/_ah/api/order/v1/insert";
    const updateUrl = "https://childsnack-test.appspot.com/_ah/api/cart/v1/update";
    const receiverUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    const [cartList, setCartList] = useState([]) 

    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // console.log("cartList.shippingFee")
    // console.log(cartList)

    // const [checkItem, setCheckItem] = useState(false)
    // const [checkAll, setCheckAll] = useState(false)


    const [removeMenu, setRemoveMenu] = useState(false)
    const [addMenu,setAddMenu] = useState(true)

    const [count, setCount] = useState(1)

    const increaseNum = ()=>{
        setCount(count +1)
    }
    const decreaseNum = ()=>{
        setCount(count -1)
        if(count <= 0){
            setCount(0)
        }
    }

    const [show, setShow] = useState(false);
    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}

    
    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }

    const [check, setCheck] = useState([])

    const handleCheckBox = () =>{
        setCheck(check)
        console.log(check)

    }





    const productRef = React.useRef(false)
    console.log("productRef")
    console.log(productRef)

    //아이템 전체 체크
    // useEffect(()=>{
    //     if(checkAll===true){
    //         setCheckItem(checkAll)
    //         return productRef.current.children[0].checked === true && productRef.current.children[0].value === true
    //     }else{
    //         setCheckItem(checkAll)
    //     }
    //     // if(checkAll === true){

    //     // }
    // }, [checkAll])

    // console.log("checkAll")
    // console.log(checkAll)
    // console.log("CheckItem")
    // console.log(checkItem)

    // const handleItemListCheck = (e) =>{
    //     setCheckAll(e.target.checked)

    //     if(checkAll === true){
    //         setCheckItem(productRef.current.children[0].checked === true)
    //         console.log("on")
    //         console.log(checkItem)
    //     }
        // console.log("handleItemListCheck")
        // console.log(checkAll)
    // }

    // const checkBoxOnChange = (e) =>{
    //     setCheckItem(e.target.checked)

    //     // if(checkItem === ){
    //     // }
    //     // console.log(e.target.checked)
    //     // console.log("checkBoxOnChange")
    //     // console.log(checkItem)
    //     // console.log("event")
    //     // console.log(e)
    // }




    //항목삭제
    const removeItem = () =>{
        setRemoveMenu(true)
        // const cartid = cartList.cartId
        console.log("cartid")
        console.log(cartList)
        axios
        .delete(removeUrl + cartList)
        .then((response)=>{
            console.log("삭제 들어왔음")
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    // console.log(cartList)

    //항목 추가하기 버튼
    const handleAddItem = () =>{
        setAddMenu(addMenu)
        console.log("항목추가하러가기")
        console.log(addMenu)
        history.push("./")
    } 

    // const [userInfo, setUserInfo] = useState([])

    const [receiver,setReceiver] = useState([])
    const [productInfo, setProductInfo] = useState([])
    // const [optionInfo, setOptionInfo] = useState([])
    // const [quantity, setQuantity] = useState([])

    
    useEffect(()=>{
        console.log("카트에 진입")
        axios
        .get(cartUrl, {headers: authHeader()})
        .then((response)=>{
            console.log("cart response 내부")
            console.log(response)
            const listArr = []
            response.data.items.map((cart)=>listArr.push({
                id: cart.cartId,
                // img: cart.product.thumnail,
                content: makeCartelement(
                    cart.product.distributor,
                    cart.product.name,
                    cart.product.description,
                    cart.product.price,
                ),
                shippingFee : cart.product.shippingCompany.shippingFee,
                optionName : cart.option.name,
                quantity: cart.quantity
                }))
            
            //전달정보
            const productArr = []
            response.data.items.map((product)=>productArr.push({
                cartId:product.cartId,
                company:product.product.distributor,
                productName:product.product.name,
                productPrice:product.product.price,
                productImg:product.product.thumnail,

                optionId:product.option.optionId,
                optionName:product.option.optionId,

                quantity:product.quantity,
                shipping:product.product.shippingCompany.shippingFee,
            }))
            setProductInfo(productArr)
            console.log("productArr")
            console.log(productArr)

            setCartList(listArr)
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    },[])
    const [sendOrder, setSendOrder] = useState(false)
  
    const ClickOrder = (e)=>{
        setSendOrder(!sendOrder)
        e.preventDefault()
        console.log("주문버튼 클릭")


        // if(sendOrder === true){
        //     if(checkItem === true){
        //         // setCheckItem(true)
        //         const certifiInfo = {productInfo}
        //         localStorage.setItem("save", JSON.stringify(certifiInfo));
        //         console.log("localStorage에 들어감")
        //         console.log(localStorage.getItem("save"));
        //     }
        // }
       

        // axios
        // .get(orderUrl,{
        //     cartItems: [ // 상품정보 목록
        //     {
        //         productId: cartList.altId,
        //         optionId: cartList.listArr.optionId,
        //         quantity: cartList.quantity
        //     }
        //     ],
        // },{ headers: authHeader()})
        // .then((response)=>{
        //     console.log(response)
        //     history.push("./payment")
        // })
        // .catch((error)=>{
        //     console.log("error")
        //     console.log(error)
        // })
    }

    //수신자 정보
    useEffect(()=>{
        axios
        .get(receiverUrl, {headers: authHeader()})
        .then((response)=>{
            console.log("수신자 정보 들어왔음")
            console.log(response)
            const receiverArr = []
            response.data.items.map((userInfo)=>receiverArr.push({
                id: userInfo.receiverId,
                name:userInfo.name,
                address:userInfo.address,
                addressDetail:userInfo.addressDetail,
                phone:userInfo.phone
            }))
           
            setReceiver(receiverArr)
            console.log("receiverArr")
            console.log(receiver)

        })
    },[])

    function makeCartelement(name,price,distributor,option,shippingFee){
        return(
            <>
                <div>
                    <p className="cartItemName">{name}</p>
                </div>

                <div style={{display:"flex"}} 
                     ref={productRef}
                >
                    {/* 아이템 개별체크박스 */}
                    <input 
                        type="checkBox" 
                        name = "checkBox"
                        // value={checkItem}
                        // checked={checkItem}
                        // onChange={checkBoxOnChange}
                        onClick={handleCheckBox}
                        style={{width:30,height:30, border:"1px solid"}} 
                    />
                    
                    
                    <div style={{float:"right", width:"100%", border:"1px solid"}}>
                        <div style={{textAlign:"right"}}>
                            <p className="cartItemFee">{price}</p>
                            <p>제주, 도서지역 추가 3,000원(개별 연락)</p>
                        </div>
                        {/* style={{display:"flex"}} */}
                        <div >
                            <p className="cartProductName">{distributor}</p>

                            <div style={{display:"flex"}}>
                                <div>옵션 : </div>
                                <h4 className="carItemIngred">{option.name}</h4>
                            </div>
                            
                            <div style={{display:"flex"}}>
                                <button type="button" onClick={decreaseNum}>-</button>
                                <div>{count}</div>
                                <button type="button" onClick={increaseNum}>+</button>
                            </div>

                            {/* <p>가격 : {price}</p>
                            <p>배송비 : {shippingFee}</p> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div style={{height: 600,alignItems: "center"}}>
            <div style={{width:500, border:"1px solid"}}>
                <div style={{display:"flex"}}>
                    <button onClick={goBack}>뒤로</button>
                    <p>장바구니</p>
                </div>
                <div style={{width:"100%", border:"1px solid"}}>
                    <div style={{display:"flex", width:"100%", border:"1px solid"}}>
                        
                        
                        {/* 장바구니 클릭 */}
                        <div style={{display:"flex",alignItems:"center", float:"right", width:"100%"}}>
                            <input 
                                type="checkbox"
                                name = "checkBox"
                                // value={checkItem}
                                // checked={checkAll}
                                onClick={handleCheckBox} 
                                style={{width:30,height:30, border:"1px solid"}} 
                            />
                            <p style={{float:"right"}}>전체선택</p>
                        </div>


                        <button type="button" style={{width:150}} onClick={removeItem}>선택상품 삭제</button>
                    </div>
                </div>

                <div style={{border:"1px solid", backgroundColor:"lightgray"}}>
                    {/* <CartItem
                        data={cartList}
                        containerLayout="cartContainer"
                        contentLayout="cartContent"
                        imgLayout="cartImg"
                    /> */}
                    <div ref={productRef}>
                        {cartList.map((cartItem)=>(
                            <div className={containerLayout} alt={cartItem.id}>
                                <div className={contentLayout}>
                                <div style={{border:"1px solid",display: "flex"}}>
                                    <img className={imgLayout} src={cartItem.img} alt={cartItem.id} />
                                    {cartItem.content}
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>

                <div style={{width:"100%", border:"1px solid", height:100, display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <button onClick={handleAddItem}>다른 상품 추가하기</button>
                </div>

                <div>
                    <div>상품금액</div>
                    {cartList.price}
                    <div>배송비</div>
                    {cartList.shippingFee}
                    <div>총 결제금액</div>
                    {cartList.price}+{cartList.shippingFee}
                </div>

            <div style={{width:"100%", height:50, display:"flex", justifyContent:"center", border:"1px solid"}}>
                <button type="button" onClick={ClickOrder}>주문버튼</button>

                {/* <Button variant="primary" onClick={ClickOrder}>
                    주문버튼
                </Button>
                <Modal 
                    show={show} 
                    data-toggle="modal"
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>결제하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>    */}
            </div>

            </div>
        </div>
    );
};

export default Cart;
Cart.propTypes={
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
