import React,{useEffect, useState, useRef} from 'react';
import axios from 'axios'
import Navbar from "../navi/Navbar"
import authHeader from "../../actions/userAction"
import {Modal, Button} from "react-bootstrap"


const ProductDetail = ({history}) => {
    
    const productGetItem = "https://childsnack-test.appspot.com/_ah/api/product/v1/get?id="
    const addItemURL = "https://childsnack-test.appspot.com/_ah/api/cart/v1/insert"
    const cartUrl = 'https://childsnack-test.appspot.com/_ah/api/cart/v1/getCartList';
    const reviewUrl = "/_ah/api/review/v1/getProductReviewList?productId="
   

    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const getId = urlParams.get('id')

    const [toggle, setToggle] = useState(1)
    const [count, setCount] = useState(0)
    const [infoMenu, setInfoMenu] = useState([])
    const [option, setOption] = useState([])
    console.log("option")
    console.log(option)

    const [show, setShow] = useState(false);
    const [onOptionBtn, setOnOptionBtn] = useState(false)

    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}

    //count 숫자 parse int로 계산
    const turnToNum = JSON.stringify(infoMenu.price)
    const countNum = parseInt(count)
    const calcItems = parseInt(turnToNum)*countNum;

    console.log(countNum)

    //뒤로가기
    const goBack = () =>{
        history.goBack();
    }
    //갯수증가
    const increaseNum = ()=>{
        setCount(count +1)
    }
    //갯수감소
    const decreaseNum = ()=>{
        setCount(count -1)
        if(count <= 0){
            setCount(0)
        }
    }
    
    const payModal =()=>{
        setShow(true)
    }
    console.log("infoMenu.listArr")
    console.log(infoMenu.listArr)

    //장바구니 담기
    const addProduct = () =>{
        console.log("추가하기")
        if(count === 0){
            alert("옵션을 선택해주세요!")
            console.log("옵션을 선택해주세요!")
            return
        }
        axios
        .post(addItemURL,{
            cartItems: [ // 상품정보 목록
            {
                productId: infoMenu.altId,
                optionId: infoMenu.listArr[0].optionId,
                quantity: countNum
            }
            ],
        },{ headers: authHeader()})
        .then((response)=>{
            console.log("추가버튼 useEffect")
            console.log(response)
            history.push("./")
            alert("장바구니에 추가되었습니다.")
            setShow(false)
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

    const handleOptionMenu=()=>{
        setOnOptionBtn(!onOptionBtn)
        console.log(onOptionBtn)
        // if(onOptionBtn === true){
        //     console.log("옵션선택")
        // }
    }
    const [selectOption, setSelectOption] = useState(false)

    const chooseOption =()=>{
        setSelectOption(!selectOption)
        console.log("옵션 선택")
        console.log(selectOption)

        // if(selectOption){
        // }
    }


    //옵션 선택시
    function makeOptionMenu(){
        return(
            <>
                {option.map((review)=>(
                    <div>
                        <div className="optionName">{review.name}</div> 
                        <div style={{display:"flex"}}>
                            <button type="button" onClick={decreaseNum}>-</button>
                            <div>{count}</div>
                            <button type="button" onClick={increaseNum}>+</button>
                            <button onClick={chooseOption}>선택</button>
                        </div>
                    </div>
                ))}
            </>
        )
    }

    //상품 정보
    useEffect(()=>{
        axios
        .get(productGetItem + getId)
        .then((response)=>{
            console.log("response")
            console.log(response)
            const baseUrl = response.data
            const altId = baseUrl.productId
            const headImg = baseUrl.detailImage
          
            const distributor = baseUrl.distributor
            const description = baseUrl.description
            const name = baseUrl.name
            const price = baseUrl.price
            const retailPrice = baseUrl.retailPrice
            // const shippingFee = baseUrl.shippingCompany.shippingFee
            const detailImg = baseUrl.detailImage
            const exchangeInfo = baseUrl.exchangeInfo
            const paymentInfo = baseUrl.paymentInfo
            const shippingInfo = baseUrl.shippingInfo
            const serviceInfo = baseUrl.serviceInfo
            const addressInfo = baseUrl.madeInfo
            
            const listArr = []
            //option map list
            baseUrl.options.map((option)=>listArr.push({
                optionId : option.optionId,
                name : option.name
            }))

            setOption(listArr)
            console.log("option")
            console.log(option)

            const detailInfo = {altId,headImg,distributor,description,name,shippingInfo,addressInfo,listArr,
                price,retailPrice,detailImg,exchangeInfo,paymentInfo,serviceInfo}
            
            setInfoMenu(detailInfo)
        })
    },[])

    // 리뷰가져오기
    // useEffect(()=>{
    //     axios
    //     .get(reviewUrl+getId+ &count=5&startCursor=0)
    //     .then((response)=>{
    //         console.log(response)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // },[])

    

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
                    <div style={{width:"100%", height:150, border:"1px solid", textAlign:"center"}}>
                        <img src={infoMenu.headImg} alt={infoMenu.altId} />
                    </div>
                    <div style={{border:"1px solid"}}>
                        <p>{infoMenu.distributor}</p>
                        <b>{infoMenu.name}</b>
                        <p>{infoMenu.description}</p>
                        {/* <p>product name {infoMenu.name}</p> */}
                        <div style={{display:"flex", fontSize:25}}>
                            <b>{infoMenu.price}원</b>
                            <p style={{textDecoration:"line-through",color:"gray"}}>
                                {infoMenu.retailPrice}원
                            </p>
                        </div>
                        {/* <div style={{display:"flex"}}>
                            <button type="button" onClick={handleOptionMenu}>옵션</button>
                            <div>
                                {onOptionBtn? makeOptionMenu(): <div>필요한 옵션을 선택해주세요</div>}
                            </div>
                        </div> */}

                        <div style={{display:"flex"}}>
                            <div style={{width:50,border:"1px solid"}}>배송비{infoMenu.shippingFee}</div>
                            <p>제주, 도서지역 추가 3,000원</p>
                        {/* <p>{infoMenu.addressInfo}</p> */}
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
                
                {/* 모달 */}
                <Button variant="primary" onClick={payModal}>
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
                            {option.map((review)=>(
                                <div style={{display:"flex", justifyContent:"right"}}>
                                    <div className="optionName">{review.name}</div> 
                                    <p>{infoMenu.price}</p>
                                    <div style={{display:"flex"}}>
                                        <button type="button" onClick={decreaseNum}>-</button>
                                        <div>{count}</div>
                                        <button type="button" onClick={increaseNum}>+</button>
                                        {/* <button onClick={chooseOption}>선택</button> */}
                                    </div>
                                </div>
                            ))}
                            <p>총 금액 : {calcItems}원</p>
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