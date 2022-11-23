import React, { forwardRef } from 'react';
import styles from './GridVideoList.module.scss';
import VideoBoxContainer from 'components/VideoBox/VideoBoxContainer';
import Spinner from 'components/Spinner/Spinner';
import VideoSkeleton from 'components/VideoBox/VideoSkeleton/VideoSkeleton';
import { nanoid } from 'nanoid';

const skeletonCount = new Array(8).fill({undefined});

const GridVideoListPresenter = forwardRef((props, ref) => {
    const { videos, isVideoLoading, isSearched, setObserver } = props;

    return (
        <section>
            {
                videos.items &&
                <>
                    <ul className={styles.wrapper}>
                    {
                        videos.items.map((video, index) => {
                            const isLastVideo = video && index === videos.items.length - 1;
                            return (
                                <VideoBoxContainer 
                                    key={nanoid()}
                                    ref={isLastVideo ? ref : null}
                                    video={video}
                                    setObserver={isLastVideo ? setObserver : null}
                                />
                            );
                        })
                    }
                    { 
                        // 비디오 추가 로드시 필요한 스켈레톤 UI
                        isVideoLoading && 
                        skeletonCount.map(() => <VideoSkeleton key={nanoid()} />)
                    }
                    </ul>
                    { 
                        // Result page에서는 스켈레톤 UI 없이 Spinner만 필요 
                        // 추후 Result 컴포넌트 생성 예정 
                        isSearched && isVideoLoading && <Spinner />
                    }
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

export default GridVideoListPresenter;

