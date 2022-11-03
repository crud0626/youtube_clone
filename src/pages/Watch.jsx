import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoSection from 'components/VideoSection/VideoSection';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';

const Watch = (props) => {
    const { pathname, search } = useLocation();

    useScrollUp([pathname, search]);
    useBackHome();

    return (
        <VideoSection { ...props } />
    );
};

export default Watch;