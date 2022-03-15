import React, { memo, useEffect } from 'react';
import styles from "./playlist.module.css";

const Playlist = memo((props) => {
    useEffect(() => {
        if (props.lastVideoRef) props.setObserve();
    }, []);

    const sendVideoId = () => props.clickedVideo(props.video);

    const sendCounter = num => props.convertCount(num);

    const sendDuration = () => props.convertVideoDuration(props.video.contentDetails.duration);

    const getDiffDate = () => {
        const now = Date.now();
        const publishDate = Date.parse(props.video.snippet.publishedAt);
        return props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    const videoLayout= props.selected ? styles.selectedVideo : styles.notSelectedVideo;

    return (
        <li ref={props.lastVideoRef ? props.lastVideoRef : null} key={props.video.id} className={`${styles.playlist} ${videoLayout}`} onClick={sendVideoId}>
            <div className={styles.thumbnail_container}>
                <img className={styles.thumbnail} src={props.video.snippet.thumbnails.medium.url} alt="video thumbnail" />
                <div className={styles.video_duration}>
                    <span>{sendDuration()}</span>
                </div>
            </div>
            <div className={styles.video_info_container}>
                <h3 className={styles.title}>{props.video.snippet.title}</h3>
                <div className={styles.video_info}>
                    <span className={styles.channelTitle}>{props.video.snippet.channelTitle}</span>
                    <div className={styles.info_counter}>
                        <span>{`조회수 ${sendCounter(props.video.statistics.viewCount)}회`}</span>
                        <span>{" • "}</span>
                        <span>{`${getDiffDate()} 전`}</span>
                    </div>
                </div>
            </div>
        </li>
    );
});

export default Playlist;

