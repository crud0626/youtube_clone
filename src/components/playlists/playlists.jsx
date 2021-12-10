import React, { Component } from 'react';
import PlayList from '../playlist/playlist';
import styles from './playlists.module.css';

class PlayLists extends Component {
    render() {
        return (
            <ul className={styles.playlist_container}>
                {this.props.videos.map((video) => (
                    <PlayList 
                        key={video.id}
                        video={video}
                        clickedVideo={this.props.clickedVideo}
                    />
                ))}
            </ul>
        );
    }
}

export default PlayLists;