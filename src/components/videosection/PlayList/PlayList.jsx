import React, { useState } from 'react';
import styles from 'styles/videoSection/playList/playList.module.scss'; 
import VideoBox from 'components/VideoBox/VideoBox';
import Spinner from 'components/Spinner/Spinner';
import useScrollObserver from 'hooks/useScrollObserver';
import { nanoid } from 'nanoid';

const PlayList = ({ videos, onClickVideo, calculator, getMoreVideo, isInSection }) => {
    const [isLoading, setIsLoading] = useState(false);

    const getVideo = async () => {
        setIsLoading(true);
        await getMoreVideo()
        .then(() => setIsLoading(false));
    }

    const observerCallback = () => {
        if (window.innerWidth > 1016) {
            getVideo();
        }
    };
    const [lastVideoRef, setObserver] = useScrollObserver(observerCallback);

    return (
        <div className={styles.container}>
            <ul className={styles.video_container}>
                {videos.items.map((item, index) => {
                    const renderProps = {
                            "key": nanoid(),
                            "isThumbnail": false,
                            "video": item,
                            onClickVideo, 
                            calculator
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