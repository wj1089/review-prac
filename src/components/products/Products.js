import React,{useState} from 'react';
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';
import "./product.css"


const Products = ({
    data,
    containerCss,
    contentCss,
    imgCss
}) => {

    return (
        <>
            <div className="productZone">
                <div className="slide-area">
                    <div className="show-slide">

                        {data.map((item)=>(
                            <a href={`/productDetail?id=${item.id}`}>
                                <div className={containerCss}>
                                    <div className={contentCss}>
                                        <img className={imgCss} src={item.img} alt={item.id} />
                                        {item.content}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;

Products.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerCss : PropTypes.string,
    contentCss : PropTypes.string,
    imgCss: PropTypes.string,
}

PropTypes.defaultType = {
    data :[],
    containerCss : 'itemContainer',
    contentCss : 'contentLayout',
    imgCss : 'imgLayout'
}
