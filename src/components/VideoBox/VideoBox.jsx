import React, { forwardRef, useEffect } from 'react';
import styles from 'styles/videoBox/videoBox.module.scss';
import { handleThumbnailError } from 'utils/utils';
import defaultThubmnail from 'assets/default_thubmnail.gif';

const VideoBox = forwardRef(({ video, onClickVideo, calculator, setObserver, isThumbnail = true }, ref) => {
    useEffect(() => {
        if (ref) setObserver();
    }, []);

    const { channel, contentDetails, snippet, statistics } = video;

    return (
        <li ref={ref || null} className={styles.container} onClick={() => onClickVideo(video)}>
            <div className={styles.video_thumbnail_container}>
                <img 
                    className={styles.video_thumbnail} 
                    src={snippet.thumbnails.medium.url} 
                    draggable="false" 
                    alt="video thumbnail" 
                />
                <div className={styles.duration}>
                    <span>{calculator.convertVideoDuration(contentDetails.duration)}</span>
                </div>
            </div>
            <div className={styles.info_container}>
                {
                    isThumbnail &&
                    <a className={styles.channel_thumbnail}>
                        <img 
                            src={channel?.snippet.thumbnails.default.url || "#"} 
                            onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                            draggable="false"
                            alt="channelImage" 
                        />
                    </a>
                }
                <div className={styles.info_content}>
                    <h3 className={styles.title}>{snippet.title}</h3>
                    <div className={styles.info}>
                        <span className={styles.channelTitle}>{snippet.channelTitle}</span>
                        <div className={styles.sub_info}>
                            <span>{`조회수 ${calculator.convertCount(statistics.viewCount)}회`}</span>
                            <span>{calculator.getTimeDiff(video.snippet.publishedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
});

export default VideoBox;

