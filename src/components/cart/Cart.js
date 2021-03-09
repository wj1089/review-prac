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
        const wrapId = cartList.map((cart)=>cart.cartId);

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
            // const listArr = []
            // response.data.items.map((cart)=>listArr.push({
            //     id: cart.cartId,
            //     img: cart.product.thumnail,
            //     productId:cart.product.productId,              
            //     shippingFee : cart.product.shippingCompany.shippingFee,
            //     optionId : cart.option.optionId,
            //     optionName : cart.option.name,
            //     quantity: cart.quantity,
            //     product : cart.product
            // }))
            setCartList(response.data.items)
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    },[])
    console.log("cartList")
    console.log(cartList)
    

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
    // useEffect(()=>{
    //     axios
    //     .get(receiverUrl, {headers: authHeader()})
    //     .then((response)=>{
    //         const receiverArr = []
    //         response.data.items.map((userInfo)=>receiverArr.push({
    //             id: userInfo.receiverId,
    //             name:userInfo.name,
    //             address:userInfo.address,
    //             addressDetail:userInfo.addressDetail,
    //             phone:userInfo.phone
    //         }))
    //         setReceiver(receiverArr)
    //     })
    // },[])

    // function makeCartelement(id,name,distributor,option,shippingFee){
    //     return(
    //         <>
    //             {/* <div>
    //                 <p className="cartItemName">{name}</p>
    //             </div> */}

    //             <div style={{display:"flex", width:"100%"}}>
    //                 {/* 아이템 개별체크박스 */}
    //                 <input 
    //                     type="checkBox" 
    //                     name = {id}
    //                     checked={check.includes(id)}
    //                     onChange={handleCheckBox}
    //                     style={{width:30,height:30}} 
    //                 />
                    
    //                 <div style={{float:"right", width:"100%"}}>
    //                     <p className="cartProductName">{name}</p>

    //                     <div style={{display:"flex"}}>
    //                         <div>옵션 : </div>
    //                         {/* <h4 className="carItemIngred">{option.name}</h4> */}
    //                     </div>
                        
    //                     <div style={{display:"flex"}}>
    //                         <button type="button" onClick={decreaseNum}>-</button>
    //                         <div>{count}</div>
    //                         <button type="button" onClick={increaseNum}>+</button>
    //                     </div>
    //                     {/* <p>가격 : {price}</p>
    //                     <p>배송비 : {shippingFee}</p> */}
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
            <div className="info-lightTopicArea">
                <a href="./">
                    <i class="fas fa-arrow-left" style={{outline:"none", textDecoration:"none"}}/>
                </a>
                <div className="info-topic">장바구니</div>
                <div type="button" />
            </div>

            <div style={{display:"flex", width:"100%", padding:"14px 16px 14px 16px", borderBottom:"solid 8px #eeeeee"}}>
                {/* 장바구니 클릭 */}
                <div style={{display:"flex",alignItems:"center", float:"right", width:"100%"}}>
                    <input 
                        type="checkbox"
                        checked={cartList.length === check.length}
                        onClick={handleAllCheck} 
                        style={{width:30,height:30, border:"1px solid", borderRadius:20}} 
                    />
                    <p style={{float:"right"}}>전체선택</p>
                </div>
                <button type="button" 
                    style={{
                        border: "solid 1px #cccccc",backgroundColor: "#ffffff",
                        width:150, borderRadius:5,   color: "#424242", fontSize: 14}} 
                    onClick={removeItem}>
                    선택상품 삭제
                </button>
            </div>


            {cartList.map((cartItem)=>(
                <div className={containerLayout} alt={cartItem.id}>
                    <div style={{padding:"0 16px 0 16px", borderBottom:"8px solid #eeeeee"}}>
                        <div style={{display:"flex", width:"100%", padding:"20px 0 12px 0", borderBottom:"1px solid #eeeeee"}}>
                            <div  style={{width:"25%"}}>{cartItem.product.distributor}</div>
                            <div style={{width:"75%", textAlign:"right"}}>
                                <p className="cartItemFee">배송비{cartItem.product.shippingCompany.shippingFee}원</p>
                                <p className="cartItemFeeInfo">제주, 도서지역 추가 3,000원(개별 연락)</p>
                            </div>
                        </div>
                        <div style={{display: "flex", paddingTop:21}}>
                            <div style={{display:"flex", width:"100%"}}>
                                {/* 아이템 개별체크박스 */}
                                <input 
                                    type="checkBox" 
                                    name = {cartItem.cartId}
                                    checked={check.includes(cartItem.cartId)}
                                    onChange={handleCheckBox}
                                    style={{width:30,height:30}} 
                                />
                                <img style={{ width: 56, height: 56, margin:"0 12px 0 12px"}}  src={cartItem.product.thumnail} alt={cartItem.cartId} />
                                
                                <div style={{float:"right", width:"100%"}}>
                                    {/* className="cartProductName"  */}
                                    <p style={{fontSize: 16, textAlign: "left", color: "#000000"}}>{cartItem.product.name}</p>
                                    <div style={{display:"flex"}}>
                                        <div style={{fontSize:12,padding: "2px 10px 2px 10px", borderRadius:12, border:"1px solid #bdbdbd",color: "#757575", textAlign:"center"}}>옵션</div>
                                        {/* className="carItemIngred" */}
                                        <p style={{color: "#757575",fontSize: 14,marginLeft:8}}>{cartItem.option.name}</p>
                                    </div>
                                    
                                    <div style={{display:"flex", margin:"12px 0 25px 0", justifyContent:"space-between"}}>
                                        <div style={{display:"flex", alignItems:"center"}}>
                                        <button 
                                            style={{border:"solid 1px #cccccc", borderRadius:20, width:18, height:18, backgroundColor: "#ffffff",
                                            display:"flex", alignItems:"center", justifyContent:"center",marginRight:18}} 
                                            type="button" onClick={decreaseNum}>-</button>
                                        <div>{count}</div>
                                        <button 
                                            style={{border:"solid 1px #cccccc", borderRadius:20, width:18, height:18, backgroundColor: "#ffffff",
                                            display:"flex", alignItems:"center",justifyContent:"center", marginLeft:18}} 
                                            type="button" onClick={increaseNum}>+</button>
                                        </div>
                                        <b><p>가격 {cartItem.product.price}원</p></b>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}


            <div style={{padding: "14px 16px 20px 16px", width:"100%", backgroundColor: "#f5f5f5", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <button type="button" style={{fontSize: 16, color: "#db7c68",border:"none",height: 44, width:"100%", backgroundColor: "#ffffff"}} onClick={handleAddItem}>다른 상품 추가하기</button>
            </div>

            <div style={{padding:"14px 16px 20px 16px"}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{padding:"0 16px 8px 16px"}}>상품금액</div>
                    {/* <div>123{cartList.price}</div> */}
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{padding:"0 16px 8px 16px"}}>배송비</div>
                    {/* <div>123{cartList.shippingFee}</div> */}
                </div>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{padding:"0 16px 8px 16px"}}><b>총 결제금액</b></div>
                    {/* <div><b>123{cartList.price}+{cartList.shippingCompany.shippingFee}</b></div> */}
                </div>
            </div>

            <div style={{width:"100%", padding:"8px 10px 8px 10px",display:"flex", justifyContent:"center", border:"1px solid"}}>
                
                {checkAgree === false  &&(
                    // <button type="button" style={{backgroundColor:"lightGray"}}>주문하기</button>
                        <div type="button" 
                        style={{ 
                            width:"100%", height: 52,display:"flex", 
                            justifyContent:"center", 
                            
                            alignItems:"center", borderRadius: 6, 
                            backgroundColor: "#ec9281",
                            fontSize: 17,color: "#ffffff",
                        }}
                        // onClick={ClickOrder}
                        >주문하기</div>
                        )}

                {checkAgree === true  &&(
                    // <button type="button" style={{backgroundColor:"lightcyan"}}
                    // name="save" 
                    // // id="save" 
                    // onClick={ClickOrder}>주문하기</button>
                    <div type="button" 
                            style={{ 
                                width:"100%", height: 52,display:"flex", 
                                justifyContent:"center", 
                                alignItems:"center", borderRadius: 6, 
                                backgroundColor: "#ec9281",
                                fontSize: 17,color: "#ffffff",
                            }}
                            onClick={ClickOrder}
                    >주문하기</div>
                    )}
            </div>
        </>
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
