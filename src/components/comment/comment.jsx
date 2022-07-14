import React, { memo, useEffect, useRef } from 'react';
import styles from 'styles/comment.module.scss';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError, handleToggle } from 'utils/utils';
import useTextOver from 'hooks/useTextOver';

const Comment = memo((props) => {
    const toggleRef = useRef();
    const [isTextOver, spanRef] = useTextOver();

    useEffect(() => {
        if (props.lastCommentRef) props.setObserve();
    }, []);

    const getDiffDate = () => {
        let publishDate = props.topLevelComment.snippet.publishedAt;
        publishDate = Date.parse(publishDate);
        const now = Date.now();
        return props.getDiffTime(parseInt((now - publishDate) / 60000));
    }

    const commentText = {__html: props.topLevelComment.snippet.textDisplay};
    
    return (
        <li ref={props.lastCommentRef ? props.lastCommentRef : null} className={styles.container}>
            <a href={props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.thumbnail}>
                <img 
                    src={props.topLevelComment.snippet.authorProfileImageUrl} 
                    onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)} 
                    alt="author thumbnail" 
                />
            </a>
            <div className={styles.info_container}>
                <div className={styles.info_top}>
                    <a href={props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_name}>{props.topLevelComment.snippet.authorDisplayName}</a>
                    <span className={styles.comment_date}>{`${getDiffDate()} 전`}</span>
                </div>
                <div className={styles.info_bottom}>
                    <div ref={spanRef} className={`${styles.span_container} shortcut`}>
                        <span dangerouslySetInnerHTML={commentText}></span>
                    </div>
                    {
                        isTextOver && 
                        <button ref={toggleRef} className="toggle" onClick={() => handleToggle(spanRef.current, toggleRef.current)}>자세히 보기</button>
                    }
                </div>
            </div>
        </li>
    );
});

export default Comment;