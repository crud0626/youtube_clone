import React, { forwardRef } from 'react';
import styles from './CommentBox.module.scss';
import ChannelThumbnail from 'components/ChannelThumbnail/ChannelThumbnail';
import { getTimeDiff } from 'utils/calculator';

const CommentBoxPresenter = forwardRef((props, ref) => {
    const { spanRef, lastCommentRef } = ref;
    const { commentData, isFlipOpen, isTextOver, handleToggle } = props;
    const { snippet } = commentData;
    const commentText = { __html: snippet.textDisplay };
    
    return (
        <li ref={lastCommentRef} className={styles.wrapper}>
            <ChannelThumbnail
                thumbnailUrl={snippet.authorProfileImageUrl}
                channelUrl={snippet.authorChannelUrl}
            />
            <div className={styles.info_wrapper}>
                <div className={styles.info_header}>
                    <a 
                        href={snippet.authorChannelUrl} 
                        target="_blank" 
                        rel='noreferrer' 
                        className={styles.channel_name}
                    >
                        {snippet.authorDisplayName}
                    </a>
                    <span className={styles.publish_data}>
                        {getTimeDiff(commentData.snippet.publishedAt)}
                    </span>
                </div>
                <div className={styles.info_body}>
                    <div 
                        ref={spanRef} 
                        className={`${styles.content_wrapper} ${isFlipOpen ? "expander" : ""}`}
                    >
                        <span dangerouslySetInnerHTML={commentText}></span>
                    </div>
                    {
                        isTextOver && 
                        <button 
                            className={styles.toggle_btn}
                            onClick={() => handleToggle()}
                        >
                            <span>{ isFlipOpen ? "간략히" : "자세히 보기" }</span>
                        </button>
                    }
                </div>
            </div>
        </li>
    );
});

export default CommentBoxPresenter;