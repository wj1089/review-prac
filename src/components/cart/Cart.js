import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./cart.css"
import authHeader from "../../actions/userAction"
// import Products from "../products/Products"
// import CartItem from './CartItem';
// import OrderNav from '../navi/OrderNav';
// import {Modal, Button} from "react-bootstrap"
import PropTypes from 'prop-types';

const Cart = ({
    history,
    containerLayout,
    contentLayout,
    imgLayout}) => {
    const cartUrl = 'https://childsnack-test.appspot.com/_ah/api/cart/v1/getCartList';
    const orderUrl = "https://childsnack-test.appspot.com/_ah/api/order/v1/insert";
    const updateUrl = "https://childsnack-test.appspot.com/_ah/api/cart/v1/update";
    const receiverUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getReceiver"
    const removeCartUrl = "https://childsnack-test.appspot.com/_ah/api/cart/v1/delete";

    const [count, setCount] = useState(1)

    const [show, setShow] = useState(false);
    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}
    const [addMenu,setAddMenu] = useState(true)
    const [removeMenu, setRemoveMenu] = useState(false)
    const [sendOrder, setSendOrder] = useState(false)
    const [checkAgree, setCheckAgree] = useState(false)

    const [check, setCheck] = useState([])
    const [cartList, setCartList] = useState([]) 
    const [receiver,setReceiver] = useState([])

    const goBack = () =>{
        history.push("./");
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
   

    //전체체크
    const handleAllCheck = (e) =>{
        setCheckAgree(false)
        const checkInfo = e.target.checked
        const wrapId = cartList.map((cart)=>cart.id);

        if(checkInfo === true){
            const total = check.indexOf(wrapId);
            console.log("wrapId")
            console.log(wrapId)
            setCheckAgree(true)
                
            if(total >= -1){
                setCheck(wrapId)
            }
        }else{ 
            console.log("초기화")
            setCheck([])
        }
    }
    console.log("check")
    console.log(check)

    //개별체크
    const handleCheckBox = (e) =>{
        setCheckAgree(false)
        const checkInfo = e.target.checked
        const checkValue = e.target.name
        if(checkInfo === true){
            let result = check.includes(checkValue)
            if(result === false){               
                setCheck([...check, checkValue])
                setCheckAgree(true)
            }
        }else{
            let result = check.indexOf(checkValue)            
            if(result > -1){
                setCheck(check.filter(num => checkValue !== num))
            }
        }
    }


    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')
    const wrapId = cartList.map((cart)=>cart.id);
    
    // console.clear()



    //항목삭제
    const removeItem = () =>{
        // setRemoveMenu(true)
        const deleteUrl = JSON.stringify(check)
        console.log("deleteUrl")
        console.log(deleteUrl)
        axios
        .delete(
            removeCartUrl,
            {cartItems:[{id:deleteUrl}]},
            {headers: authHeader()}
            )
        .then((response)=>{
            console.log("삭제 들어왔음")
            console.log(response)
            // window.location.reload();
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    //항목 추가하기 버튼
    const handleAddItem = () =>{
        setAddMenu(addMenu)
        console.log("항목추가하러가기")
        console.log(addMenu)
        history.push("./")
    } 

    
    //기본 카트 아이템 항목들
    useEffect(()=>{
        console.log("카트에 진입")
        axios
        .get(cartUrl, {headers: authHeader()})
        .then((response)=>{
            const listArr = []
            response.data.items.map((cart)=>listArr.push({
                id: cart.cartId,
                // img: cart.product.thumnail,
                productId:cart.product.productId,              
                shippingFee : cart.product.shippingCompany.shippingFee,
                optionId : cart.option.optionId,
                optionName : cart.option.name,
                quantity: cart.quantity,
                product : cart.product
            }))
            setCartList(listArr)
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    },[])

    

    //주문버튼 클릭
    const ClickOrder = (e)=>{
        e.preventDefault()
        console.log("주문버튼 클릭")
        console.log("localStorage에 들어감")
        const go = []
        check.forEach(id=>{
            const data = cartList.find(arr =>arr.id === id)
            go.push(data)
        })
        localStorage.setItem("save", JSON.stringify(go));
        history.push("./payment")
    }

    //수신자 정보
    useEffect(()=>{
        axios
        .get(receiverUrl, {headers: authHeader()})
        .then((response)=>{
            const receiverArr = []
            response.data.items.map((userInfo)=>receiverArr.push({
                id: userInfo.receiverId,
                name:userInfo.name,
                address:userInfo.address,
                addressDetail:userInfo.addressDetail,
                phone:userInfo.phone
            }))
            setReceiver(receiverArr)
        })
    },[])

    function makeCartelement(id,name,price,distributor,option,shippingFee){
        return(
            <>
                <div>
                    <p className="cartItemName">{name}</p>
                </div>

                <div style={{display:"flex"}} 
                >
                    {/* 아이템 개별체크박스 */}
                    <input 
                        type="checkBox" 
                        name = {id}
                        checked={check.includes(id)}
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
                                checked={cartList.length === check.length}
                                onClick={handleAllCheck} 
                                style={{width:30,height:30, border:"1px solid"}} 
                            />
                            <p style={{float:"right"}}>전체선택</p>
                        </div>


                        <button type="button" style={{width:150}} onClick={removeItem}>선택상품 삭제</button>
                    </div>
                </div>

                <div style={{border:"1px solid", backgroundColor:"lightgray"}}>
                    <div>
                        {cartList.map((cartItem)=>(
                            <div className={containerLayout} alt={cartItem.id}>
                                <div className={contentLayout}>
                                <div style={{border:"1px solid",display: "flex"}}>
                                    <img className={imgLayout} src={cartItem.img} alt={cartItem.id} />
                                    {makeCartelement(
                                        cartItem.id,
                                        cartItem.product.distributor,
                                        cartItem.product.name,
                                        cartItem.product.description,
                                        cartItem.product.price,
                                    )}
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
                    
                    {checkAgree === false  &&(
                        <button type="button" style={{backgroundColor:"lightGray"}}>주문하기</button>
                    )}
                    {checkAgree === true  &&(
                        <button type="button" style={{backgroundColor:"lightcyan"}}
                        name="save" 
                        // id="save" 
                        onClick={ClickOrder}>주문하기</button>
                    )}
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
