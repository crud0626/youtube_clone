import React, { useState } from 'react';
import styles from 'styles/playlist.module.scss';
import VideoBox from 'components/VideoBox/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import VideoSkeleton from 'components/VideoSkeleton/VideoSkeleton';
import useObserver from 'hooks/useObserver';
import { nanoid } from 'nanoid';

const Playlist = ({ videos, onClickVideo, calculator, getMoreVideo, isVideoLoading }) => {
    const [isLoading, setIsLoading] = useState(false);
    const skeletonCount = new Array(8).fill({undefined});
    
    const observerCallback = async () => {
        setIsLoading(true);
        await getMoreVideo()
        .then(() => setIsLoading(false));
    };
    const [lastVideoRef, setObserver] = useObserver(observerCallback);

    return (
        <div>
            <ul className={styles.container}>
                {videos.items.map((item, index) => {
                    if (isVideoLoading && !item) {
                        return <VideoSkeleton key={nanoid()} />;
                    } else {
                        const renderProps = {
                                "key": nanoid(),
                                "video": item,
                                onClickVideo, 
                                calculator
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
                <div className={styles.noMoreVideos}>
                    <p>결과가 더 이상 없습니다.</p>
                </div>
            }
            {isLoading && <Spinner />}
        </div>
    );
};

export default Playlist;
