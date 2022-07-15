import React, { forwardRef, useEffect } from 'react';
import styles from 'styles/videobox.module.scss';

const VideoBox = forwardRef(({ video, onClickVideo, calculator, setObserver }, ref) => {
    useEffect(() => {
        if (ref) setObserver();
    }, []);

    const getDiffDate = () => {
        const now = Date.now();
        const publishDate = Date.parse(video.snippet.publishedAt);
        return calculator.getDiffTime(parseInt((now - publishDate) / 60000));
    }

    const { contentDetails, snippet, statistics } = video;

    return (
        <li ref={ref || null} className={`${styles.container} ${styles.notSelectedVideo}`} onClick={() => onClickVideo(video)}>
            <div className={styles.thumbnail_container}>
                <img className={styles.thumbnail} src={snippet.thumbnails.medium.url} draggable="false" alt="video thumbnail" />
                <div className={styles.duration}>
                    <span>{calculator.convertVideoDuration(contentDetails.duration)}</span>
                </div>
            </div>
            <div className={styles.info_container}>
                <h3 className={styles.title}>{snippet.title}</h3>
                <div className={styles.info}>
                    <span className={styles.channelTitle}>{snippet.channelTitle}</span>
                    <div className={styles.sub_info}>
                        <span>{`조회수 ${calculator.convertCount(statistics.viewCount)}회 • ${getDiffDate()} 전`}</span>
                    </div>
                </div>
            </div>
        </li>
    );
});

export default VideoBox;

