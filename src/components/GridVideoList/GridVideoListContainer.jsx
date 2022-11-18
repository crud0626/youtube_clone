import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridVideoListPresenter from './GridVideoListPresenter';
import useScrollObserver from 'hooks/useScrollObserver';
import { initVideo } from 'store/actions/initVideo';
import { getMoreVideo } from 'store/actions/getMoreVideo';

const GridVideoListContainer = () => {
    const dispatch = useDispatch();
    const { videos, isVideoLoading } = useSelector(state => state.video);
    const { isSearched, searchQuery } = useSelector(state => state.condition);
    
    const observerCallback = () => {
        if (videos.nextPageToken && !isVideoLoading) {
            dispatch(getMoreVideo(videos.nextPageToken, isSearched, searchQuery));
        };
    };

    const [lastVideoRef, setObserver] = useScrollObserver(observerCallback);

    useEffect(() => {
        if (!isVideoLoading && !videos.items.length) dispatch(initVideo());
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