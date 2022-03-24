import React, { memo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlaylistContainer from '~/components/playlist_container/playlist_container';

const Results = memo((props) => {
    const navigate = useNavigate();
    const {pathname, search} = useLocation();
    
    useEffect(() => window.scrollTo(0, 0), [pathname, search]);

    useEffect(() => {
        if (window.location.search === "") {
            navigate("/");
            return;
        }
        
        if (window.location.search.includes("?search_query=")) {
            const query = window.location.search.split("?search_query=")[1];
            props.onSearch(decodeURIComponent(query));
            return;
        }
    }, []);

    return (
        <PlaylistContainer 
            videos={props.videos}
            videoNextToken={props.videoNextToken}
            clickedVideo={props.clickedVideo}
            selected={props.selected}
            convertCount={props.convertCount}
            calcDiffDate={props.calcDiffDate}
            convertVideoDuration={props.convertVideoDuration}
            getMoreVideos={props.getMoreVideos}
        />
    );
});

export default Results;