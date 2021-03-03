import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import authHeader from "../../actions/userAction"
import Products from '../products/Products';
import { isDate } from 'moment';

const Payment = ({
    history,props,
    containerLayout,
    contentLayout,
    imgLayout
}) => {
    const getAccount = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"
    const paymentRquest = "https://childsnack-test.appspot.com/_ah/api/order/v1/pay"
    const receiverUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/setDefault"
    const getCartList = "https://childsnack-test.appspot.com/_ah/api/cart/v1/getCartList"
    
    const getJumon = "https://childsnack-test.appspot.com/_ah/api/cart/v1/get?id="
    const getOrderList = "https://childsnack-test.appspot.com/_ah/api/order/v1/getList"
    const orderInsert = "https://childsnack-test.appspot.com/_ah/api/order/v1/insert"
    const getReceiverUrl = "https://childsnack-test.appspot.com/_ah/api/receiver/v1/getDefault"
   
    const [delivInput,setDelivInput] = useState('')
    const [defAddress,setDefAddress] = useState([])
    const [receiverInfo, setReceiverInfo] = useState([])
    const [productInfo, setProductInfo] = useState([])
    const [clickAgree, setClickAgree] = useState(false)
    const [orderBill, setOrderBill] = useState([])
    
    //배송메모
    const deliveryInput = (e) =>{
        setDelivInput(e.currentTarget.value)
    }

    //배송지 변경 버튼
    const adrsChange =()=>{
        console.log("배송지 변경")
        history.push("./changeAdrs")
    }
    
    //쿠폰 클릭
    const clickCoupon =()=>{
        console.log("쿠폰 선택")
        history.push("./couponList")
    }
    //동의 버튼 클릭
    const agreePayment = ()=>{
        setClickAgree(!clickAgree)
        {clickAgree? (console.log("비동의")):(console.log("동의"))}
    }
    
    //결제 버튼
    const payItems = ()=>{
        console.log("주문을 시작합니다")
        if(clickAgree === true){
            axios
            .post(orderInsert,
                { orderItems: [ // 상품정보 목록
                    {
                        productId: orderBill.productId,
                        optionId: orderBill.optionId,
                        quantity: orderBill.quantity
                    }
                   ],
                //    pointSpentAmount: 사용 포인트
                //    receiver: { //  수령인
                //     id: receiverInfo.id,
                //     shippingMessage: delivInput
                //    }
                },
                //   "regularDelivery": (1 : 정기, 0 : 일반 )
                //   "deliveryType": 정기배송 타입(0: 주, 1 : 월 )
                //   "deliveryValue": 정기배송 일 ( 주 :  0 ~ 6, 월 : 0 ~ 말일 )},
                {headers: authHeader()})
        }
    }

    useEffect(()=>{
        console.log("상품정보 가져오기")
        axios
        .get(getJumon, {headers: authHeader()})
        .then((response)=>{

            console.log("성공!")
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])


    useEffect(()=>{
        axios
        .get(getOrderList, {headers: authHeader()})
        .then((response)=>{
            console.log("리스트 주문 들어옴")
            console.log(response)
            
            // const baseUrl = response.data.items[0]
            // // console.log("baseUrl")
            // // console.log(baseUrl)
            // const receiver = baseUrl.receiver
            // const listArr = []
            // baseUrl.orderItems.map((items)=>listArr.push({
            //     productId:items.product.productId,
            //     name : items.product.name,
            //     img : items.product.thumnail,
            //     distributor : items.product.distributor,
            //     price : items.product.price,
            //     option : items.option,
            //     optionId : items.option.optionId,
            //     quantity : items.quantity,
            //     shippingCompany : items.shippingCompany,
            //     shippingFee : items.shippingCompany.shippingFee,
            //     shippingMessage : delivInput
            // }))
            const cartMemo = localStorage.getItem("save")
            const parsingMemo = JSON.parse(cartMemo)
            setOrderBill(parsingMemo)
            // setProductInfo(listArr)
            // setReceiverInfo(receiver)
        })
        .catch((error)=>{
            console.log("error")
            console.log(error)
        })
    },[])
    
    //수신자 정보
    useEffect(()=>{
        axios
        .get(getReceiverUrl,
        {headers: authHeader()})
        .then((response)=>{
            const baseUrl = response.data
            setDefAddress(baseUrl)
        })
    },[])
    

    return (
        <>

            <div style={{border:"1px solid", width:400}}>
                <h1>결제화면</h1>
                <a href="/cart"><button type="button">뒤로가기</button></a>
                <div style={{border:"1px solid"}}>
                    <h3>배송지 정보</h3>
                    <div>
                        <p>수령인 : {defAddress.name}</p>
                        <p>연락처 : {defAddress.phone}</p>
                        <p>주소 : {defAddress.address + defAddress.addressDetail }  </p>
                    </div>
                    <button type="button" onClick={adrsChange}>배송지변경</button>
                </div>
                <div style={{border:"1px solid"}}>
                    <h3>배송메모</h3>
                    <input 
                        type="text" 
                        style={{width:"100%", height:200}} 
                        placeholder="배송메모를 입력해주세요." 
                        onChange={deliveryInput} 
                    />
                </div>
                <h3>상품 정보</h3>
                <div>
                    {orderBill.map((cartItem)=>(
                            <div className={containerLayout} alt={cartItem.id}>
                                <div className={contentLayout}>
                                <div style={{border:"1px solid"}}>
                                    <div style={{display:"inlineFlex", border:"1px solid"}}>
                                        <h4 className="cartItem-distributor">{cartItem.distributor}</h4>
                                        {/* <div className="cartItem-shippingFee">배송비 {cartItem.shippingCompany.shippingFee}원</div> */}
                                        {/* <p>제주, 도서지역 {cartItem.shippingCompany.shippingFee}원(개별연락)</p> */}
                                    </div>
                                    <div style={{display:"flex", border:"1px solid"}}>
                                        <img 
                                            className={imgLayout} 
                                            src={cartItem.img} 
                                            alt={cartItem.id} 
                                            style={{width:150}}
                                        />
                                        <div>
                                            <div>옵션</div>
                                            <p className="cartItem-name">{cartItem.name}</p>
                                            <p className="cartItem-quantity">{cartItem.quantity}개</p>
                                            <b><p className="cartItem-price">{cartItem.price}</p></b>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div style={{border:"1px solid" ,height:100}}>
                    <h3>할인쿠폰</h3>
                    <input type="text"/>
                    <button type="button" onClick={clickCoupon}>쿠폰선택</button>
                </div>
                <div style={{border:"1px solid"}}>
                    <h3>최종결제 금액</h3>
                    <div>상품금액 : </div>
                    <div>배송비 : </div>
                    <div>쿠폰할인 : </div>
                    <div>총 결제금액 : </div>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="checkbox" onClick={agreePayment} />
                    <div>동의버튼</div>
                </div>
            </div>
                {clickAgree === true && 
                    (<button type="submit" style={{backgroundColor:"lightCyan"}} onClick={payItems}>결제하기</button>)}
                {clickAgree === false && 
                    (<button type="submit" style={{backgroundColor:"lightgray"}}>결제하기</button>)}
        </>
    );
};

export default Payment;