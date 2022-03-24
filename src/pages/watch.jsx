import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PlaylistContainer from '~/components/playlist_container/playlist_container';
import VideoSection from '~/components/videosection/videosection';

const Watch = memo((props) => {
    const {pathname, search} = useLocation();
    
    useEffect(() => window.scrollTo(0, 0), [pathname, search]);
    
    return (
        <>
            <VideoSection
                currentVid={props.currentVid} 
                comments={props.comments}
                convertCount={props.convertCount}
                calcDiffDate={props.calcDiffDate}
                getMoreComments={props.getMoreComments}
                youtube={props.youtube}
                ratingVideo={props.ratingVideo}
            />
            <PlaylistContainer 
                videos={props.videos}
                videoNextToken={props.videoNextToken}
                clickedVideo={props.clickedVideo}
                selected={props.selected}
                convertCount={props.convertCount}
                calcDiffDate={props.calcDiffDate}
                convertVideoDuration={props.convertVideoDuration}
                getMoreVideos={props.getMoreVideos}
            />
        </>
    );
});

export default Watch;