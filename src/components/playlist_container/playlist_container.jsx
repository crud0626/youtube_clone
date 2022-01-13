import React, { createRef, PureComponent } from 'react';
import PlayList from '../playlist/playlist';
import styles from './playlist_container.module.css';

class PlaylistContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.lastRef = createRef();
        this.observer = "";
    }

    setObserve = () => {
        console.log(this.lastRef.current);
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        }

        this.observer = new IntersectionObserver(this.testObserver, options);
        this.observer.observe(this.lastRef.current);
    }

    testObserver = () => {
        console.log("observe!");
        this.props.getMoreVideos();
        this.observer.disconnect();
        debugger;
    }

    render() {
        const videoLayout = this.props.selected ? styles.selectedVideo : styles.notSelectedVideo;

        return (
            <ul className={`${styles.playlist_container} ${videoLayout}`}>
                {this.props.videos.map((video, index) => {
                    if (index === this.props.videos.length - 1) {
                        return (
                            <PlayList 
                                key={video.id}
                                video={video}
                                clickedVideo={this.props.clickedVideo}
                                selected={this.props.selected}
                                convertCount={this.props.convertCount}
                                calcDiffDate={this.props.calcDiffDate}
                                convertVideoDuration={this.props.convertVideoDuration}
                                lastRef={this.lastRef}
                                setObserve={this.setObserve}
                            />
                        );
                    }
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