import React, { forwardRef } from 'react';
import styles from './ChannelInfo.module.scss';
import { DEFAULT_THUMBNAIL } from 'assets';
import { handleThumbnailError } from 'utils/utils';
import { convertCount } from 'utils/calculator';

const ChannelDescPresenter = forwardRef((props, ref) => {
    const { isTextOver, isOpenFlip, selectedVideo, handleToggle, convertToLink } = props;
    const { channel, snippet } = selectedVideo;

    return (
        <div className={styles.wrapper}>
            {/* Channel Thumbnail 컴포넌트 적용 가능 사이즈만 변경하면 */}
            <a 
                className={styles.thumbnail} 
                href={`https://www.youtube.com/channel/${snippet.channelId}`} 
                target="_blank" 
                rel="noreferrer" 
            >
                <img 
                    src={channel.snippet.thumbnails.default.url} 
                    onError={({ currentTarget }) => 
                        handleThumbnailError(currentTarget, DEFAULT_THUMBNAIL)
                    }
                    draggable="false"
                    alt="channelImage"
                />
            </a>
            {/* Channel Thumbnail 컴포넌트 */}
            <div className={styles.info}>
                {/* 채널 타이틀과 링크 */}
                <a 
                    href={`https://www.youtube.com/channel/${snippet.channelId}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className={styles.channel}
                    title={snippet.channelTitle}
                >
                    {snippet.channelTitle}
                </a>
                <span>
                    {`구독자 ${convertCount(channel.statistics.subscriberCount)}명`}
                </span>
                <div className={styles.desc_wrapper}>
                    <pre 
                        ref={ref} 
                        className={styles.desc}
                        dangerouslySetInnerHTML={convertToLink(snippet.description)}
                    />
                    {
                        isTextOver && 
                        <button 
                            className={styles.toggle_btn} 
                            onClick={() => handleToggle()}
                        >
                            <span>{ isOpenFlip ? "간략히" : "더보기" }</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
});

export default ChannelDescPresenter;