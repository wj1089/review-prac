import React from 'react';
import PropTypes from 'prop-types';

const NewDetail = ({
    data,
    containerCss,
    contentCss,
    imgCss
}) => {

    return (
        <>
            <div>
                {data.map((newItem)=>(
                    <a href={`/productDetail?id=${newItem.id}`}>
                        <div className={containerCss}>
                            <div className={contentCss}>
                                <img className={imgCss} src={newItem.img} alt={newItem.id} />
                                {newItem.content}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default NewDetail;

NewDetail.propTypes ={
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
