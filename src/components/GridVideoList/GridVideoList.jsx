import React, { forwardRef } from 'react';
import styles from 'styles/gridVideoList/gridVideoList.module.scss';
import VideoBox from 'components/VideoBox/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import VideoSkeleton from 'components/VideoSection/PlayList/VideoSkeleton/VideoSkeleton';
import { nanoid } from 'nanoid';

const skeletonCount = new Array(8).fill({undefined});

const GridVideoList = forwardRef((props, ref) => {
    const { videos, isVideoLoading, isSearched, setObserver } = props;

    return (
        <section>
            {
                videos.items &&
                <>
                    <ul className={styles.videobox_container}>
                    {
                        videos.items.map((video, index) => {
                            if (video === "") {
                                return <VideoSkeleton key={nanoid()} />;
                            } else {
                                const lastVideoCondition = !isVideoLoading && index === videos.items.length-1;

                                return (
                                    <VideoBox 
                                        key={nanoid()}
                                        ref={lastVideoCondition ? ref : null}
                                        video={video}
                                        setObserver={lastVideoCondition ? setObserver : null}
                                    />
                                );
                            }
                        })
                    }
                    { 
                        isVideoLoading && 
                        skeletonCount.map(() => <VideoSkeleton key={nanoid()} />)
                    }
                    </ul>
                    {/* Result page에서는 스켈레톤 UI 없이 Spinner만 필요 */}
                    { isSearched && <Spinner />}
                    {
                        !videos.nextPageToken &&
                        <div className={styles.no_more_videos}>
                            <p>결과가 더 이상 없습니다.</p>
                        </div>
                    }
                </>
            }
        </section>
    );
});

export default GridVideoList;

