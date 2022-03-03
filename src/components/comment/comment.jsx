import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './comment.module.css';

const Comment = memo((props) => {
    const spanRef = useRef();
    const [textOver, setTextOver] = useState(false);

    // if문 끝에 return 안넣어도 되나?
    useEffect(() => {
        if (spanRef.current.clientHeight < spanRef.current.scrollHeight) {
            !textOver && setTextOver(true);
        }
        if (props.lastCommentRef) {
            props.setObserve();
        }
    }, []);

    const getDiffDate = () => {
        let publishDate = props.topLevelComment.snippet.publishedAt;
        const now = Date.now();
        publishDate = Date.parse(publishDate);
        return props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    const onClickToggle = (event) => {
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

    if (props.lastCommentRef) {
        return (
            <li ref={props.lastCommentRef} className={styles.comment_container}>
                <a href={props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_thumbnail}>
                    <img src={props.topLevelComment.snippet.authorProfileImageUrl} alt="author thumbnail" />
                </a>
                <div className={styles.comment_info}>
                    <div className={styles.info_top}>
                        <a href={props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_name}>{props.topLevelComment.snippet.authorDisplayName}</a>
                        <span className={styles.comment_date}>{`${getDiffDate()} 전`}</span>
                    </div>
                    <div className={styles.info_bottom}>
                        <div ref={spanRef} className={`${styles.span_container} shortcut`}>
                            <span dangerouslySetInnerHTML={commentText}></span>
                        </div>
                        {textOver && <button className="toggle" onClick={onClickToggle}>자세히 보기</button>}
                    </div>
                </div>
            </li>
        );
    } else {
        return (
            <li className={styles.comment_container}>
                <a href={props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_thumbnail}>
                    <img src={props.topLevelComment.snippet.authorProfileImageUrl} alt="author thumbnail" />
                </a>
                <div className={styles.comment_info}>
                    <div className={styles.info_top}>
                        <a href={props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_name}>{props.topLevelComment.snippet.authorDisplayName}</a>
                        <span className={styles.comment_date}>{`${getDiffDate()} 전`}</span>
                    </div>
                    <div className={styles.info_bottom}>
                        <div ref={spanRef} className={`${styles.span_container} shortcut`}>
                            <span dangerouslySetInnerHTML={commentText}></span>
                        </div>
                        {textOver && <button className="toggle" onClick={onClickToggle}>자세히 보기</button>}
                    </div>
                </div>
            </li>
        );
    }
});

export default Comment;