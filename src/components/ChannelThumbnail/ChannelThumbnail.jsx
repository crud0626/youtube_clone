import React from 'react';
import styles from 'styles/channelThumbnail/channelThumbnail.module.scss';
import { handleThumbnailError } from 'utils/utils';
import defaultThubmnail from 'assets/default_thubmnail.gif';

const ChannelThumbnail = ({ thumbnailUrl, channelUrl = "#" }) => {
    return (
        <a 
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.thumbnail_wrapper}
        >
            <img 
                src={thumbnailUrl}
                className={styles.thumbnail}
                onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                draggable="false"
                loading="lazy"
                alt="channel thumbnail"
            />
        </a>
    );
};

export default ChannelThumbnail;