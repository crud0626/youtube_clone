import React from 'react';
import { useLocation } from 'react-router-dom';
import Playlist from 'components/Playlist/Playlist';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';

const Results = ({ ...props}) => {
    const { pathname, search } = useLocation();
    useScrollUp([pathname, search]);
    useBackHome();

    return (
        <Playlist { ...props } />
    );
};

export default Results;