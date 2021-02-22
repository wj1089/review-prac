import React from 'react';
import PropTypes from 'prop-types';
import "./story.css"

const Story = ({
    data,
    storyContainer,
    storycontent,
    storyImg
    
}) => {
    
    
    return (
        <>
            {data.map((story)=>(
                <a href={`${story.blogUrl}`}>
                <div className={storyContainer}>
                    <div className={storycontent}>
                    <img className={storyImg} src={story.img}  alt={story.id}/>
                    {story.title}
                    </div>
                </div>
                </a>
            ))}
        </>
    );
};

export default Story;
Story.propTypes={
    data:PropTypes.arrayOf(PropTypes.object),
    storyContainer:PropTypes.string,
    storycontent:PropTypes.string,
    storyImg:PropTypes.string,
    storyUrl:PropTypes.string
}
PropTypes.defaultType={
    data:[],
    storyContainer:"st-containter",
    storyContent:"st-content",
    storyImg:"st-img",
}