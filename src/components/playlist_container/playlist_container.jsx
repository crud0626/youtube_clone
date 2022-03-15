import React, { memo, useRef, useState } from 'react';
import PlayList from '../playlist/playlist';
import Spinner from '../spinner/spinner';
import styles from './playlist_container.module.css';

const PlaylistContainer = memo((props) => {
    const [loading, setLoading] = useState(false);
    const lastVideoRef = useRef();
    let observer = "";

    const setObserve = () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        };

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) catchObserver()
        }, options);

        observer.observe(lastVideoRef.current);
    }

    const catchObserver = () => {
        observer.disconnect();
        setLoading(true);
        props.getMoreVideos()
        .then(() => setLoading(false));
    }

    const videoLayout = props.selected ? styles.selectedVideo : styles.notSelectedVideo;

    return (
        <div>
            <ul className={`${styles.container} ${videoLayout}`}>
                {props.videos.map((video, index) => {
                    const renderProps = {
                            "key" : video.id,
                            "video" : video,
                            "clickedVideo" : props.clickedVideo,
                            "selected" : props.selected,
                            "convertCount" : props.convertCount,
                            "calcDiffDate" : props.calcDiffDate,
                            "convertVideoDuration" : props.convertVideoDuration
                    };

                    if (index === props.videos.length - 1) {
                        renderProps.lastVideoRef = lastVideoRef;
                        renderProps.setObserve = setObserve;
                    }

                    return <PlayList {...renderProps}/>;
                })}
            </ul>
            {loading && <Spinner />}
        </div>
    );
});

export default PlaylistContainer;