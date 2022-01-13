import React, { createRef, PureComponent } from 'react';
import PlayList from '../playlist/playlist';
import styles from './playlist_container.module.css';

class PlaylistContainer extends PureComponent {
    render() {
        const videoLayout = this.props.selected ? styles.selectedVideo : styles.notSelectedVideo;

        const lastVideo = this.props.videos[this.props.videos.length - 1];
        
        return (
            <ul className={`${styles.playlist_container} ${videoLayout}`}>
                {this.props.videos.map((video) => {
                    const lastChecking = lastVideo === video ? true : false;
                    return (
                        <PlayList 
                            key={video.id}
                            video={video}
                            clickedVideo={this.props.clickedVideo}
                            selected={this.props.selected}
                            convertCount={this.props.convertCount}
                            calcDiffDate={this.props.calcDiffDate}
                            convertVideoDuration={this.props.convertVideoDuration}
                            lastChecking={lastChecking}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default PlaylistContainer;