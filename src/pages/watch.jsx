import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaylistContainer from '../components/Playlist_container/Playlist_container';
import VideoSection from '../components/Videosection/Videosection';

const Watch = (props) => {
    const navigate = useNavigate();
    const {pathname, search} = useLocation();

    useEffect(() => window.scrollTo(0, 0), [pathname, search]);

    useEffect(() => {
        if (!window.location.search === "") {
            navigate("/");
            return;
        }
    
        if (window.location.search.includes("?v=") && !props.currentVid.id) {
            const id = (function() {
                let videoID = window.location.search.split("?v=")[1];
                if (videoID.length > 11) videoID = videoID.slice(0, 11);

                return videoID;
            })();

            props.youtube.getOneVideoInfo(id)
            .then(data => {
                props.clickedVideo(data);
            });
        }
    }, []);
    
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
            <PlaylistContainer 
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