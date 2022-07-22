import React from 'react';
import { useLocation } from 'react-router-dom';
import GridVideoList from 'components/GridVideoList/GridVideoList';
import useScrollUp from 'hooks/useScrollUp';
import useBackHome from 'hooks/useBackHome';

const Results = (props) => {
    const { pathname, search } = useLocation();
    useScrollUp([pathname, search]);
    useBackHome();

    return (
        <GridVideoList { ...props } />
    );
};

export default Results;