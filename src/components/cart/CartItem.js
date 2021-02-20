import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CartItem = ({
    data,
    containerLayout,
    contentLayout,
    imgLayout
}) => {
    const cartUserItem = "https://childsnack-test.appspot.com/_ah/api/cart/v1/get?id="

    const query = window.location.search
    console.log(query)
    const urlParams = new URLSearchParams(query)
    console.log(urlParams)
    const getId = urlParams.get('id')
    console.log(getId)



    useEffect(()=>{
        console.log("카트 id로 불러오기")
        axios
        .get(cartUserItem + getId)
        .then((response)=>{
            console.log(response)
            //여기서 id를 못받아옴

        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    return (
        <>
            <div>
                <p>carItem</p>   
                <div>
                    {data.map((cartItem)=>(
                        <div className={containerLayout} alt={cartItem.id}>
                            <div className={contentLayout}>
                            <div style={{border:"1px solid",display: "flex"}}>
                                <img className={imgLayout} src={cartItem.img} alt={cartItem.id} />
                                {cartItem.content}
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CartItem;
CartItem.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerLayout : PropTypes.string,
    contentLayout : PropTypes.string,
    imgLayout: PropTypes.string,
}

PropTypes.defaultType = {
    data :[],
    containerLayout : 'cartContainer',
    contencontentLayouttCss : 'cartContent',
    imgLayout : 'cartImg'
}
