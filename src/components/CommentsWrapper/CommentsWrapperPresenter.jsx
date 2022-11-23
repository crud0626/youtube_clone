import React, { forwardRef } from 'react';
import styles from './CommentsWrapper.module.scss';
import CommentBox from './CommentBox';
import Spinner from 'components/Spinner/Spinner';
import { nanoid } from 'nanoid';

const CommentsWrapperPresenter = forwardRef(({ comments, commentsCount, isLoading, setObserver }, ref) => {
    const { items, nextPageToken } = comments;

    const isAbort = items.length === 0 && !nextPageToken;
    
    return( 
        <div className={styles.wrapper}>
            {
                isAbort ? (
                    <div className={styles.no_comments}>
                        <p>댓글이 사용 중지되었습니다.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.header}>
                            <h3 className={styles.count}>
                                {`댓글 ${Number(commentsCount).toLocaleString("en")} 개`}
                            </h3>
                        </div>
                        <ul className={styles.body}>
                            {items.map((item, index) => {
                                const isLast = index === items.length - 1 && nextPageToken;
                                return (
                                    <CommentBox 
                                        key={nanoid()}
                                        ref={isLast ? ref : null}
                                        commentData={item.snippet.topLevelComment}
                                        setObserver={isLast ? setObserver : null}
                                    />
                                );
                            })}
                            {isLoading && nextPageToken && <Spinner />}
                        </ul>
                    </>
                )
            }
        </div>
    );
});

export default CommentsWrapperPresenter;