import React, { Component } from 'react';
import styles from "./playlist.module.css";

import Calculator from '../../service/calculator';
const calc = new Calculator();

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
                <div className={styles.video_info_container}>
                    <h3 className={styles.title}>{this.props.video.snippet.title}</h3>
                    <div className={styles.video_info}>
                        <span className={styles.channelTitle}>{this.props.video.snippet.channelTitle}</span>
                        <div className={styles.info_counter}>
                            <span>{`조회수 ${calc.getViewCount(this.props.video.statistics.viewCount)} `}</span>
                            <span>•</span>
                            <span>{` 3일 전`}</span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default PlayList;