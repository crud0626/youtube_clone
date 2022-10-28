import React from 'react';
import styles from 'styles/videoBox/videoThumbnail.module.scss';

const VideoThumbnail = ({ thumbnailUrl, calculator, duration }) => {
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
                <span>{calculator.convertVideoDuration(duration)}</span>
            </div>
        </div>

    );
};

export default VideoThumbnail;