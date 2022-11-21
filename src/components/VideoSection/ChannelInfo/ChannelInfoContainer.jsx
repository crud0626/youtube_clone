import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ChannelInfoPresenter from './ChannelInfoPresenter';
import useTextOver from 'hooks/useTextOver';

const ChannelInfoContainer = () => {
    const [isTextOver, descRef] = useTextOver();
    const { selectedVideo } = useSelector(state => state.video);
    const [isOpenFlip, setIsOpenFlip] = useState(false);

    const handleToggle = useCallback(() => 
        setIsOpenFlip((prevState) => !prevState)
    , []);

    const convertToLink = useCallback((text) => {
        const convertedText = text.replace(/\bhttps?:\/\/\S+\b/g, 
            '<a href=$& target="_blank" rel="noreferrer">$&</a>'
        );
        return { __html: convertedText };
    }, []);
    
    return (
        <ChannelInfoPresenter 
            ref={descRef}
            isTextOver={isTextOver}
            isOpenFlip={isOpenFlip}
            selectedVideo={selectedVideo}
            handleToggle={handleToggle}
            convertToLink={convertToLink}
        />
    );
};

export default ChannelInfoContainer;