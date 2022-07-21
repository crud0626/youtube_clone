import React, { memo, useEffect, useRef } from 'react';
import styles from 'styles/comment.module.scss';
import useTextOver from 'hooks/useTextOver';
import { handleThumbnailError, handleToggle } from 'utils/utils';
import defaultThubmnail from 'assets/default_thubmnail.gif';

const Comment = memo(({ commentData, getTimeDiff, lastCommentRef, setObserver }) => {
    const toggleRef = useRef();
    const [isTextOver, spanRef] = useTextOver();

    useEffect(() => {
        if (lastCommentRef) setObserver();
    }, []);

    const { snippet } = commentData;
    const commentText = { __html: snippet.textDisplay };
    
    return (
        <li ref={lastCommentRef || null} className={styles.container}>
            <a href={snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.thumbnail}>
                <img 
                    src={snippet.authorProfileImageUrl} 
                    onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                    draggable="false"
                    alt="author thumbnail" 
                />
            </a>
            <div className={styles.info_container}>
                <div className={styles.info_header}>
                    <a href={snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.name}>{snippet.authorDisplayName}</a>
                    <span className={styles.publish_data}>{getTimeDiff(commentData.snippet.publishedAt)}</span>
                </div>
                <div className={styles.info_body}>
                    <div ref={spanRef} className={`${styles.content_container} shortcut`}>
                        <span dangerouslySetInnerHTML={commentText}></span>
                    </div>
                    {
                        isTextOver && 
                        <button 
                            ref={toggleRef} 
                            className={styles.toggle_btn}
                            onClick={() => handleToggle(spanRef.current, toggleRef.current)}
                        >
                            자세히 보기
                        </button>
                    }
                </div>
            </div>
        </li>
    );
});

export default Comment;