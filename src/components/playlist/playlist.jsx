import React, { Component } from 'react';
import styles from "./playlist.module.css"

class PlayList extends Component {
    sendVideoId = () => {
        this.props.clickedVideo(this.props.video);
    }

    render() {
        /* 클래스명 변경예정. */
        const videoLayout= this.props.selected ? styles.selectedVideo : styles.noVideo;
        return (
            <li key={this.props.video.id} className={`${styles.playlist} ${videoLayout}`} onClick={this.sendVideoId}>
                <img className={styles.thumbnail} src={this.props.video.snippet.thumbnails.medium.url} alt="videoThumbnail" />
                <div className={styles.video_info}>
                    <h3 className={styles.title}>{this.props.video.snippet.title}</h3>
                    <span className={styles.desc}>{this.props.video.snippet.channelTitle}</span>
                </div>
            </li>
        );
    }
}

export default PlayList;