import React from 'react';
import { useLocation } from 'react-router-dom';
import Playlist from 'components/Playlist/Playlist';
import VideoSection from 'components/Videosection/Videosection';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';


const Watch = (props) => {
    const {pathname, search} = useLocation();
    useScrollUp([pathname, search]);
    useBackHome();
    
    return (
        props.currentVid.id && 
        <>
            <VideoSection
                user={props.user}
                currentVid={props.currentVid} 
                comments={props.comments}
                convertCount={props.convertCount}
                calcDiffDate={props.calcDiffDate}
                getMoreComments={props.getMoreComments}
                youtube={props.youtube}
                ratingVideo={props.ratingVideo}
                onLogIn={props.onLogIn}
            />
            <Playlist 
                videos={props.videos}
                videoNextToken={props.videoNextToken}
                clickedVideo={props.clickedVideo}
                selected={props.currentVid.id}
                convertCount={props.convertCount}
                calcDiffDate={props.calcDiffDate}
                convertVideoDuration={props.convertVideoDuration}
                getMoreVideos={props.getMoreVideos}
            />
        </>
    );
};

export default Watch;