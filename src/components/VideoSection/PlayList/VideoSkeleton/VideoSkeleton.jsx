import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './VideoSkeleton.module.scss';

const VideoSkeleton = ({index}) => {
    return(
        <li key={index} className={styles.container}>
            <div className={styles.video_thumbnail_container}>
                <Skeleton className={styles.video_thumbnail} height={180} />
            </div>
            <div className={styles.info_container}>
                <Skeleton className={styles.channel_thumbnail} circle={true} width={36} height={36} />
                <div className={styles.info}>
                    <Skeleton height={30} />
                    <Skeleton width={200} height={25} />
                </div>
            </div>
        </li>
    );
};

export default VideoSkeleton;