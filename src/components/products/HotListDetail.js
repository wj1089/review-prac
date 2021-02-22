import React from 'react';
import PropTypes from 'prop-types';

const HotDetail = ({
    data,
    containerCss,
    contentCss,
    imgCss
}) => {

    return (
        <>
            <div>
                {data.map((hotItem)=>(
                    <a href={`/productDetail?id=${hotItem.id}`}>
                        <div className={containerCss}>
                            <div className={contentCss}>
                                <img className={imgCss} src={hotItem.img} alt={hotItem.id} />
                                {hotItem.content}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default HotDetail;

HotDetail.propTypes ={
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
