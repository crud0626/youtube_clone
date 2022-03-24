import React, { memo, useRef, useState } from 'react';
import PlayList from '../playlist/playlist';
import Spinner from '../spinner/spinner';
import VideoSkeleton from '../video_skeleton/video_skeleton';
import styles from './playlist_container.module.css';
import { nanoid } from 'nanoid';

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

        if(props.videos.length > 23 && props.videoNextToken !== "") {
            observer.observe(lastVideoRef.current);
        }
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
                        return <VideoSkeleton key={nanoid()} />;
                    } else {
                        const renderProps = {
                                "key" : nanoid(),
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
                    !loading && props.videos.length > 23 && skeletonCount.map(() => <VideoSkeleton key={nanoid()} />)
                }
            </ul>
            {
                props.videoNextToken === "" &&
                <div className={styles.noMoreVideos}>
                    <p>결과가 더 이상 없습니다.</p>
                </div>
            }
            {loading && <Spinner />}
        </div>
    );
});

export default PlaylistContainer;