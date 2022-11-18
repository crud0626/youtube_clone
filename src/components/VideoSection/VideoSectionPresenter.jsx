import React, { forwardRef } from 'react';
import styles from './VideoSection.module.scss';
import PlayerBox from './PlayerBox';
import PlayList from './PlayList';
import CommentsWrapper from 'components/CommentsWrapper';
import { handleThumbnailError } from 'utils/utils';
import { convertCount } from 'utils/calculator';
import { DEFAULT_THUMBNAIL } from 'assets';

const VideoSectionPresenter = forwardRef((props, ref) => {
    const {
        selectedVideo,
        isOpenFlip,
        isTextOver,
        isInSection,
        handleToggle,
        convertToLink
    } = props;

    const { channel, snippet } = selectedVideo;

    return (
        <section className="section_select_video">
            <div className={styles.wrapper}>
                <PlayerBox />
                <div className={styles.channel_info_wrapper}>
                    <a className={styles.channel_thumbnail} href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer" >
                        <img 
                            src={channel.snippet.thumbnails.default.url} 
                            onError={({ currentTarget }) => handleThumbnailError(currentTarget, DEFAULT_THUMBNAIL)}
                            draggable="false"
                            alt="channelImage" 
                        />
                    </a>
                    <div className={styles.channel_info}>
                        <a 
                            href={`https://www.youtube.com/channel/${snippet.channelId}`} 
                            target="_blank" rel="noreferrer"
                            className={styles.channel}
                            title={snippet.channelTitle}
                        >
                            {snippet.channelTitle}
                        </a>
                        <span>{`구독자 ${convertCount(channel.statistics.subscriberCount)}명`}</span>
                        <div className={styles.desc_wrapper}>
                            <pre 
                                ref={ref} 
                                className={`${styles.desc} `}
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
                { isInSection && <PlayList isInSection={isInSection} /> }
                <CommentsWrapper />
            </div>
            { !isInSection && <PlayList isInSection={isInSection} /> }
        </section>
    );
});

export default VideoSectionPresenter;
