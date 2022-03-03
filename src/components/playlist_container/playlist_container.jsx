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
        }

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                catchObserver();
            }
        },options)
        observer.observe(lastVideoRef.current);
    }

    const catchObserver = () => {
        setLoading(true);

        props.getMoreVideos()
        .then(() => setLoading(false));
        observer.disconnect();
    }

    const videoLayout = props.selected ? styles.selectedVideo : styles.notSelectedVideo;
    return (
        <>
            <ul className={`${styles.playlist_container} ${videoLayout}`}>
                {props.videos.map((video, index) => {
                    if (index === props.videos.length - 1) {
                        return (
                            <PlayList 
                                key={video.id}
                                video={video}
                                clickedVideo={props.clickedVideo}
                                selected={props.selected}
                                convertCount={props.convertCount}
                                calcDiffDate={props.calcDiffDate}
                                convertVideoDuration={props.convertVideoDuration}
                                lastVideoRef={lastVideoRef}
                                setObserve={setObserve}
                            />
                        );
                    }
                    return (
                        <PlayList 
                            key={video.id}
                            video={video}
                            clickedVideo={props.clickedVideo}
                            selected={props.selected}
                            convertCount={props.convertCount}
                            calcDiffDate={props.calcDiffDate}
                            convertVideoDuration={props.convertVideoDuration}
                        />
                    );
                })}
                {loading && <Spinner />}
            </ul>
        </>
    );
});

export default PlaylistContainer;