import React, { useState } from 'react';
import styles from 'styles/gridVideoList/gridVideoList.module.scss';
import VideoBox from 'components/VideoBox/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import VideoSkeleton from 'components/VideoSection/PlayList/VideoSkeleton/VideoSkeleton';
import useScrollObserver from 'hooks/useScrollObserver';
import { nanoid } from 'nanoid';

const GridVideoList = ({ videos, onClickVideo, calculator, getMoreVideo, isVideoLoading }) => {
    const [isLoading, setIsLoading] = useState(false);
    const skeletonCount = new Array(8).fill({undefined});
    
    const observerCallback = async () => {
        if (videos.nextPageToken) {
            setIsLoading(true);
            await getMoreVideo()
            .then(() => setIsLoading(false));
        }
    };
    const [lastVideoRef, setObserver] = useScrollObserver(observerCallback);

    return (
        <section>
            <ul className={styles.videobox_container}>
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
                <div className={styles.no_more_videos}>
                    <p>결과가 더 이상 없습니다.</p>
                </div>
            }
            {isLoading && <Spinner />}
        </section>
    );
};

export default GridVideoList;

