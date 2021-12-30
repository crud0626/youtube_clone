import React, { PureComponent } from 'react';
import PlayList from '../playlist/playlist';
import styles from './playlist_container.module.css';

class PlaylistContainer extends PureComponent {
    render() {
        const videoLayout = this.props.selected ? styles.selectedVideo : styles.notSelectedVideo;
        return (
            <ul className={`${styles.playlist_container} ${videoLayout}`}>
                {this.props.videos.map((video) => {
                    return (
                        <PlayList 
                            key={video.id}
                            video={video}
                            clickedVideo={this.props.clickedVideo}
                            selected={this.props.selected}
                            convertCount={this.props.convertCount}
                            calcDiffDate={this.props.calcDiffDate}
                            convertVideoDuration={this.props.convertVideoDuration}
                        />
                    );
                })}
            </ul>
        );
    }
}

export default PlaylistContainer;