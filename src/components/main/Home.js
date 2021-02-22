import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from '../navi/Navbar';
import authHeader from "../../actions/userAction"
import Products from "../products/Products"
import DownNav from '../navi/DownNav';
import Review from '../review/Review';
import Story from '../story/Story';
import Event from '../event/Event'
import "./home.css"
import NewArrive from '../products/NewArrive';

const Home = () => {
    const productGetList = "https://childsnack-test.appspot.com/_ah/api/product/v1/getProductList?count=10&startCursor=0";
    const productGetItem = "https://childsnack-test.appspot.com/_ah/api/product/v1/get?id="
    const getAllList = "https://childsnack-test.appspot.com/_ah/api/category/v1/getAllList"
    const getMainList = "https://childsnack-test.appspot.com/_ah/api/category/v1/getMainList"
    
    const getReviewList = "https://childsnack-test.appspot.com/_ah/api/review/v1/getReviewList?count=10&startCursor=0"
    const getProReviewList = "https://childsnack-test.appspot.com/_ah/api/review/v1/getProductReviewList?count=10&startCursor=0&productId="
    
    const getStoryList = "https://childsnack-test.appspot.com/_ah/api/blogcontent/v1/list?count=5&startCursor=0"
    const getList = "https://childsnack-test.appspot.com/_ah/api/category/v1/getList?id="
    const eventBenerList = "https://childsnack-test.appspot.com/_ah/api/event/v1/getAllEvent?type=1"
    const eventLink = "https://storage.googleapis.com/igre-event/event%20landing.html"

    //임의로 넣은 product info
    const [itemInfo, setItemInfo] = useState([])
    //상품 전체 리스트
    const [itemList,setItemList] = useState([])
    //MD 추천 리스트
    const [mdRecommend, setMdRecommend] = useState([])
    //상품후기
    const [userReview, setUserReview] = useState([])
    //Tag 추천
    const [tagRecommend, setTagRecommend] = useState([])
    //중간베너
    // const [mdRecommend, setMdRecommend] = useState([])
    //인기상품
    const [hotProduct, setHotProduct] = useState([])
    //스토리
    const [story, setStory] = useState([])
    // const [mdRecommend, setMdRecommend] = useState([])

 
    const [certificate, setCertificate] = useState('')
    const [itemClick, setItemClick] = useState(false)


    //이벤트
    const [event, setEvent] = useState([])
    const[eventMeal , setEventMeal ] = useState([])
    const[eventSnack, setEventSnack] = useState([])
    const[eventCoupon, setEventCoupon] = useState([])


    //신상품 리스트 가져오기
    useEffect(()=>{
        axios
        .get(getAllList)
        .then((response)=>{
            //신상품
            // console.log("get all List response")
            // console.log(response)
            if(response.data.items[7]){
                const listArr = [];
                response.data.items[7].products.map((item)=>listArr.push({
                    id: item.productId,
                    img: item.thumnail,
                    content: makeGetItemElement(
                        item.originClassification,
                        item.name,
                        item.retailPrice,
                        item.price,
                        )
                }))
                    setItemList(listArr)
            }

            //tag추천
            if(response.data.items[0]){
                const listArr = [];
                response.data.items[0].products.map((item)=>listArr.push({
                    id: item.productId,
                    img: item.thumnail,
                    tag : item.tags,
                    content: makeTagRecomendElement(
                        item.originClassification,
                        item.name,
                        item.retailPrice,
                        item.price,
                        )
                }))
                setTagRecommend(listArr)
            }

            //hotProduct추천
            if(response.data.items[5]){
                const listArr = [];
                response.data.items[5].products.map((item)=>listArr.push({
                    id: item.productId,
                    img: item.thumnail,
                    content: makeHotProductElement(
                        item.originClassification,
                        item.name,
                        item.retailPrice,
                        item.price,
                        )
                }))
                setHotProduct(listArr)
            }

            //md 추천
            if(response.data.items[1]){
                const listArr = [];
                response.data.items[1].products.map((item)=>listArr.push({
                    id: item.productId,
                    img: item.thumnail,
                    content: makeMdRecomendElement(
                        item.originClassification,
                        item.name,
                        item.retailPrice,
                        item.price,
                    )
                }))
                setMdRecommend(listArr)
            }
                setItemClick(true)
            });
    }, []);

 

    // 상품 후기 불러오기
    useEffect(()=>{
        axios
        .get(getReviewList, {headers: authHeader()})
        .then((response)=>{
            const listArr = [];
            response.data.item.map((review)=>listArr.push({
                id : review.id,
                img : review.product.thumnail,
                content: makeReviewElement(
                    review.product.name,
                    review.point,
                    review.description,
                    review.shippingFee
                )
            }))
            setUserReview(listArr)
        })
    },[])

    // 상단 event bener
    useEffect(()=>{
        axios
        .get(eventBenerList)
        .then((response)=>{
            console.log("상단 event bener 내부 response")
            console.log(response)
            const listArr = [];
            response.data.items.map((event)=>listArr.push({
                id : event.id,
                img : event.thumbnail
            }))
            setEvent(listArr)
        })
    },[])

    

    //스토리
    useEffect(()=>{
        console.log("스토리")
        axios
        .get(getStoryList, {headers: authHeader()})
        .then((response)=>{
            const listArr = [];
            response.data.item.map((story)=>listArr.push({
                id:story.id,
                img:story.thumbnail,
                title:story.title,
                blogUrl:story.blogUrl
            }))
            setStory(listArr)
        })
    },[])

    console.log(story)

    //상품이용 후기 
    function makeReviewElement (name,point,description){
        return(
            <>
                <div className="reviewText">
                    <p className="reviewName">{name}</p>
                    <p className="reviewPoint">{point}</p>
                    <p className="reviewDescrip">{description}</p>
                </div>
            </>
        )
    }


    //신상품
    function makeGetItemElement(name, originClassification,retailPrice,price) {
        return (
          <>
            <div className="contentText">
              <p className="contentName">{name}</p>
              <p className="contentCompany">{originClassification}</p>

              <div style={{display:"flex", alignItems:"center"}}>
                <p className="contentPrice">{price}</p>
                <p className="contentRetailPrice">{retailPrice}</p>
              </div>

            </div>
          </>
        );
      }

    ///MD추천
    function makeMdRecomendElement(name,price,retailPrice) {
        return (
          <>
            <div className="mdAdviceText">
                <p className="mdAdviceName">{name}</p>
                <div style={{display:"flex", alignItems:"center"}}>
                    <p className="contentRetailPrice">{retailPrice}</p>
                    <p className="contentPrice">{price}</p>
                </div>
                <div>"더보기"</div>
            </div>
          </>
        );
      }

    //tag추천
    function makeTagRecomendElement(name,price,retailPrice) {
        return (
          <>
            <div className="tagRecomText">
                <p className="tagRecomName">{name}</p>
                <div style={{display:"flex", alignItems:"center"}}>
                    <p className="contentRetailPrice">{retailPrice}</p>
                    <p className="contentPrice">{price}</p>
                </div>
                <div>"더보기"</div>
            </div>
          </>
        );
      }

    //hotProduct 추천
    function makeHotProductElement(name,price,retailPrice) {
        return (
          <>
            <div className="reviewText">
                <p className="reviewName">{name}</p>
                <div style={{display:"flex", alignItems:"center"}}>
                    <p className="contentRetailPrice">{retailPrice}</p>
                    <p className="contentPrice">{price}</p>
                </div>
                <div>"더보기"</div>
            </div>
          </>
        );
      }
     
    return (
        <>
            <div className="full-screen">


                <div className="screen-main">
                    <div className="main-center">

                    <div className="nav-header">
                        <Navbar />
                    </div>
                    {/* marginTop:"60px",  */}
                        <div style={{
                            width:"100%",
                            // height:328.3,
                            border:"1px solid", 
                            backgroundColor:"lightgray"}}>
                            <div>
                                <Event 
                                    data={event}
                                    eventImg="evt-img"
                                />
                            </div>
                        </div>

                        <body style={{ border:"1px solid"}}>
                            <div style={{ width:"100%",height: 70, border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}>
                                <h3>신상품</h3>
                                <a href="./newArrive">
                                    <button type="button" style={{float:'right'}} >더보기</button>
                                </a>
                            </div>
                            <div style={{display:"flex", alignContent:"center",justifyContent:"center", height:400, border:"1px solid",textAlign:"center"}}>
                                <Products 
                                    data={itemList}
                                    containerCss="itemContainer"
                                    contentCss="contentLayout"
                                    imgCss="imgLayout"
                                />
                            </div>

                            
                            <div style={{ width:"100%",height: 70, border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}>
                                <h3>MD 추천</h3>
                                {/* <p style={{float:'right'}}>더보기</p> */}
                            </div>
                            <div style={{display:"flex", alignContent:"center",justifyContent:"center", height:400, border:"1px solid",textAlign:"center"}}>
                                <Products 
                                    data={mdRecommend}
                                    containerCss="itemContainer"
                                    contentCss="contentLayout"
                                    imgCss="imgLayout"
                                />
                            </div>

                            
                            <div style={{ width:"100%",height: 70, border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}>
                                <h3>상품후기</h3>
                            </div>
                            <div style={{display:"flex", height:400, border:"1px solid",textAlign:"center"}}>
                                <Review 
                                    data={userReview}
                                    reviewContainer="rw-containter"
                                    reviewcontent="rw-content"
                                    reviewImg= "rw-img"
                                />
                            </div>

                            
                            <div style={{ width:"100%",height: 70, border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}>
                                <h3>#TAG 추천</h3>
                            </div>
                            <div style={{display:"flex", alignContent:"center",justifyContent:"center", height:400, border:"1px solid",textAlign:"center"}}>
                                <Products 
                                    data={tagRecommend}
                                    containerCss="itemContainer"
                                    contentCss="contentLayout"
                                    imgCss="imgLayout"
                                />
                            </div>

                            <div style={{width:"100%",height: 70, border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}>
                                <h3>중간 베너</h3>
                            </div>
                            <div style={{ display:"flex",border:"1px solid",justifyContent:"center"}}>
                                {/* <Event 
                                    data={event}
                                    eventImg="evt-img"
                                /> */}
                                <a href={eventLink} style={{ border:"1px solid",width:150, height:150}}>이미지 링크</a>
                            </div>


                            <div style={{ width:"100%",height: 70, border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}>
                                <h3>인기상품</h3>
                                <a href="./hotListMore">
                                    <button type="button" style={{float:'right'}} >더보기</button>
                                </a>
                                {/* <a href="./"><p style={{float:'right'}}>더보기</p></a> */}
                            </div>
                            <div style={{ height:400,display:"flex", alignContent:"center",justifyContent:"center",border:"1px solid",textAlign:"center"}}>
                                <Products 
                                    data={hotProduct}
                                    containerCss="itemContainer"
                                    contentCss="contentLayout"
                                    imgCss="imgLayout"
                                />
                            </div>

                            <div style={{ width:"100%",height: 70, border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}>
                                <h3>스토리</h3>
                                <a href="./storyMore">
                                    <button type="button" style={{float:'right'}} >더보기</button>
                                </a>
                            </div>
                            <div style={{ height:400, border:"1px solid",textAlign:"center",display:"flex"}}>
                                <Story
                                    data={story}
                                    containerCss="st-containter"
                                    contentCss="st-content"
                                    imgCss="st-img"
                                />
                            </div>

                            
                            <div style={{ height:400, border:"1px solid",textAlign:"center"}}>
                                {/* <div style={{ width:"100%", border:"1px solid",display:"flex", padding:" 20px 0 0 20px"}}> */}
                                    <h3>하단 베너</h3>
                                    <button>자세히보기</button>
                                {/* </div> */}
                            </div>

                        </body>

                        <footer style={{backgroundColor:"lightBlue", height:400, border:"1px solid"}}>
                            <div>
                                footer
                            </div>
                        </footer>

                        <DownNav />
                    </div>
                </div>

            </div>
        </>
    );
};

export default withRouter(Home);

