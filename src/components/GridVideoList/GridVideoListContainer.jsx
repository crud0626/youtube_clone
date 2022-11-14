import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridVideoListPresenter from './GridVideoListPresenter';
import useScrollObserver from 'hooks/useScrollObserver';
import { ADD_VIDEO_LIST, CHANGE_VIDEO_LOADING, requestSearchData, requestVideoData, RESET_SELECTED_VIDEO } from 'store/slice/videoSlice';

const GridVideoListContainer = () => {
    const { videos, isVideoLoading } = useSelector(state => state.video);
    const { isSearched, searchQuery } = useSelector(state => state.condition);
    const dispatch = useDispatch();

    const getMoreVideo = () => {
        dispatch(CHANGE_VIDEO_LOADING());

        if(isSearched) {
            dispatch(requestSearchData({ searchQuery, nextToken: videos.nextPageToken}))
            .finally(() => dispatch(CHANGE_VIDEO_LOADING()))
            return;
        }
        
        dispatch(requestVideoData(videos.nextPageToken))
        .finally(() => dispatch(CHANGE_VIDEO_LOADING()));
    }

    
    const observerCallback = () => {
        if (videos.nextPageToken && !isVideoLoading) {
            getMoreVideo();
        }
    };

    const [lastVideoRef, setObserver] = useScrollObserver(observerCallback);

    const initVideo = () => {
        const dummyVideos = { items: new Array(24).fill(""), nextPageToken: null};

        dispatch(CHANGE_VIDEO_LOADING());
        dispatch(ADD_VIDEO_LIST(dummyVideos));

        dispatch(requestVideoData())
        .then(() => dispatch(RESET_SELECTED_VIDEO()))
        .finally(() => dispatch(CHANGE_VIDEO_LOADING()));
    }

    useEffect(() => {
        if(!isVideoLoading && !videos.items.length) {
            initVideo();
        }
    }, []);

    return (
        <GridVideoListPresenter 
            ref={lastVideoRef}
            videos={videos}
            isVideoLoading={isVideoLoading}
            isSearched={isSearched}
            setObserver={setObserver}
        />
    );
};

export default GridVideoListContainer;