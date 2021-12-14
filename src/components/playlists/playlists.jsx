import React, { Component } from 'react';
import PlayList from '../playlist/playlist';
import styles from './playlists.module.css';

class PlayLists extends Component {
    render() {
        console.log(this.props.videos);
        /* 클래스명 변경예정. */
        const videoLayout= this.props.selected ? styles.selectedVideo : styles.noVideo;
        return (
            <ul className={`${styles.playlist_container} ${videoLayout}`}>
                {this.props.videos.map((video) => {
                    return (<PlayList 
                        key={video.id}
                        video={video}
                        clickedVideo={this.props.clickedVideo}
                        selected={this.props.selected}
                    />);
                })}
            </ul>
        );
    }
}

export default PlayLists;