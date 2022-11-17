import React, { forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VideoBoxPresenter from './VideoBoxPresenter';
import { requestVideoInfo } from 'store/slice/videoSlice';

const VideoBoxContainer = forwardRef(({ video, setObserver, isThumbnail = true }, ref) => {
    const dispatch = useDispatch(), navigate = useNavigate();

    const onClickVideo = (video) => {
        dispatch(requestVideoInfo(video))
        .then((videoId) => navigate(`/watch?v=${videoId}`));
    };

    useEffect(() => {
        if (ref) setObserver();
    }, []);

    return (
        <VideoBoxPresenter 
            ref={ref}
            video={video}
            isThumbnail={isThumbnail}
            onClickVideo={onClickVideo}
        />
    );
});

export default VideoBoxContainer;