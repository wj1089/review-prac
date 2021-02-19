import React from 'react';
import PropTypes from 'prop-types';
import "./review.css"

const Review = ({
    data,
    reviewContainer,
    reviewContent,
    reviewImg
}) => {

    return (
        <>
            <div className="">
                {data.map((review)=>(
                    <a href={`/home?id=${review.id}`}>
                        <div className={reviewContainer}>
                            <div className={reviewContent}>
                            <img className={reviewImg} src={review.img}  alt={review.id}/>
                            {review.content}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default Review;

Review.propTypes={
    data:PropTypes.arrayOf(PropTypes.object),
    reviewContainer:PropTypes.string,
    reviewcontent:PropTypes.string,
    reviewImg:PropTypes.string
}
PropTypes.defaultType={
    data:[],
    reviewContainer:"rw-containter",
    reviewContent:"rw-content",
    reviewImg:"rw-img",
}