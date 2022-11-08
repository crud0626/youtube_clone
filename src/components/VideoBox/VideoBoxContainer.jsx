import React, { forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import youtubeAPI from 'service/youtube-api';
import { ADD_COMMENTS, CHANGE_SELECTED_VIDEO } from 'store/slice/videoSlice';
import VideoBox from './VideoBox';

const VideoBoxContainer = forwardRef(({ video, setObserver, isThumbnail = true }, ref) => {
    const dispatch = useDispatch(), navigate = useNavigate();
    const onClickVideo = async (video) => {
        await youtubeAPI.getCurrentVidInfo(video)
        .then(({ info, comments }) => {
            dispatch(CHANGE_SELECTED_VIDEO(info));
            dispatch(ADD_COMMENTS({
                items: comments.items,
                nextPageToken: comments.nextPageToken
            }));
            navigate(`/watch?v=${video.id}`);
        });
    };

    useEffect(() => {
        if (ref) setObserver();
    }, []);

    return (
        <VideoBox 
            ref={ref}
            video={video}
            isThumbnail={isThumbnail}
            onClickVideo={onClickVideo}
        />
    );
});

export default VideoBoxContainer;