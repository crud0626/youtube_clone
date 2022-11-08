import React, { forwardRef } from 'react';
import styles from 'styles/videoSection/videoSection.module.scss';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import CommentsWrapperContainer from 'components/CommentsWrapper/CommentsWrapperContainer';
import IconButton from 'components/IconButton/IconButton';
import PlayListContainer from 'components/VideoSection/PlayList/PlayListContainer';
import { EMPTY_LIKE_MARK, FILL_LIKE_MARK, EMPTY_DISLIKE_MARK, FILL_DISLIKE_MARK, SHARE_MARK, SAVE_MARK } from 'constants/iconPath';
import { handleThumbnailError } from 'utils/utils';
import { convertCount } from 'utils/calculator';

const VideoSection = forwardRef((props, ref) => {
    const {
        selectedVideo,
        rating,
        isFlipOpen,
        isTextOver,
        isInSection,
        handleToggle,
        displayVideoDate,
        sendRating,
        convertToLink
    } = props;

    const { channel, id, snippet, statistics } = selectedVideo;

    return (
        <section className="section_select_video">
            <div className={styles.container}>
                <div className={styles.player_container}>
                    <iframe 
                        className={styles.player}
                        id="ytplayer" 
                        type="text/html" 
                        title='videoplayer'
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder="0" 
                        allowFullScreen
                    ></iframe>
                </div>
                <div className={styles.video_info_container}>
                    <h3 className={styles.video_title}>{snippet.title}</h3>
                    <div className={styles.video_info}>
                        <div className={styles.video_info_text}>
                            <span>{`${Number(statistics.viewCount).toLocaleString("en")}회`}</span>
                            <span>{" • "}</span>
                            <span>{displayVideoDate()}</span>
                        </div>
                        <div className={styles.video_info_button_container}>
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`} 
                                titleName="이 동영상이 마음에 듭니다."
                                dataFunc={rating.like ? "none" : "like"} 
                                onClick={sendRating}
                                def={rating.like ? FILL_LIKE_MARK : EMPTY_LIKE_MARK}
                                text={convertCount(statistics.likeCount)}
                            />
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`}
                                titleName="이 동영상이 마음에 들지 않습니다."
                                dataFunc={rating.disLike ? "none" : "dislike"} 
                                onClick={sendRating}
                                def={rating.disLike ? FILL_DISLIKE_MARK : EMPTY_DISLIKE_MARK}
                                text="싫어요"
                            />
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`} 
                                titleName="공유"
                                def={SHARE_MARK}
                                text="공유"
                            />
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`} 
                                titleName="저장"
                                def={SAVE_MARK} 
                                text="저장"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.channel_info_container}>
                    <a className={styles.channel_thumbnail} href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer" >
                        <img 
                            src={channel.snippet.thumbnails.default.url} 
                            onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
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
                        <div className={styles.desc_container}>
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
                                    <span>{ isFlipOpen ? "간략히" : "더보기" }</span>
                                </button>
                            }
                        </div>
                        
                    </div>
                    
                </div>
                { isInSection && <PlayListContainer isInSection={isInSection} /> }
                <CommentsWrapperContainer />
            </div>
            { !isInSection && <PlayListContainer isInSection={isInSection} /> }
        </section>
    );
});

export default VideoSection;
