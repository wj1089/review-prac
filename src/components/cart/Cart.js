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


    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // console.log("cartList.shippingFee")
    // console.log(cartList)
    

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
    const [cartList, setCartList] = useState([]) 
    console.log("check")
    console.log(check)

    // const [checkItem, setCheckItem] = useState(false)
    const [checkAll, setCheckAll] = useState(false)

    // const [checkResult, setCheckResult] = useState('')

    //개별체크
    const handleCheckBox = (e) =>{
        const checkInfo = e.target.checked
        const checkValue = e.target.value
        // console.log("checkInfo")
        // console.log(checkInfo)
        //클릭시 나오는 값        
        if(checkInfo === true){
            let result = false
            //forEach에서 하나씩 검사한다.
            check.forEach((item)=>{               
                console.log(item === checkValue);
                if(item === checkValue){ 
                    result = true               
                    return;                  
                }
            })
            if(result === false){
                check.push(checkValue)
            }
        }else{
            let result = 0
            check.map((item,index)=>{
                if(item === checkValue){
                    result = index
                    console.log("result")
                    console.log(result)
                    const idx = check.indexOf(index)
                    if(idx > -1)check.splice(index, 1);
                    console.log(idx)
                    console.log("idx")
                    return;
                }
            })
            console.log(result)
            if(result === false){
                check.push(checkValue)
                // console.log("checkValue")
                // console.log(checkValue)
            }
            // n번째 있는 항목을 삭제
        }
    }


    //전체체크
    const handleItemListCheck = (e) =>{
        setCheckAll(checkAll)
        console.log(checkAll)
    }






    //항목삭제
    const removeItem = () =>{
        setRemoveMenu(true)
        // const cartid = cartList.cartId
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

    const [receiver,setReceiver] = useState([])
    const [productInfo, setProductInfo] = useState([])
    
    useEffect(()=>{
        console.log("카트에 진입")
        axios
        .get(cartUrl, {headers: authHeader()})
        .then((response)=>{
            console.log("cart response 내부")
            console.log(response)

            const listArr = []
            const idArr = []
            response.data.items.map((cart)=>listArr.push({
                id: cart.cartId,
                // img: cart.product.thumnail,
                content: makeCartelement(
                    cart.cartId,
                    cart.product.distributor,
                    cart.product.name,
                    cart.product.description,
                    cart.product.price,
                ),
                shippingFee : cart.product.shippingCompany.shippingFee,
                optionId : cart.option.optionId,
                optionName : cart.option.name,
                quantity: cart.quantity
            }))

            //아이디만
            // const strInfo = JSON.stringify(
            response.data.items.map((asd)=>idArr.push(
                asd.cartId
            ))

            // console.log("strInfo")
            // console.log(strInfo)

            setCheck(idArr)
            console.log("inside check")
            console.log(idArr)

            setCartList(listArr)
            console.log("cartList")
            console.log(cartList)

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


        if(sendOrder === true){
            if(check === true){
                // setCheckItem(true)
                const certifiInfo = {productInfo}
                localStorage.setItem("save", JSON.stringify(certifiInfo));
                console.log("localStorage에 들어감")
                console.log(localStorage.getItem("save"));
            }
        }

        axios
        .get(orderUrl,{
            cartItems: [ // 상품정보 목록
            {
                productId: cartList.altId,
                optionId: cartList.optionId,
                quantity: cartList.quantity
            }
            ],
        },{ headers: authHeader()})
        .then((response)=>{
            console.log(response)
            history.push("./payment")
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
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

    function makeCartelement(id,name,price,distributor,option,shippingFee){
        return(
            <>
                <div>
                    <p className="cartItemName">{name}</p>
                </div>

                <div style={{display:"flex"}} 
                    //  ref={productRef}
                >
                    {/* 아이템 개별체크박스 */}
                    <input 
                        type="checkBox" 
                        name = "checkBox"
                        // checked={check}
                        배열안에 id가 있는지 확인
                        // onCreate={check}
                        // onClick={handleCheckBox}
                        value={id}
                        onChange={handleCheckBox}
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
                                checked={check}
                                onClick={handleItemListCheck} 
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
                    <div>
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
