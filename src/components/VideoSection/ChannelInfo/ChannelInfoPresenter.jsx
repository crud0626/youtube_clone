import React, { forwardRef } from 'react';
import styles from './ChannelInfo.module.scss';
import ChannelThumbnail from 'components/ChannelThumbnail/ChannelThumbnail';
import { convertCount } from 'utils/calculator';
import { convertIdToUrl } from 'utils/utils';

const ChannelDescPresenter = forwardRef((props, ref) => {
    const { isTextOver, isOpenFlip, selectedVideo, handleToggle, convertToLink } = props;
    const { channel, snippet } = selectedVideo;

    return (
        <div className={styles.wrapper}>
            <ChannelThumbnail 
                thumbnailUrl={channel.snippet.thumbnails.default.url}
                channelUrl={convertIdToUrl(snippet.channelId)}
                isLarge={true}
            />
            <div className={styles.info}>
                {/* 채널 타이틀과 링크 */}
                <a 
                    href={convertIdToUrl(snippet.channelId)} 
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