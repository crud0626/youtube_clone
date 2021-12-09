import React, { Component } from 'react';
import styles from './playlist.module.css';

class PlayList extends Component {
    render() {
        console.log(this.props.videos);
        return (
            <ul className={styles.playlist_container}>
                {this.props.videos.map((video) => (
                    <li key={video.id} className={styles.playlist}>
                        <img className={styles.thumbnail} src={video.snippet.thumbnails.medium.url} alt="videoImage" />
                        <div className={styles.video_info}>
                            <h3 className={styles.title}>{video.snippet.title}</h3>
                            <span className={styles.desc}>{video.snippet.channelTitle}</span>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

export default PlayList;