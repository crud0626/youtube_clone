import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentsWrapper from './CommentsWrapper';
import useScrollObserver from 'hooks/useScrollObserver';
import youtubeAPI from 'service/youtube-api';
import { ADD_COMMENTS } from 'store/slice/videoSlice';

const CommentsWrapperContainer = () => {
    const dispatch = useDispatch();
    const { comments, selectedVideo } = useSelector(state => state.video);
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

    return (
        <CommentsWrapper 
            ref={lastCommentRef}
            comments={comments}
            commentsCount={selectedVideo.statistics.commentCount}
            isLoading={isLoading}
            setObserver={setObserver}
        />
    );
};

export default CommentsWrapperContainer;