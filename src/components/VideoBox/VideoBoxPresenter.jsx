import React, { forwardRef } from 'react';
import styles from './VideoBox.module.scss';
import ChannelThumbnail from 'components/ChannelThumbnail/ChannelThumbnail';
import VideoThumbnail from './VideoThumbnail/VideoThumbnail';
import VideoSkeleton from './VideoSkeleton/VideoSkeleton';
import { convertCount, getTimeDiff } from 'utils/calculator';

const VideoBoxPresenter = forwardRef(({ video, isThumbnail, onClickVideo }, ref) => {
    const { channel, contentDetails, snippet, statistics } = video;

    return (
        snippet ? (
        <li ref={ref || null} className={styles.container} onClick={() => onClickVideo(video)}>
            <VideoThumbnail 
                thumbnailUrl={snippet.thumbnails.medium.url}
                duration={contentDetails.duration}
            />
            <div className={styles.info_container}>
                {
                    isThumbnail &&
                    <ChannelThumbnail
                        thumbnailUrl={channel.snippet.thumbnails.default.url}
                    />
                }
                <div className={styles.info_content}>
                    <h3 className={styles.title}>{snippet.title}</h3>
                    <div className={styles.info}>
                        <span className={styles.channel_title}>{snippet.channelTitle}</span>
                        <div className={styles.sub_info}>
                            <span>{`조회수 ${convertCount(statistics.viewCount)}회`}</span>
                            <span>{getTimeDiff(video.snippet.publishedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        ) : <VideoSkeleton />
    );
});

export default VideoBoxPresenter;

