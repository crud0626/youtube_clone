import React, { memo, useEffect } from 'react';
import styles from "./playlist.module.css";

const Playlist = memo((props) => {
    useEffect(() => {
        if (props.lastVideoRef) {
            props.setObserve()
        }
    });

    const sendVideoId = () => {
        props.clickedVideo(props.video);
    }

    const sendCounter = num => props.convertCount(num);

    const getDiffDate = () => {
        const now = Date.now();
        const publishDate = Date.parse(props.video.snippet.publishedAt);
        return props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    const sendDuration = () => {
        return props.convertVideoDuration(props.video.contentDetails.duration);
    }


    const videoLayout= props.selected ? styles.selectedVideo : styles.notSelectedVideo;
    const video = props.video;

    if (props.lastVideoRef) {
        return (
            <li ref={props.lastVideoRef} key={video.id} className={`${styles.playlist} ${videoLayout}`} onClick={sendVideoId}>
                <div className={styles.thumbnail_container}>
                    <img className={styles.thumbnail} src={video.snippet.thumbnails.medium.url} alt="video thumbnail" />
                    <div className={styles.video_duration}>
                        <span>{sendDuration()}</span>
                    </div>
                </div>
                <div className={styles.video_info_container}>
                    <h3 className={styles.title}>{video.snippet.title}</h3>
                    <div className={styles.video_info}>
                        <span className={styles.channelTitle}>{video.snippet.channelTitle}</span>
                        <div className={styles.info_counter}>
                            <span>{`조회수 ${sendCounter(video.statistics.viewCount)}회`}</span>
                            <span>{" • "}</span>
                            <span>{`${getDiffDate()} 전`}</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    };

    return (
        <li key={video.id} className={`${styles.playlist} ${videoLayout}`} onClick={sendVideoId}>
            <div className={styles.thumbnail_container}>
                <img className={styles.thumbnail} src={video.snippet.thumbnails.medium.url} alt="video thumbnail" />
                <div className={styles.video_duration}>
                    <span>{sendDuration()}</span>
                </div>
            </div>
            <div className={styles.video_info_container}>
                <h3 className={styles.title}>{video.snippet.title}</h3>
                <div className={styles.video_info}>
                    <span className={styles.channelTitle}>{video.snippet.channelTitle}</span>
                    <div className={styles.info_counter}>
                        <span>{`조회수 ${sendCounter(video.statistics.viewCount)}회`}</span>
                        <span>{" • "}</span>
                        <span>{`${getDiffDate()} 전`}</span>
                    </div>
                </div>
            </div>
        </li>
    );
});

export default Playlist;

