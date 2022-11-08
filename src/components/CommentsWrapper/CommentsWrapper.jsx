import React, { forwardRef } from 'react';
import styles from 'styles/commentsWrapper/commentsWrapper.module.scss';
import CommentBoxContainer from './CommentBox/CommentBoxContainer';
import Spinner from 'components/Spinner/Spinner';
import { nanoid } from 'nanoid';

const CommentsWrapper = forwardRef(({ comments, commentsCount, isLoading, setObserver }, ref) => {
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
                        <h3 className={styles.count}>
                            {`댓글 ${Number(commentsCount).toLocaleString("en")} 개`}
                        </h3>
                    </div>
                    <ul className={styles.body}>
                        {items.map((item, index) => {
                            const renderProp = {
                                "key": nanoid(),
                                "commentData" : item.snippet.topLevelComment,
                            };

                            if (!isLoading && index === items.length - 1 && nextPageToken) {
                                renderProp.ref = ref;
                                renderProp.setObserver = setObserver;
                            }

                            return <CommentBoxContainer {...renderProp} />;
                        })}
                        {isLoading && nextPageToken && <Spinner />}
                    </ul>
                </>
            }
        </div>
    );
});

export default CommentsWrapper;