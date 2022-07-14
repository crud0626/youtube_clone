import React, { memo, useEffect, useRef } from 'react';
import styles from 'styles/comment.module.scss';
import useTextOver from 'hooks/useTextOver';
import { handleThumbnailError, handleToggle } from 'utils/utils';
import defaultThubmnail from 'assets/default_thubmnail.gif';

const Comment = memo(({ commentData, getDiffTime, lastCommentRef, setObserver }) => {
    const toggleRef = useRef();
    const [isTextOver, spanRef] = useTextOver();

    useEffect(() => {
        if (lastCommentRef) setObserver();
    }, []);

    const getDiffDate = () => {
        const publishDate = Date.parse(commentData.snippet.publishedAt);
        const now = Date.now();
        return getDiffTime(parseInt((now - publishDate) / 60000));
    }

    const { snippet } = commentData;
    const commentText = { __html: snippet.textDisplay };
    
    return (
        <li ref={lastCommentRef || null} className={styles.container}>
            <a href={snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.thumbnail}>
                <img 
                    src={snippet.authorProfileImageUrl} 
                    onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)} 
                    alt="author thumbnail" 
                />
            </a>
            <div className={styles.info_container}>
                <div className={styles.info_top}>
                    <a href={snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_name}>{snippet.authorDisplayName}</a>
                    <span className={styles.comment_date}>{`${getDiffDate()} 전`}</span>
                </div>
                <div className={styles.info_bottom}>
                    <div ref={spanRef} className={`${styles.span_container} shortcut`}>
                        <span dangerouslySetInnerHTML={commentText}></span>
                    </div>
                    {
                        isTextOver && 
                        <button 
                            ref={toggleRef} 
                            className="toggle" 
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