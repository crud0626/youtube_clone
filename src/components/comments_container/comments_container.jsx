import React, { memo, useRef, useState } from 'react';
import Comment from '../comment/comment';
import Spinner from '../spinner/spinner';
import styles from './comments_container.module.css';
import { nanoid } from 'nanoid';

const CommentsContainer = memo((props) => {
    const [loading, setLoading] = useState(false);
    const lastCommentRef = useRef();
    let observer = "";

    const setObserve = () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        }

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                catchObserver();
            }
        }, options)

        observer.observe(lastCommentRef.current);
    }

    const catchObserver = () => {
        setLoading(true);
        props.getMoreComments()
        .then(() => setLoading(false));
        observer.disconnect();
    }

    if (props.comments.length === 1 && props.comments[0] === null) {
        return (
            <div className={styles.non_comments}>
                <p>댓글이 사용 중지되었습니다.</p>
            </div>
        );
    } else {
        return (
            <>
                <div className={styles.comments_top}>
                    <h3>{`댓글 ${Number(props.commentCount).toLocaleString("en")} 개`}</h3>
                </div>
                <ul className={styles.comments}>
                    {props.comments.map((comment, index) => {
                        const topLevelComment = comment.snippet.topLevelComment;
                        const renderProp = {
                            "key": nanoid(),
                            "topLevelComment" : topLevelComment,
                            "calcDiffDate" : props.calcDiffDate
                        };

                        if (index === props.comments.length - 1) {
                            renderProp.lastCommentRef = lastCommentRef;
                            renderProp.setObserve = setObserve;
                        }

                        return <Comment {...renderProp} />;
                    })}

                    {loading && <Spinner />}
                </ul>
            </>
        );
    }
});

export default CommentsContainer;