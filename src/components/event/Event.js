import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/Review';

const Event = ({
    data,
    eventImg
}) => {


    return (
        <>
            <div>
                {data.map((event)=>(
                    <img className={eventImg} src={event.img} alt={event.id} />
                ))}
            </div>  
        </>
    );
};

export default Event;
Event.propTypes ={
    data:PropTypes.arrayOf(PropTypes.object),
    eventImg : PropTypes.string
}
PropTypes.defaultType={
    data:[],
    eventImg : "evt-img"
}