import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoSectionPresenter from './VideoSectionPresenter';
import useResizeObserver from 'hooks/useResizeObserver';
import useTextOver from 'hooks/useTextOver';

const VideoSectionContainer = () => {
    const isInSection = useResizeObserver(1016);
    const { selectedVideo } = useSelector(state => state.video);
    const [isOpenFlip, setIsOpenFlip] = useState(false);
    const [isTextOver, descRef] = useTextOver();

    const handleToggle = useCallback(() => setIsOpenFlip((prevState) => !prevState), []);

    const convertToLink = useCallback((text) => {
        const convertedText = text.replace(/\bhttps?:\/\/\S+\b/g, '<a href=$& target="_blank" rel="noreferrer">$&</a>');
        return { __html: convertedText };
    }, []);

    
    return (
        <VideoSectionPresenter 
            ref={descRef}
            selectedVideo={selectedVideo}
            isOpenFlip={isOpenFlip}
            isTextOver={isTextOver}
            isInSection={isInSection}
            handleToggle={handleToggle}
            convertToLink={convertToLink}
        />
    );
};

export default VideoSectionContainer;
