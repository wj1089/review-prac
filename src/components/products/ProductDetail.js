import React,{useEffect} from 'react';
import axios from 'axios'

const ProductDetail = () => {
    
    const productGetItem = "https://childsnack-test.appspot.com/_ah/api/product/v1/get?id="
    
    const query = window.location.search
    console.log(query)
    
    const urlParams = new URLSearchParams(query)
    console.log(urlParams)

    const getId = urlParams.get('id')
    console.log(getId)

    useEffect(()=>{
        console.log("디테일 왔음")
        console.log("data")
        axios
        .get(productGetItem + getId)
        .then((response)=>{
            console.log("response")
            console.log(response)
        })
    })


    return (
        <>
            <div>
                <h4>Product Detail</h4>
            </div>  
        </>
    );
};

export default ProductDetail;