import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/videoSection/playList/playList.module.scss'; 
import useScrollObserver from 'hooks/useScrollObserver';
import VideoBox from 'components/VideoBox/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import { ADD_VIDEO_LIST, CHANGE_VIDEO_LOADING } from 'store/slice/videoSlice';
import { nanoid } from 'nanoid';
import youtubeAPI from 'service/youtube-api';

const PlayList = ({ isInSection }) => {
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
        <div className={styles.container}>
            <ul className={styles.video_container}>
                {videos.items.map((item, index) => {
                    const renderProps = {
                            "key": nanoid(),
                            "isThumbnail": false,
                            "video": item
                    };

                    if (!isLoading && index === videos.items.length-1) {
                        renderProps.ref = lastVideoRef;
                        renderProps.setObserver = setObserver;
                    }

                    return <VideoBox { ...renderProps } />;
                    
                })}
            </ul>
            { 
                isInSection && !isLoading &&
                <button className={styles.more_btn} onClick={getVideo}>
                    <span>더보기</span>
                </button>
            }
            {isLoading && <Spinner />}
        </div>
    );
};

export default PlayList;