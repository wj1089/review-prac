import React from 'react';
import PropTypes from 'prop-types';

const EventDetail = ({
    data,
    containerCss,
    contentCss,
    imgCss
}) => {

    return (
        <>
            <div>
                {data.map((eventItem)=>(
                    <a href={`/productDetail?id=${eventItem.id}`}>
                        <div className={containerCss}>
                            <div className={contentCss}>
                                <img className={imgCss} src={eventItem.img} alt={eventItem.id} />
                                {eventItem.content}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default EventDetail;
EventDetail.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerCss : PropTypes.string,
    contentCss : PropTypes.string,
    imgCss: PropTypes.string,
}

PropTypes.defaultType = {
    data :[],
    containerCss : 'eventContainer',
    contentCss : 'contentLayout',
    imgCss : 'imgLayout'
}
