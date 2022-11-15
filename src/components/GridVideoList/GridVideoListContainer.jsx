import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridVideoListPresenter from './GridVideoListPresenter';
import useScrollObserver from 'hooks/useScrollObserver';
import { CHANGE_VIDEO_LOADING, requestSearchData, requestVideoData } from 'store/slice/videoSlice';
import { initVideo } from 'store/actions/initVideo';

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

    useEffect(() => {
        if(!isVideoLoading && !videos.items.length) {
            dispatch(initVideo());
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