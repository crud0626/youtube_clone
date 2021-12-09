import React, { Component } from 'react';
import styles from './playlist.module.css';

class PlayList extends Component {
    render() {
        console.log(this.props.videos);
        return (
            <ul className={styles.playlist_container}>
                {this.props.videos.map((video) => (
                    <li key={video.id} className={styles.playlist}>
                        <img src={video.snippet.thumbnails.medium.url} alt="videoImage" />
                        <h2>{video.snippet.title}</h2>
                        <span>{video.snippet.channelTitle}</span>
                    </li>
                ))}
            </ul>
        );
    }
}

export default PlayList;