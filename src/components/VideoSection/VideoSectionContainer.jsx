import React from 'react';
import VideoSectionPresenter from './VideoSectionPresenter';
import useResizeObserver from 'hooks/useResizeObserver';

const VideoSectionContainer = () => {
    const isInSection = useResizeObserver(1016);
    
    return (
        <VideoSectionPresenter isInSection={isInSection} />
    );
};

export default VideoSectionContainer;
