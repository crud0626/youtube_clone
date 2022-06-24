import React, { memo, useEffect } from 'react';
import styles from "./playlist.module.scss";

const Playlist = memo((props) => {
    useEffect(() => {
        if (props.lastVideoRef) props.setObserve();
    }, []);

    const sendVideoId = () => {props.clickedVideo(props.video)};
    
    const sendCounter = num => props.convertCount(num);

    const sendDuration = () => props.convertVideoDuration(props.video.contentDetails.duration);

    const getDiffDate = () => {
        const now = Date.now();
        const publishDate = Date.parse(props.video.snippet.publishedAt);
        return props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    const videoLayout= props.selected ? styles.selectedVideo : styles.notSelectedVideo;

    // console.log(props.selected);

    return (
        <li ref={props.lastVideoRef ? props.lastVideoRef : null} className={`${styles.container} ${videoLayout}`} onClick={sendVideoId}>
            <div className={styles.thumbnail_container}>
                <img className={styles.thumbnail} src={props.video.snippet.thumbnails.medium.url} alt="video thumbnail" />
                <div className={styles.duration}>
                    <span>{sendDuration()}</span>
                </div>
            </div>
            <div className={styles.info_container}>
                <h3 className={styles.title}>{props.video.snippet.title}</h3>
                <div className={styles.info}>
                    <span className={styles.channelTitle}>{props.video.snippet.channelTitle}</span>
                    <div className={styles.sub_info}>
                        <span>{`조회수 ${sendCounter(props.video.statistics.viewCount)}회 • ${getDiffDate()} 전`}</span>
                    </div>
                </div>
            </div>
        </li>
    );
});

export default Playlist;

