import React, { memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaylistContainer from '~/components/playlist_container/playlist_container';
import VideoSection from '~/components/videosection/videosection';

const Watch = memo((props) => {
    const navigate = useNavigate();
    const {pathname, search} = useLocation();

    useEffect(() => {
        if (window.location.search === "") {
            navigate("/");
            return;
        }
    
        if (window.location.search.includes("?v=") && !props.currentVid.id) {
            const id = (function() {
                let videoID = window.location.search.split("?v=")[1];
                if (videoID.length > 11) {
                    videoID = videoID.slice(0, 11);
                }
                
                return videoID;
            })();

            props.youtube.getOneVideoInfo(id)
            .then(data => {
                props.clickedVideo(data);
            });
            return;
        }
    }, []);
    
    useEffect(() => window.scrollTo(0, 0), [pathname, search]);

    if (props.currentVid.id === undefined) {
        return (
            <div></div>
        );
    } else {
        return (
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
    }
});

export default Watch;