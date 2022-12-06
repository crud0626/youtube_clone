import React, { forwardRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useStableNavigate } from 'hooks/useStableNavigate';
import VideoBoxPresenter from './VideoBoxPresenter';
import { requestVideoInfo } from 'store/slice/videoSlice';

const VideoBoxContainer = forwardRef(({ video, setObserver, isThumbnail = true }, ref) => {
    const dispatch = useDispatch(), navigate = useStableNavigate();

    const onClickVideo = (video) => {
        dispatch(requestVideoInfo(video))
        .then(() => navigate(`/watch?v=${video.id}`));
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