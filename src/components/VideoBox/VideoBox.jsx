import React, { forwardRef, useEffect } from 'react';
import styles from "../../styles/videobox.module.scss";

const VideoBox = forwardRef((props, ref) => {
    useEffect(() => {
        if (ref) props.setObserve();
    }, []);

    const {contentDetails, id, snippet, statistics} = props.video;

    const sendVideoId = () => props.clickedVideo(props.video);
    
    const sendCounter = num => props.convertCount(num);

    const sendDuration = () => props.convertVideoDuration(contentDetails.duration);

    const getDiffDate = () => {
        const now = Date.now();
        const publishDate = Date.parse(snippet.publishedAt);
        return props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    return (
        <li ref={ref ? ref : null} className={`${styles.container} ${styles.notSelectedVideo}`} onClick={sendVideoId}>
            <div className={styles.thumbnail_container}>
                <img className={styles.thumbnail} src={snippet.thumbnails.medium.url} alt="video thumbnail" />
                <div className={styles.duration}>
                    <span>{sendDuration()}</span>
                </div>
            </div>
            <div className={styles.info_container}>
                <h3 className={styles.title}>{snippet.title}</h3>
                <div className={styles.info}>
                    <span className={styles.channelTitle}>{snippet.channelTitle}</span>
                    <div className={styles.sub_info}>
                        <span>{`조회수 ${sendCounter(statistics.viewCount)}회 • ${getDiffDate()} 전`}</span>
                    </div>
                </div>
            </div>
        </li>
    );
});

export default VideoBox;

