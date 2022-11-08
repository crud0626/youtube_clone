import React, { forwardRef, useEffect, useState, useCallback } from 'react';
import styles from 'styles/commentsWrapper/commentBox/commentBox.module.scss';
import useTextOver from 'hooks/useTextOver';
import ChannelThumbnail from 'components/ChannelThumbnail/ChannelThumbnail';
import { getTimeDiff } from 'utils/calculator';

const CommentBox = forwardRef(({ commentData, setObserver }, ref) => {
    const [isFlipOpen, setIsFlipOpen] = useState(false);
    const [isTextOver, spanRef] = useTextOver();

    const handleToggle = useCallback(() => setIsFlipOpen((prevState) => !prevState), []);

    useEffect(() => {
        if (ref) setObserver();
    }, []);

    const { snippet } = commentData, commentText = { __html: snippet.textDisplay };
    
    return (
        <li ref={ref} className={styles.container}>
            <ChannelThumbnail
                thumbnailUrl={snippet.authorProfileImageUrl}
                channelUrl={snippet.authorChannelUrl}
            />
            <div className={styles.info_container}>
                <div className={styles.info_header}>
                    <a href={snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.name}>{snippet.authorDisplayName}</a>
                    <span className={styles.publish_data}>{getTimeDiff(commentData.snippet.publishedAt)}</span>
                </div>
                <div className={styles.info_body}>
                    <div ref={spanRef} className={`${styles.content_container} ${isFlipOpen ? "expander" : ""}`}>
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

export default CommentBox;