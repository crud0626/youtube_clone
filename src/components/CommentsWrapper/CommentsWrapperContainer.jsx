import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentsWrapperPresenter from './CommentsWrapperPresenter';
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
        if(!isLoading) {
            setIsLoading(true);
            await getMoreComment()
            .then(() => setIsLoading(false));
        }
    }

    const [lastCommentRef, setObserver] = useScrollObserver(observerCallback);

    return (
        <CommentsWrapperPresenter 
            ref={lastCommentRef}
            comments={comments}
            commentsCount={selectedVideo.statistics.commentCount}
            isLoading={isLoading}
            setObserver={setObserver}
        />
    );
};

export default CommentsWrapperContainer;