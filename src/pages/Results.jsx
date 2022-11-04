import React from 'react';
import { useLocation } from 'react-router-dom';
import GridVideoListContainer from 'components/GridVideoList/GridVideoListContainer';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';

const Results = () => {
    const { pathname, search } = useLocation();

    useScrollUp([pathname, search]);
    useBackHome();

    return (
        <GridVideoListContainer />
    );
};

export default Results;