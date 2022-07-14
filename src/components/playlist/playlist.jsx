import React, { useState } from 'react';
import styles from '../../styles/playlist.module.scss';
import VideoBox from '../VideoBox/VideoBox';
import Spinner from '../Spinner/Spinner';
import VideoSkeleton from '../Video_skeleton/Video_skeleton';
import useObserver from 'hooks/useObserver';
import { nanoid } from 'nanoid';

const Playlist = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const skeletonCount = new Array(8).fill({undefined});
    
    const observerCallback = async () => {
        setIsLoading(true);
        await props.getMoreVideo()
        .then(() => setIsLoading(false));
    }
    const [lastVideoRef, setObserver] = useObserver(observerCallback);

    return (
        <div>
            <ul className={`${styles.container} ${styles.notSelectedVideo}`}>
                {props.videos.items.map((item, index) => {
                    if (props.isVideoLoading && !item) {
                        return <VideoSkeleton key={nanoid()} />;
                    } else {
                        const renderProps = {
                                "key": nanoid(),
                                "video": item,
                                "onClickVideo": props.onClickVideo,
                                "calculator": props.calculator
                        };
    
                        if (!isLoading && index === props.videos.items.length-1) {
                            renderProps.ref = lastVideoRef;
                            renderProps.setObserver = setObserver;
                        }
    
                        return <VideoBox { ...renderProps } />;
                    }})
                }
                { props.isVideoLoading && skeletonCount.map(() => <VideoSkeleton key={nanoid()} />) }
            </ul>
            {
                !props.videos.nextPageToken &&
                <div className={styles.noMoreVideos}>
                    <p>결과가 더 이상 없습니다.</p>
                </div>
            }
            {isLoading && <Spinner />}
        </div>
    );
};

export default Playlist;

