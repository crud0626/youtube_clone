import React, { forwardRef } from 'react';
import styles from 'styles/gridVideoList/gridVideoList.module.scss';
import VideoBox from 'components/VideoBox/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import VideoSkeleton from 'components/VideoSection/PlayList/VideoSkeleton/VideoSkeleton';
import { nanoid } from 'nanoid';

const skeletonCount = new Array(8).fill({undefined});

const GridVideoList = forwardRef((props, ref) => {
    const {
        videos,
        isVideoLoading,
        isLoading,
        setObserver
    } = props;

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
                            renderProps.ref = ref;
                            renderProps.setObserver = setObserver;
                        }
    
                        return <VideoBox { ...renderProps } />;
                    }})
                }
                {/*  */}
                { isVideoLoading && skeletonCount.map(() => <VideoSkeleton key={nanoid()} />) }
            </ul>
            {
                !videos.nextPageToken &&
                <div className={styles.no_more_videos}>
                    <p>결과가 더 이상 없습니다.</p>
                </div>
            }
            {/*  */}
            {isLoading && <Spinner />}
        </section>
    );
});

export default GridVideoList;

