import React, { PureComponent } from 'react';
import styles from "./playlist.module.css";

class PlayList extends PureComponent {
    sendVideoId = () => {
        this.props.clickedVideo(this.props.video);
    }

    sendCounter = (num) => (
        this.props.convertCount(num)
    )

    getDiffDate = () => {
        const now = Date.now();
        const publishDate = Date.parse(this.props.video.snippet.publishedAt);
        return this.props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    sendDuration = () => {
        return this.props.convertVideoDuration(this.props.video.contentDetails.duration);
    }

    render() {
        const videoLayout= this.props.selected ? styles.selectedVideo : styles.notSelectedVideo;
        const video = this.props.video;
        return (
            <li key={video.id} className={`${styles.playlist} ${videoLayout}`} onClick={this.sendVideoId}>
                <div className={styles.thumbnail_container}>
                    <img className={styles.thumbnail} src={video.snippet.thumbnails.medium.url} alt="video thumbnail" />
                    <div className={styles.video_duration}>
                        <span>{this.sendDuration()}</span>
                    </div>
                </div>
                <div className={styles.video_info_container}>
                    <h3 className={styles.title}>{video.snippet.title}</h3>
                    <div className={styles.video_info}>
                        <span className={styles.channelTitle}>{video.snippet.channelTitle}</span>
                        <div className={styles.info_counter}>
                            <span>{`조회수 ${this.sendCounter(video.statistics.viewCount)}회`}</span>
                            <span>{" • "}</span>
                            <span>{`${this.getDiffDate()} 전`}</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default PlayList;