import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayList from './PlayListPresenter';
import useScrollObserver from 'hooks/useScrollObserver';
import { getMoreVideo } from 'store/actions/getMoreVideo';

const PlayListContainer = ({ isInSection }) => {
    const dispatch = useDispatch();
    const { videos } = useSelector(state => state.video);
    const { searchQuery } = useSelector(state => state.condition);
    const [isLoading, setIsLoading] = useState(false);

    const getVideo = () => {
        setIsLoading(true);

        dispatch(getMoreVideo(videos.nextPageToken, searchQuery))
        .finally(() => setIsLoading(false));
    }

    const observerCallback = () => {
        if (!isInSection) getVideo();
    };

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