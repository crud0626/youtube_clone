import React, { Component } from 'react';
import styles from "./playlist.module.css";

class PlayList extends Component {
    sendVideoId = () => {
        this.props.clickedVideo(this.props.video);
    }

    sendCounter = (num) => (
        this.props.convertCount(num)
    )

    getPublishDate = () => {
        const now = Date.now();
        const publishDate = Date.parse(this.props.video.snippet.publishedAt);
        return this.props.getDiffDate(parseInt((now - publishDate) / 60000));
    }

    render() {
        /* 클래스명 변경예정. */
        const videoLayout= this.props.selected ? styles.selectedVideo : styles.noVideo;
        const video = this.props.video;
        return (
            <li key={video.id} className={`${styles.playlist} ${videoLayout}`} onClick={this.sendVideoId}>
                <img className={styles.thumbnail} src={video.snippet.thumbnails.medium.url} alt="videoThumbnail" />
                <div className={styles.video_info_container}>
                    <h3 className={styles.title}>{video.snippet.title}</h3>
                    <div className={styles.video_info}>
                        <span className={styles.channelTitle}>{video.snippet.channelTitle}</span>
                        <div className={styles.info_counter}>
                            <span>{`조회수 ${this.sendCounter(video.statistics.viewCount)}회`}</span>
                            <span>{" • "}</span>
                            <span>{`${this.getPublishDate()} 전`}</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default PlayList;