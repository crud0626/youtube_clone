import React, { memo } from 'react';
import PlaylistContainer from '~/components/playlist_container/playlist_container';
import VideoSection from '~/components/videosection/videosection';

const Watch = memo((props) => {
    return (
        <>
            <VideoSection
                currentVid={props.currentVid} 
                comments={props.comments}
                convertCount={props.convertCount}
                calcDiffDate={props.calcDiffDate}
                getMoreComments={props.getMoreComments}
            />
            <PlaylistContainer 
                videos={props.videos}
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