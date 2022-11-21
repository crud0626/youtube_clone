import React from 'react';
import styles from './ChannelThumbnail.module.scss';
import { handleThumbnailError } from 'utils/utils';
import { DEFAULT_THUMBNAIL } from 'assets';

const ChannelThumbnail = ({ thumbnailUrl, channelUrl, isLarge = false }) => {
    return (
        <a 
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            className={`${styles.thumbnail_wrapper} ${isLarge ? styles.large : ""}`}
            onClick={(e) => e.stopPropagation()}
        >
            <img 
                src={thumbnailUrl}
                className={styles.thumbnail}
                onError={({ currentTarget }) => 
                    handleThumbnailError(currentTarget, DEFAULT_THUMBNAIL)
                }
                draggable="false"
                loading="lazy"
                alt="channel thumbnail"
            />
        </a>
    );
};

export default ChannelThumbnail;