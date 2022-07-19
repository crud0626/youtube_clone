import React from 'react';
import GridVideoList from 'components/GridVideoList/GridVideoList';

const Home = (props) => {
    return(
        <GridVideoList { ...props } />
    );
    
};

export default Home;