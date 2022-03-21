import React, { memo, useRef, useState } from 'react';
import PlayList from '../playlist/playlist';
import Spinner from '../spinner/spinner';
import VideoSkeleton from '../video_skeleton/video_skeleton';
import styles from './playlist_container.module.css';

const PlaylistContainer = memo((props) => {
    const [loading, setLoading] = useState(false);
    const lastVideoRef = useRef();
    const skeletonCount = new Array(8).fill({undefined});
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
                    if (props.videoLoading && video.undefined === undefined) {
                        return <VideoSkeleton key={index} />;
                    } else {
                        const componentKey = video.id + index;
                        const renderProps = {
                                "key" : componentKey,
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
                    }})
                }
                {
                    !loading && skeletonCount.map((item, index) => <VideoSkeleton key={index} />)
                }
            </ul>
            {loading && <Spinner />}
        </div>
    );
});

export default PlaylistContainer;