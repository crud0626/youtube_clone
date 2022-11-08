import React from 'react';
import { useLocation } from 'react-router-dom';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';
import VideoSection from 'components/VideoSection';

const Watch = () => {
    const { pathname, search } = useLocation();

    useScrollUp([pathname, search]);
    useBackHome();

    return (
        <VideoSection />
    );
};

export default Watch;