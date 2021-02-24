import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

const Payment = () => {

    const getAccount = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAccount"
    const getOrder = "https://childsnack-test.appspot.com/_ah/api/order/v1/get?id"

    const [delivInput,setDelivinput] = useState('')
    
    const deliveryInput = (e) =>{
        setDelivinput(e.currentTarget.value)
        console.log("delivInput")
        console.log(delivInput)
    }




    return (
        <>

            <div style={{border:"1px solid", width:400}}>
                <h1>결제화면</h1>
                <div style={{border:"1px solid"}}>
                    <h3>배송지 정보</h3>
                    <div>
                        {/* <p>수령인 : {receiver[0].name}</p>
                        <p>연락처 : {receiver[0].phone}</p>
                        <p>주소 : {receiver[0].address}</p> */}
                    </div>
                    <button>배송지변경</button>
                </div>
                <div style={{border:"1px solid"}}>
                    <h3>배송메모</h3>
                    <input type="text" onChange={deliveryInput} />
                </div>

                <h3>상품 정보</h3>
                <div>
                    {/* <CartItem
                        data={cartList}
                        containerLayout="cartContainer"
                        contentLayout="cartContent"
                        imgLayout="cartImg"
                    /> */}
                </div>
                <div style={{border:"1px solid" ,height:100}}>
                    <h3>할인쿠폰</h3>
                    <input type="text"/>
                    <button>쿠폰선택</button>
                </div>
                <div style={{border:"1px solid"}}>
                    <h3>최종결제 금액</h3>
                    <div>상품금액 : </div>
                    <div>배송비 : </div>
                    <div>쿠폰할인 : </div>
                    <div>총 결제금액 : </div>
                    
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="checkbox" />
                    <div>동의버튼</div>
                </div>
            </div>
                <button>결제하기</button>
        </>
    );
};

export default Payment;