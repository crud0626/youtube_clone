import React from 'react';
import Playlist from 'components/Playlist/Playlist';

const Home = (props) => {
    return(
        <Playlist { ...props } />
    );
    
};

export default Home;