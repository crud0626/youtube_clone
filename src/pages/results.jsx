import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlaylistContainer from '../components/Playlist_container/Playlist_container';

const Results = ({ onSearch, ...props}) => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    
    useEffect(() => window.scrollTo(0, 0), [pathname, search]);

    useEffect(() => {
        if (!window.location.search) {
            navigate("/");
            return;
        }
        
        if (window.location.search.includes("?search_query=")) {
            const query = window.location.search.split("?search_query=")[1];
            onSearch(decodeURIComponent(query));
            return;
        }
    }, []);

    return (
        <PlaylistContainer { ...props } />
    );
};

export default Results;