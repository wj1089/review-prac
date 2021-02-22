import React from 'react';
import PropTypes from 'prop-types';

const StoryDetail = ({
data,
containerCss,
contentCss,
imgCss
}) => {




    
    return (
        <>
            <div>
                {data.map((story)=>(
                    <a href={`${story.blogUrl}`}>
                        <div className={containerCss}>
                            <div className={contentCss}>
                                <img className={imgCss} src={story.img} alt={story.id} />
                                {story.title}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default StoryDetail;

StoryDetail.propTypes ={
    data: PropTypes.arrayOf(PropTypes.object),
    containerCss : PropTypes.string,
    contentCss : PropTypes.string,
    imgCss: PropTypes.string,
}

PropTypes.defaultType = {
    data :[],
    containerCss : 'story-Container',
    contentCss : 'story-contentLayout',
    imgCss : 'story-imgLayout'
}
