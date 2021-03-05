import axios from 'axios';
import React, { useState, useEffect } from 'react';
import authHeader from "../../actions/userAction"
import "./coupon.css";
import "../remote.css"

const Coupon = ({history}) => {

    const getAllCouponUrl = "https://childsnack-test.appspot.com/_ah/api/user/v1/getAllCoupon"
    const getMyCouponUrl = "https://childsnack-test.appspot.com/_ah/api/user/v1/getCoupons"
    
    const footerP = {
        marginTop:6
    }
    const [couponCount, setCouponCount] = useState([])
    const [allCoupon, setAllCoupon] = useState([])
    console.log("allCoupon")
    console.log(allCoupon)

    const [couponWalet, setCouponWalet] = useState([])

    const [toggle, setToggle] = useState(1)

    const onClickDetailInfo = (index) =>{
        console.log(index)
        setToggle(index)
    }

    const goback =()=>{
        history.goBack()
    }

    
    //전체 쿠폰
    useEffect(()=>{
        axios
        .get(getAllCouponUrl,{ headers: authHeader()})
        .then((response)=>{
            console.log("전체 쿠폰")
            console.log(response)
            setAllCoupon(response.data.items)
        })
    },[])


    //내 쿠폰
    useEffect(()=>{
        axios
        .get(getMyCouponUrl,{ headers: authHeader()})
        .then((response)=>{
            console.log("내 쿠폰")
            console.log(response)
            setCouponWalet(response.data.items)
        })
    },[])

    const downItem = () =>{
        console.log("쿠폰 다운로드 시작")
    }

    return (
        <>
            <div>
                <div className="info-lightTopicArea">
                    <a href="./mypage"><button>뒤로</button></a>
                    <div className="info-topic">쿠폰함</div>
                </div>
                <div style={{padding:"0 0 52px 0"}}>
                    <div style={{display:"flex",width:"100%",textAlign:"center"}}>
                        <div 
                            style={{ 
                                padding:"14px 0 12px 0",
                                width:"50%", fontSize:17,
                                borderBottom:"1px solid",
                            }}
                            type="button" 
                            id="productExplain" 
                            className={toggle === 0?"able":"disable"} 
                            onClick={()=>onClickDetailInfo(0)}>
                            내쿠폰
                        </div>
                        <div 
                            style={{ 
                                padding:"14px 0 12px 0",
                                width:"50%", fontSize:17, 
                                borderBottom:"1px solid",
                            }}  
                            type="button" 
                            id="productInfo" 
                            className={toggle === 1?"able":"disable"} 
                            onClick={()=>onClickDetailInfo(1)}>
                            쿠폰존
                        </div>
                    </div>

                    <div 
                        style={{padding :"0 16px 0 16px",textAlign:"center",}}>
                            {toggle === 0 &&(
                                <>
                                    <div style={{
                                            textAlign:"center",
                                            borderBottom:"2px solid #9e9e9e",
                                            padding:"61.5px 0 39.5px 0"
                                        }}>
                                        <h3 name="myCoupon">
                                            <b style={{fontSize: 20,color: "#000000"}}>현재 사용가능 쿠폰 </b>
                {/* 추후 자신의 쿠폰보관함에 들어올경우 변경예정, 지금은 전체 쿠폰으로 계산 */}
                                            <b style={{fontSize: 20, color: "#db7c68"}}>{allCoupon.length}장</b>
                                        </h3>
                                    </div>

                                    <div style={{
                                        textAlign:"center",
                                        borderBottom:"2px solid #9e9e9e",
                                        padding:"87px 0 87px 0"
                                    }}>
                                        <div>
                                            {couponCount === 0? <div className="emptyWord">사용가능한 쿠폰이 없습니다.</div> 
                                            :   (
                                                <div>
                                                    <div>여기 쿠폰있어요~</div>
                                                    <div>{couponWalet}</div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    
                                </>
                            )}
                            {toggle === 1 &&(
                                <>
                                    <div style={{textAlign:"center",padding:"61.5px 0 39.5px 0"}}>
                                            {allCoupon.length === 0? <div className="emptyWord">사용가능한 쿠폰이 없습니다.</div> 
                                            :   <>
                                                    {allCoupon.map((cop)=>(
                                                        <div style={{
                                                            display:"flex",textAlign:"left",
                                                            borderRadius: "8px 8px 8px 8px", marginBottom:20,
                                                            boxShadow: "0px 5px 5px 0 lightGray"
                                                            }}>

                                                            <div style={{padding :"25px 19px 25px 14px",width:"80%", borderRadius: "8px 0 0 8px"}}>
                                                                <div style={{fontSize:17,color: "#000000",fontWeight: 500}}>{cop.title}</div>
                                                                <div style={{fontSize:27,color: "#db7c68",fontWeight: "bold"}}>{cop.cost}원</div>
                                                                <div style={{fontSize:14,color: "#565656"}}>{cop.expireDate}</div>
                                                                <div style={{fontSize:14,color: "#565656"}}>{cop.content}</div>
                                                            </div>

                                                            <div 
                                                            onClick={downItem} 
                                                            style={{
                                                            width:"20%",backgroundColor:"#ec9281", 
                                                            borderRadius: "0 8px 8px 0",
                                                            padding:"57px 0 53px 0", textAlign:"center"}}
                                                            >
                                                                <div style={{width:36, height:36, border:"1px solid"}}></div>
                                                                <div>쿠폰받기</div>
                                                            </div>
                                                        
                                                        </div>
                                                    ))}
                                                </>
                                            }
                                    </div>
                                </>
                            )}
                            <footer style={{
                                    fontSize:14,
                                    textAlign:"left",
                                    padding:"87px 0 87px 0",
                                    color: "#9e9e9e",
                                    lineHeight: 1.43
                                }}>
                                <b>쿠폰 이용안내</b>
                                <p className={footerP}>1. 쿠폰은 쿠폰존에서 다운(쿠폰받기) 후, 사용할 수 있습니다.</p>
                                <p className={footerP}>2. 쿠폰은 상품 결제 시 사용할 수 있습니다.</p>
                                <p className={footerP}>3. 쿠폰은 다른 쿠폰과 중복하여 사용할 수 없습니다.</p>
                                <p className={footerP}>4. 쿠폰의 구체적인 사용조건은 발행되는 쿠폰별로 다를 수 있습니다.</p>
                                <p className={footerP}>5. 쿠폰 사용 후 주문을 취소한 경우, 쿠폰은 반환됩니다. 
                                <br /> 단, 반환 시점에 쿠폰 유효기간이 만료된 경우 자동 소멸됩니다.</p>
                            </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Coupon;