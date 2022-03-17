import React, { memo, useRef, useState } from 'react';
import Comment from '../comment/comment';
import Spinner from '../spinner/spinner';
import styles from './comments_container.module.css';

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

    return (
        <>
            <div className={styles.comments_top}>
                <h3>{`댓글 ${Number(props.commentCount).toLocaleString("en")} 개`}</h3>
            </div>
            <ul className={styles.comments}>
                {props.comments.map(({snippet : {topLevelComment}}, index) => {
                    const componentKey = topLevelComment.id + index;
                    const renderProp = {
                        "key": componentKey,
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
});

export default CommentsContainer;