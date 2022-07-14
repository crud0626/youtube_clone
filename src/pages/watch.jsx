import React from 'react';
import { useLocation } from 'react-router-dom';
import Playlist from 'components/Playlist/Playlist';
import VideoSection from 'components/VideoSection/VideoSection';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';


const Watch = (props) => {
    const { pathname, search } = useLocation();
    useScrollUp([pathname, search]);
    useBackHome();
    
    return (
        props.selectedVideo.id && 
        <>
            <VideoSection
                userData={props.userData}
                comments={props.comments}
                selectedVideo={props.selectedVideo} 
                calculator={props.calculator}
                getMoreComment={props.getMoreComment}
                youtube={props.youtube}
                onLogIn={props.onLogIn}
            />
            <Playlist 
                videos={props.videos}
                onClickVideo={props.onClickVideo}
                calculator={props.calculator}
                getMoreVideo={props.getMoreVideo}
            />
        </>
    );
};

export default Watch;