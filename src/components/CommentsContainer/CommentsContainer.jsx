import React, { useState } from 'react';
import Comment from 'components/CommentsContainer/Comment/Comment';
import Spinner from 'components/Spinner/Spinner';
import styles from 'styles/commentsContainer/commentsContainer.module.scss';
import useScrollObserver from 'hooks/useScrollObserver';
import { nanoid } from 'nanoid';

const CommentsContainer = ({ commentCount, comments, getTimeDiff, getMoreComment }) => {
    const [isLoading, setIsLoading] = useState(false);

    const observerCallback = async () => {
        setIsLoading(true);
        await getMoreComment()
        .then(() => setIsLoading(false));
    }
    const [lastCommentRef, setObserver] = useScrollObserver(observerCallback);

    const { items, nextPageToken } = comments;

    return(
        <div className={styles.container}>
            {
                !items &&
                <div className={styles.no_comments}>
                    <p>댓글이 사용 중지되었습니다.</p>
                </div>
            }
            {
                items &&
                <>
                    <div className={styles.header}>
                        <h3 className={styles.count}>{`댓글 ${Number(commentCount).toLocaleString("en")} 개`}</h3>
                    </div>
                    <ul className={styles.body}>
                        {items.map((item, index) => {
                            const renderProp = {
                                "key": nanoid(),
                                "commentData" : item.snippet.topLevelComment,
                                "getTimeDiff" : getTimeDiff
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
            }
        </div>
    );
};

export default CommentsContainer;