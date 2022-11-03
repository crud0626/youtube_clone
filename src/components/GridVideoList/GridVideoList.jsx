import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'styles/gridVideoList/gridVideoList.module.scss';
import useScrollObserver from 'hooks/useScrollObserver';
import VideoBox from 'components/VideoBox/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import VideoSkeleton from 'components/VideoSection/PlayList/VideoSkeleton/VideoSkeleton';
import { nanoid } from 'nanoid';
import { ADD_VIDEO_LIST, CHANGE_VIDEO_LOADING, RESET_SELECTED_VIDEO, RESET_VIDEO_LIST } from 'store/slice/videoSlice';
import youtubeAPI from 'service/youtube-api';

const GridVideoList = () => {
    const { videos, isVideoLoading } = useSelector(state => state.video);
    const { isSearched, searchQuery } = useSelector(state => state.condition);
    const dispatch = useDispatch();

    // 이름 변경예정, isVideoLoading이 사용중이라서
    const [isLoading, setIsLoading] = useState(false);
    const skeletonCount = new Array(8).fill({undefined});

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
        dispatch(CHANGE_VIDEO_LOADING());
        const dummyVideos = { items: new Array(24).fill(""), nextPageToken: null};
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
        <section>
            <ul className={styles.videobox_container}>
                {videos.items && videos.items.map((item, index) => {
                    if (item === "") {
                        return <VideoSkeleton key={nanoid()} />;
                    } else {
                        const renderProps = {
                            "key": nanoid(),
                            "video": item
                        };
    
                        if (!isLoading && index === videos.items.length-1) {
                            renderProps.ref = lastVideoRef;
                            renderProps.setObserver = setObserver;
                        }
    
                        return <VideoBox { ...renderProps } />;
                    }})
                }
                { isVideoLoading && skeletonCount.map(() => <VideoSkeleton key={nanoid()} />) }
            </ul>
            {
                !videos.nextPageToken &&
                <div className={styles.no_more_videos}>
                    <p>결과가 더 이상 없습니다.</p>
                </div>
            }
            {isLoading && <Spinner />}
        </section>
    );
};

export default GridVideoList;

