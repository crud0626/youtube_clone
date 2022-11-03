import React, { useState } from 'react';
import Comment from 'components/CommentsContainer/Comment/Comment';
import Spinner from 'components/Spinner/Spinner';
import styles from 'styles/commentsContainer/commentsContainer.module.scss';
import useScrollObserver from 'hooks/useScrollObserver';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import youtubeAPI from 'service/youtube-api';
import { ADD_COMMENTS } from 'store/slice/videoSlice';

const CommentsContainer = ({ commentCount, getTimeDiff }) => {
    const { comments, selectedVideo } = useSelector(state => state.video);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const getMoreComment = async () => {
        await youtubeAPI.getComment(selectedVideo.id, comments.nextPageToken)
        .then(({ items, nextPageToken }) => {
            dispatch(ADD_COMMENTS({ items, nextPageToken }));
        });
      }

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