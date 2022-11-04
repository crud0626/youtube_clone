import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridVideoList from './GridVideoList';
import useScrollObserver from 'hooks/useScrollObserver';
import youtubeAPI from 'service/youtube-api';
import { ADD_VIDEO_LIST, CHANGE_VIDEO_LOADING, RESET_SELECTED_VIDEO, RESET_VIDEO_LIST } from 'store/slice/videoSlice';

const GridVideoListContainer = () => {
    const { videos, isVideoLoading } = useSelector(state => state.video);
    const { isSearched, searchQuery } = useSelector(state => state.condition);
    const dispatch = useDispatch();

    // 이름 변경예정, isVideoLoading이 사용중이라서
    const [isLoading, setIsLoading] = useState(false);

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

    
    const observerCallback = async () => {
        if (videos.nextPageToken && !isVideoLoading) {
            setIsLoading(true);
            await getMoreVideo()
            // finally로 변경
            .then(() => setIsLoading(false));
        }
    };

    const [lastVideoRef, setObserver] = useScrollObserver(observerCallback);

    const initVideo = async () => {
        const dummyVideos = { items: new Array(24).fill(""), nextPageToken: null};
        
        dispatch(CHANGE_VIDEO_LOADING());
        dispatch(ADD_VIDEO_LIST(dummyVideos));

        await youtubeAPI.getMostPopular()
        .then(({ items, nextPageToken }) => {
            dispatch(RESET_VIDEO_LIST());
            dispatch(ADD_VIDEO_LIST({ items, nextPageToken }));
            dispatch(RESET_SELECTED_VIDEO());
        })
        .finally(() => dispatch(CHANGE_VIDEO_LOADING()));
    }

    useEffect(() => {
        if(!isVideoLoading && !videos.items.length) {
            initVideo();
        }
    }, []);

    return (
        <GridVideoList 
            ref={lastVideoRef}
            videos={videos}
            isVideoLoading={isVideoLoading}
            isLoading={isLoading}
            setObserver={setObserver}
        />
    );
};

export default GridVideoListContainer;