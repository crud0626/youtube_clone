import React from 'react';
import styles from 'styles/videoBox/videoThumbnail.module.scss';
import { convertVideoDuration } from 'utils/calculator';

const VideoThumbnail = ({ thumbnailUrl, duration }) => {
    return (
        <div className={styles.container}>
            <img 
                src={thumbnailUrl}
                className={styles.thumbnail}
                loading="lazy"
                draggable="false"
                alt="video thumbnail"
            />
            <div className={styles.duration}>
                <span>{convertVideoDuration(duration)}</span>
            </div>
        </div>

    );
};

export default VideoThumbnail;