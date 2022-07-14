import React, { useRef, useState } from 'react';
import Comment from 'components/Comment/Comment';
import Spinner from 'components/Spinner/Spinner';
import styles from 'styles/comments_container.module.scss';
import useObserver from 'hooks/useObserver';
import { nanoid } from 'nanoid';

const CommentsContainer = ({ commentCount, comments, getDiffTime, getMoreComment }) => {
    const [isLoading, setIsLoading] = useState(false);

    const observerCallback = async () => {
        setIsLoading(true);
        await getMoreComment()
        .then(() => setIsLoading(false));
    }
    const [lastCommentRef, setObserver] = useObserver(observerCallback);

    const { items, nextPageToken } = comments;

    if (!items) {
        return (
            <div className={styles.no_comments}>
                <p>댓글이 사용 중지되었습니다.</p>
            </div>
        );
    } else {
        return (
            <>
                <div className={styles.info}>
                    <h3>{`댓글 ${Number(commentCount).toLocaleString("en")} 개`}</h3>
                </div>
                <ul className={styles.comments}>
                    {items.map((item, index) => {
                        const renderProp = {
                            "key": nanoid(),
                            "commentData" : item.snippet.topLevelComment,
                            "getDiffTime" : getDiffTime
                        };

                        if (!isLoading && index === items.length - 1 && nextPageToken) {
                            renderProp.lastCommentRef = lastCommentRef;
                            renderProp.setObserver = setObserver;
                        }

                        return <Comment {...renderProp} />;
                    })}
                    {isLoading && nextPageToken && <Spinner />}
                </ul>
            </>
        );
    }
};

export default CommentsContainer;