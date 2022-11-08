import React from 'react';
import { useLocation } from 'react-router-dom';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';
import VideoSectionContainer from 'components/VideoSection/VideoSectionContainer';

const Watch = () => {
    const { pathname, search } = useLocation();

    useScrollUp([pathname, search]);
    useBackHome();

    return (
        <VideoSectionContainer />
    );
};

export default Watch;