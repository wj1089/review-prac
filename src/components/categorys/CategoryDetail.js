import React from 'react';
import PropTypes from 'prop-types';

const CategoryDetail = ({
 data,containerCss,contentCss,imgCss
}) => {


    return (
        <>
            {data.map((category)=>(
                // <a href={`/`}>
                    <div className={containerCss}>
                        <div className={contentCss}>
                            <img className={imgCss} src={category.img} alt={category.id} />
                            {category.fullName}
                        </div>
                    </div>
                // </a>
            ))
            }
        </>
    );
};

export default CategoryDetail;
CategoryDetail.propTypes={
    data:PropTypes.arrayOf(PropTypes.object),
    containerCss: PropTypes.string,
    contentCss: PropTypes.string,
    imgCss: PropTypes.string
}

PropTypes.defaultType= {
    data:[],
    containerCss:"categoryContainer",
    contentCss:"categoryContent",
    imgCss:"categoryImg"
}

