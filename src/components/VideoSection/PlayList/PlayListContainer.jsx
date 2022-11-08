import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useScrollObserver from 'hooks/useScrollObserver';
import youtubeAPI from 'service/youtube-api';
import { ADD_VIDEO_LIST, CHANGE_VIDEO_LOADING } from 'store/slice/videoSlice';
import PlayList from './PlayList';

const PlayListContainer = ({ isInSection }) => {
    const dispatch = useDispatch();
    const { videos } = useSelector(state => state.video);
    const { isSearched, searchQuery } = useSelector(state => state.condition);
    const [isLoading, setIsLoading] = useState(false);

    const observerCallback = () => {
        if (window.innerWidth > 1016) {
            getVideo();
        }
    };

    const getMoreVideo = async () => {
        dispatch(CHANGE_VIDEO_LOADING());
    
        isSearched
        ? await youtubeAPI.searchVideo(searchQuery, videos.nextPageToken) 
        : await youtubeAPI.getMostPopular(videos.nextPageToken)
        .then(({ items, nextPageToken }) => {
            dispatch(ADD_VIDEO_LIST({ items, nextPageToken }));
        })
        .finally(() => dispatch(CHANGE_VIDEO_LOADING()));
    }

    const getVideo = async () => {
        setIsLoading(true);
        await getMoreVideo()
        .then(() => setIsLoading(false));
    }

    const [lastVideoRef, setObserver] = useScrollObserver(observerCallback);

    return (
        <PlayList 
            ref={lastVideoRef}
            videos={videos}
            isInSection={isInSection}
            isLoading={isLoading}
            getVideo={getVideo}
            setObserver={setObserver}
        />
    );
};

export default PlayListContainer;