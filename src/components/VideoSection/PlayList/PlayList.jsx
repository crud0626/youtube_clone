import React, { forwardRef } from 'react';
import styles from 'styles/videoSection/playList/playList.module.scss'; 
import VideoBoxContainer from 'components/VideoBox/VideoBoxContainer';
import Spinner from 'components/Spinner/Spinner';
import { nanoid } from 'nanoid';

const PlayList = forwardRef((props, ref) => {
    const {
        videos,
        isInSection,
        isLoading,
        getVideo,
        setObserver
    } = props;

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
                        renderProps.ref = ref;
                        renderProps.setObserver = setObserver;
                    }

                    return <VideoBoxContainer { ...renderProps } />;
                    
                })}
            </ul>
            { 
                isInSection && !isLoading &&
                <button className={styles.more_btn} onClick={() => getVideo()}>
                    <span>더보기</span>
                </button>
            }
            { isLoading && <Spinner /> }
        </div>
    );
});

export default PlayList;