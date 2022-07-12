import React, { memo, useEffect, useRef, useState } from 'react';

import styles from '../../styles/comment.module.scss';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError } from 'utils/utils';

const Comment = memo((props) => {
    const spanRef = useRef();
    const [textOver, setTextOver] = useState(false);

    useEffect(() => {
        const currentRef = spanRef.current;
        if (currentRef.clientHeight < currentRef.scrollHeight) !textOver && setTextOver(true);
        if (props.lastCommentRef) props.setObserve();
    }, []);

    const getDiffDate = () => {
        let publishDate = props.topLevelComment.snippet.publishedAt;
        publishDate = Date.parse(publishDate);
        const now = Date.now();
        return props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    const handleToggle = (event) => {
        const target = event.target.previousSibling;

        if (target.matches("#expander")) {
            target.classList.remove("expander");
            target.classList.add("shortcut");
            target.id = "shortcut";
            event.target.innerText = "자세히 보기";
            return;
        }

        target.classList.remove("shortcut");
        target.classList.add("expander");
        target.id = "expander";
        event.target.innerText = "간략히";
        return;
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
                    {textOver && <button className="toggle" onClick={handleToggle}>자세히 보기</button>}
                </div>
            </div>
        </li>
    );
});

export default Comment;