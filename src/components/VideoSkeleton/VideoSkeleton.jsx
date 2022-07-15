import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from 'styles/video_skeleton.module.scss';

const VideoSkeleton = ({index}) => {
    return(
        <li key={index} className={styles.item}>
            <div className={styles.thumbnail}>
                <Skeleton className={styles.video_thumbnail} width={"100%"} height={180} />
            </div>
            <div className={styles.info_container}>
                <Skeleton className={styles.thumbnail} circle={true} width={36} height={36} />
                <div className={styles.info}>
                    <Skeleton width={"100%"} height={30} />
                    <Skeleton width={200} height={25} />
                </div>
            </div>
        </li>
    );
};

export default VideoSkeleton;