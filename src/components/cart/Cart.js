import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./cart.css"
import authHeader from "../../actions/userAction"
import Products from "../products/Products"
import CartItem from './CartItem';

const Cart = ({history}) => {
    const cartUrl = 'https://childsnack-test.appspot.com/_ah/api/cart/v1/getCartList';
    const removeUrl = "https://childsnack-test.appspot.com/_ah/api/cart/v1/delete?id=";
    const updateUrl = "https://childsnack-test.appspot.com/_ah/api/cart/v1/update";

    const query = window.location.search
    console.log(query)
    const urlParams = new URLSearchParams(query)
    console.log(urlParams)
    const getId = urlParams.get('id')
    console.log(getId)

    const [cartList, setCartList] = useState([]) 
    const [checkItem, setCheckItem] = useState(false)
    const [checkList, setCheckList] = useState(false)
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

    const productTimes = ()=>{
        
    }

    //카운트하기
    const handleCountNum = () =>{
        setCount(count)
        console.log(count)
    }

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }
    //아이템 전체 체크
    const handleItemListCheck = () =>{
        setCheckList(!checkList)
        console.log(checkItem)
        if(checkList === true){
            setCheckItem(true)
            console.log(checkItem)
        }else if(checkList !== true){
            setCheckItem(false)
            console.log(checkItem)
        }
    }
    //아이템 개별 체크
    const handleEachItemCheck = () =>{
        setCheckItem(!checkItem)
        console.log("checkItem")
        console.log(checkItem)
    }

    //항목삭제
    const removeItem = () =>{
        setRemoveMenu(false)
        console.log(removeMenu)
        axios
        .delete(removeUrl + getId)
        .then((response)=>{
            console.log("삭제 들어왔음")
            console.log(response)
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

    useEffect(()=>{
        console.log("카트에 진입")
        axios
        .get(cartUrl, {headers: authHeader()})
        .then((response)=>{
            console.log("cart response 내부")
            console.log(response)
            const listArr = []
            response.data.items.map((cart)=>listArr.push({
                id: cart.productId,
                img: cart.thumnail,
                content: makeCartelement(
                    cart.originClassification,
                    cart.name,
                    cart.retailPrice,
                    cart.price,
                    )
                }))
                setCartList(listArr)
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    },[])

        
    
    function makeCartelement(name,){
        return(
            <>
                <input type="checkBox" style={{width:30,height:30, border:"1px solid"}} onClick={handleEachItemCheck} />
                <div style={{display:"flex",alignItems:"center", float:"right", width:"100%", border:"1px solid"}}>
                    {/* company */}
                    <h3 className="cartItemName">{name}</h3>
                    <div style={{textAlign:"right"}}>
                    {/* shipping fee */}
                        <p className="cartItemFee">{}</p>
                        <p>제주, 도서지역 추가 3,000원(개별 연락)</p>
                    </div>
                    <div>
                        {/* cartProductName */}
                        <p className="cartProductName">{}</p>
                        {/* cartProductDiscrip */}
                        <p className="carItemIngred">{}</p>
                        <div style={{display:"flex"}}>
                            <button type="button" onClick={decreaseNum}>-</button>
                            <div>{count}</div>
                            <button type="button" onClick={increaseNum}>+</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

   

    return (
        <div>
            <div style={{width:500, border:"1px solid"}}>
                <div style={{display:"flex"}}>
                    <button onClick={goBack}>뒤로</button>
                    <p>장바구니</p>
                </div>
                <div style={{width:"100%", border:"1px solid"}}>
                    <div style={{display:"flex", width:"100%", border:"1px solid"}}>
                        <div style={{display:"flex",alignItems:"center", float:"right", width:"100%"}}>
                            <input type="checkbox" onClick={handleItemListCheck} 
                            style={{width:30,height:30, border:"1px solid"}} />
                            <p style={{float:"right"}}>전체선택</p>
                        </div>
                        <button type="button" style={{width:150}} onClick={removeItem}>선택상품 삭제</button>
                    </div>
                </div>

                <div style={{border:"1px solid", backgroundColor:"lightgray"}}>
                        <CartItem
                            data={cartList}
                            containerLayout=""
                            contentLayout=""
                            imgLayout=""
                        />
                </div>

                <div style={{width:"100%", border:"1px solid", height:100, display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <button onClick={handleAddItem}>다른 상품 추가하기</button>
                </div>

                <div>
                    <div>상품금액</div>
                    {}
                    <div>배송비</div>
                    {}
                    <div>총 결제금액</div>
                    {}
                </div>
            </div>
        </div>
    );
};

export default Cart;