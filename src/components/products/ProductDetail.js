import React,{useEffect, useState, useRef} from 'react';
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

    //count 숫자 parse int로 계산
    const turnToNum = JSON.stringify(infoMenu.price)
    const countNum = parseInt(count)
    const calcItems = parseInt(turnToNum)*countNum;
    console.log(countNum)

    const [option, setOption] = useState([])
    
    const [onOptionBtn, setOnOptionBtn] = useState(false)
    const [addBag, setAddbag] = useState(false)

    const boxCheck = useRef(null); 




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
    const handlePutIn = () =>{
        setAddbag(true)
    }
    
    const payModal =()=>{
        setShow(true)
    }


    //장바구니 담기
    const addProduct = () =>{
        console.log("추가하기")
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
        setOnOptionBtn(true)
        console.log(onOptionBtn)

        if(onOptionBtn === true){
            console.log("옵션선택")
        }
    }


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
            // const option =
            baseUrl.options.map((option)=>listArr.push({
                optionId : option.optionId,
                name : option.name
            }))
            setOption(listArr.optionId)
            console.log("inside option")
            console.log(listArr.optionId)

            const detailInfo = {altId,headImg,distributor,description,name,shippingInfo,addressInfo,listArr,
                price,retailPrice,detailImg,exchangeInfo,paymentInfo,serviceInfo}
            
            setInfoMenu(detailInfo)
        })
    },[])

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
                        <p>회사 이름 :{infoMenu.distributor}</p>
                        <p>상품 이름 :{infoMenu.name}</p>
                        <p>상품 내용 :{infoMenu.description}</p>
                        {/* <p>product name {infoMenu.name}</p> */}
                        <div style={{display:"flex"}}>
                            <button type="button" onClick={handleOptionMenu}>옵션</button>
                            {onOptionBtn === true && (
                                <>
                                    <div className="optionName">{infoMenu.listArr[0].name}</div>
                                </>
                                )
                            }
                            {onOptionBtn === false && (
                                <>
                                    <div>필요한 옵션을 선택해주세요</div>
                                </>
                                )
                            }
                            {/* {option[0].name} */}
                            {/* 0번째로 일단 고정 */}
                        </div>


                        <div style={{border:"1px solid", display:"flex"}}>
                            <p>product price {infoMenu.price}</p> 
                            <p>product retailPrice {infoMenu.retailPrice}</p> 
                        </div>
                        <div style={{border:"1px solid"}}>
                            {/* <p>배송비{infoMenu.shippingFee}</p> */}
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