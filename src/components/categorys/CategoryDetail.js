import React from 'react';
import PropTypes from 'prop-types';
import "./category.css"

const CategoryDetail = ({
    data,
    containerCss,
    contentCss,
    imgCss
}) => {


    return (
        <>
            <div>
                {data.map((cateItem)=>(
                    <a href={`/productDetail?id=${cateItem.id}`}>
                        <div className={containerCss}>
                            <div className={contentCss}>
                                <img className={imgCss} src={cateItem.img} alt={cateItem.id} />
                                {cateItem.content}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default CategoryDetail;

CategoryDetail.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerCss : PropTypes.string,
    contentCss : PropTypes.string,
    imgCss: PropTypes.string,
}

PropTypes.defaultType = {
    data :[],
    containerCss : 'cateItemContainer',
    contentCss : 'contentLayout',
    imgCss : 'imgLayout'
}
