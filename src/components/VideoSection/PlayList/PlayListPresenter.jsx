import React, { forwardRef } from 'react';
import styles from './PlayList.module.scss'; 
import VideoBox from 'components/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import { nanoid } from 'nanoid';

const PlayListPresenter = forwardRef((props, ref) => {
    const {
        videos,
        isInSection,
        isLoading,
        getVideo,
        setObserver
    } = props;

    return (
        <div className={styles.wrapper}>
            <ul className={styles.video_wrapper}>
                {
                    videos.items.map((video, index) => {
                        const isLastVideo =  !isLoading && index === videos.items.length - 1;

                        return (
                            <VideoBox
                                ref={isLastVideo ? ref : null}
                                key={nanoid()}
                                isThumbnail={false}
                                video={video}
                                setObserver={setObserver}
                            />
                        );
                    })
                }
            </ul>
            {
                isLoading 
                ? <Spinner /> 
                : isInSection &&  (
                    <button className={styles.more_btn} onClick={() => getVideo()}>
                        <span>더보기</span>
                    </button>
                )
            }
        </div>
    );
});

export default PlayListPresenter;