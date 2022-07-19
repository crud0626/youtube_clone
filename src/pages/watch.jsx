import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoSection from 'components/VideoSection/VideoSection';
import PlayList from 'components/PlayList/PlayList';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';
import useResizeObserver from 'hooks/useResizeObserver';

const Watch = (props) => {
    const { pathname, search } = useLocation();
    const isInSection = useResizeObserver(1016);

    console.log(isInSection);

    useScrollUp([pathname, search]);
    useBackHome();

    return (
        props.selectedVideo.id && 
        <section className="section-select-video">
            <VideoSection
                userData={props.userData}
                comments={props.comments}
                selectedVideo={props.selectedVideo} 
                calculator={props.calculator}
                getMoreComment={props.getMoreComment}
                youtube={props.youtube}
                onLogIn={props.onLogIn}
            />
            <PlayList 
                videos={props.videos}
                onClickVideo={props.onClickVideo}
                calculator={props.calculator}
                getMoreVideo={props.getMoreVideo}
                isInSection={isInSection}
            />
        </section>
    );
};

export default Watch;