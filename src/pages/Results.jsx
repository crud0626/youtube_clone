import React from 'react';
import { useLocation } from 'react-router-dom';
import GridVideoList from 'components/GridVideoList';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';

const Results = () => {
    const { pathname, search } = useLocation();

    useScrollUp([pathname, search]);
    useBackHome();

    return (
        <GridVideoList />
    );
};

export default Results;