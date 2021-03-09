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

    const [toggle, setToggle] = useState(0)
    const [count, setCount] = useState(0)
    const [optionInfo, setOptionInfo] = useState([])
    const [listItems, setListItems] = useState([])
    const [detailImg, setDetailImg] = useState([])

    const [show, setShow] = useState(false);
    const [onOptionBtn, setOnOptionBtn] = useState(false)

    const handleShow = () => {setShow(true);}
    const handleClose = () => {setShow(false);}

    //count 숫자 parse int로 계산
    const turnToNum = JSON.stringify(listItems.price)
    const countNum = parseInt(count)
    const calcItems = parseInt(turnToNum)*countNum;

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
                productId: listItems.altId,
                optionId: optionInfo.optionId,
                // options.map((data)=>(
                //     data.optionId
                // )),
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
    }


    //옵션 선택시
    // function makeOptionMenu(){
    //     return(
    //         <>
    //             {listItems.map((review)=>(
    //                 <div>
    //                     <div className="optionName">{review.name}</div> 
    //                     <div style={{display:"flex"}}>
    //                         <button type="button" onClick={decreaseNum}>-</button>
    //                         <div>{count}</div>
    //                         <button type="button" onClick={increaseNum}>+</button>
    //                         <button onClick={chooseOption}>선택</button>
    //                     </div>
    //                 </div>
    //             ))}
    //         </>
    //     )
    // }
    const [discripInfo, setDiscripInfo] = useState([])

    //상품 정보
    useEffect(()=>{
        axios
        .get(productGetItem + getId)
        .then((response)=>{
            console.log("response")
            console.log(response)
            setListItems(response.data)
            setDetailImg(response.data.detailImage)
            setDiscripInfo(response.data.detailImage)
            // setOptionInfo(response.data.options)
        })
    },[])

    console.log("listItems")
    console.log(listItems)

    // // 리뷰가져오기
    // useEffect(()=>{
    //     axios
    //     .get(reviewUrl + getId + `&count=5&startCursor=0`)
    //     .then((response)=>{
    //         console.log("리뷰야 내손으로 들어와라")
    //         console.log(response)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // },[])


    //장바구니 버튼
    const [cart, setCart] = useState(true)
    const ticket = localStorage.getItem("user")

    const handleCertificate =() =>{
        if(cart === true){
          if(ticket === null){
            alert("로그인을 먼저 진행해주세요")
            history.push('./login')
            return
          }else{
            history.push(`./cart`)
          }
        }
      }

    return (
        <>
            <div>
                <div className="info-lightTopicArea">
                <a href="./">
                    <i class="fas fa-arrow-left" style={{outline:"none", textDecoration:"none"}}/>
                </a>
                <div style={{display:"flex"}} type="button" onClick={handleCertificate}>
                    <a href={'./'}>
                        <i style={{color: "#000000",fontSize: 24,height: 24, marginRight: 16}} class="fas fa-home"></i>
                    </a>
                    <span class="material-icons" style={{fontSize: 24,height: 24}}>shopping_cart</span>
                </div>
            </div>


            <div>
                <div style={{textAlign:"center"}}>
                    <img style={{height:360}} src={listItems.listImage} alt={listItems.altId} />
                </div>
                <div style={{padding: "17px 0 0 16px"}}>
                    <p style={{fontSize:13,color: "#757575"}}>{listItems.distributor}</p>
                    <b style={{fontSize:18,color: "#000000"}}>{listItems.name}</b>
                    <p style={{fontSize:14,color: "#757575"}}>{listItems.description}</p>
                    <div style={{display:"flex", alignItems:"center", fontSize:25, padding:"14px 0 12px 0", borderBottom:"1px solid #eeeeee"}}>
                        <p style={{color:"#000000", fontSize: 22,  fontWeight: "bold"}}>{listItems.price}원</p>
                        <p style={{marginLeft:10,textDecoration:"line-through",color: "#bdbdbd", fontSize: 15}}>
                            {listItems.retailPrice}원
                        </p>
                    </div>
                    {/* <div style={{display:"flex"}}>
                        <button type="button" onClick={handleOptionMenu}>옵션</button>
                        <div>
                            {onOptionBtn? makeOptionMenu(): <div>필요한 옵션을 선택해주세요</div>}
                        </div>
                    </div> */}

                    <div style={{fontSize: 14 ,display:"flex", padding : "18px 0 28.5px 0", color: "#565656"}}>
                        <div style={{ color: "#9e9e9e"}}>배송비</div>
                        <div style={{marginLeft:21}}>
                            {/* <div>{option.shippingCompany.shippingFee}</div> */}
                            <div>제주, 도서지역 추가 3,000원</div>
                        </div>
                    </div>
                </div>

                <div style={{width:"100%", borderTop:"8px solid #eeeeee"}}>
                    <div style={{ display:"flex", justifyContent:"center", textAlign:"center",padding:"13px 0 13px 0", borderBottom:"solid 1px #e0e0e0"}}>
                        <div style={{width:"33%"}}  type="button" id="productExplain" className={toggle === 0?"able":"disable"} onClick={()=>onClickDetailInfo(0)}>상품설명</div>
                        <div style={{width:"34%"}}  type="button" id="productInfo" className={toggle === 1?"able":"disable"} onClick={()=>onClickDetailInfo(1)}>상세정보</div>
                        <div style={{width:"33%"}}  type="button" id="review"  className={toggle === 2?"able":"disable"} onClick={()=>onClickDetailInfo(2)}>리뷰</div>
                    </div>
                    <div >
                        {toggle === 0 &&(
                            <>
                                <img src={listItems.detailImage} alt={listItems.productId} />
                            </>
                        )}
                        {toggle === 1 &&(
                            <>
                                <div>
                                    <div style={{padding: "25px 16px 29px 16px", borderBottom:"8px solid #eeeeee"}}>
                                        <p><b>필수표기정보</b><br />
                                        {listItems.serviceInfo}</p>
                                    </div>
                                    <div style={{padding: "25px 16px 29px 16px", borderBottom:"8px solid #eeeeee"}}>
                                        <p><b>문의관련정보</b><br />
                                        {listItems.shippingInfo}</p>
                                    </div>
                                    <div style={{padding: "25px 16px 29px 16px", borderBottom:"8px solid #eeeeee"}}>
                                        <p><b>배송정보</b><br />
                                        {listItems.shippingInfo}</p>
                                    </div>
                                    <div style={{padding: "25px 16px 29px 16px", borderBottom:"8px solid #eeeeee"}}>
                                        <p><b>주문취소 안내</b><br />
                                        {listItems.paymentInfo}</p>
                                    </div>
                                    <div style={{padding: "25px 16px 29px 16px", borderBottom:"8px solid #eeeeee"}}>
                                        <p><b>교환 및 환불안내</b><br />
                                        {listItems.exchangeInfo}</p>
                                    </div>
                                </div>
                            </>
                        )}
                        {toggle === 2 &&(
                            <>
                                <div style={{padding: "0 16px 29px 16px", borderBottom:"1px solid #cccccc"}}>
                                    <div style={{ 
                                        display:"flex",width:"100%",justifyContent: "space-between", 
                                        borderBottom:"1px solid #cccccc", padding:"25px 0 16px 0",}}>
                                        <p style={{fontWeight: "bold" ,fontSize: 18, color: "#000000"}}>구매자평점({0})</p>
                                        <div>point{0}</div>
                                    </div>

                                    <div style={{padding :"100px 0 100px 0", textAlign:"center"}}>
                                        <div style={{color: "#bdbdbd", fontSize: 17}}>
                                            등록된 리뷰가 없습니다.
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        </div>
                    </div>
                    
                </div>
                
                {/* 모달 */}
                <div type="button" 
                    style={{height: 52,display:"flex", justifyContent:"center", 
                            alignItems:"center", borderRadius: 6, backgroundColor: "#ec9281",
                            fontSize: 17,color: "#ffffff",margin:"8px 10px 6px 10px"}}
                    onClick={payModal}
                    >
                    구매하기 
                </div>
                <Modal 
                    show={show} 
                    data-toggle="modal"
                    onHide={handleClose}
                >
                    <Modal.Header  style={{padding:"16px 16px 14px 16px"}} closeButton>
                        <Modal.Title>
                            <p style={{fontSize: "17", fontWeight: 500, color: "#000000"}}>옵션 선택</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding:0}}>
                        <div>
                            {/* {listItems.options.map((review)=>( */}
                            {/* {optionInfo.map((123)=>{()})  */}
                                    <>
                                        <div style={{padding : "20px 16px 20px 16px",display:"flex", 
                                            justifyContent: "space-between"}}>
                                            <div>
                                                {/* {listItems.options.map((data)=>(
                                                    data.options.name
                                                ))
                                                } */}
                                                {/* <div className="optionName">{listItems.options.name}</div>  */}
                                                <p>{listItems.price}원</p>
                                            </div>

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
                                            
                                        </div>
                                        <div style={{border:"1px solid #eeeeee",padding : "20px 16px 20px 16px"}}/>
                                    </>
                                {/* )} */}
                            {/* ))} */}
                            <div style={{border:"1px solid #eeeeee"}}/>
                        </div>
                        <div style={{padding : "0 0 120px 0",borderTop:"1px solid", backgroundColor:"#f5f5f5"}}>
                            <div style={{padding : 16,display:"flex",justifyContent: "space-between", paddingBottom:"100px",  backgroundColor:"#ffffff"}}>
                                <b><p>총 금액 : </p></b>
                                <b><p>{calcItems}원</p></b>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{padding:0}}>
                        <div type="button" 
                            style={{height: 52,width:"100%",display:"flex", justifyContent:"center", 
                                    alignItems:"center", borderRadius: 6, backgroundColor: "#ec9281",
                                    fontSize: 17,color: "#ffffff",margin:"8px 10px 6px 10px"}}
                            onClick={addProduct}
                            >장바구니 담기 
                        </div>
                    </Modal.Footer>
                </Modal>   
            </div>  
        </>
    );
};

export default ProductDetail;