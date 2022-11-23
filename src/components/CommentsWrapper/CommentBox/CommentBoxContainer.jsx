import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import useTextOver from 'hooks/useTextOver';
import CommentBoxPresenter from './CommentBoxPresenter';

const CommentBoxContainer = forwardRef(({ commentData, setObserver }, ref) => {
    const [isFlipOpen, setIsFlipOpen] = useState(false);
    const [isTextOver, spanRef] = useTextOver();
    const refs = {
        spanRef,
        lastCommentRef: ref
    };

    const handleToggle = useCallback(() => setIsFlipOpen((prevState) => !prevState), []);

    useEffect(() => {
        if (refs.lastCommentRef) setObserver();
    }, []);

    return (
        <CommentBoxPresenter 
            ref={refs}
            commentData={commentData}
            isFlipOpen={isFlipOpen}
            isTextOver={isTextOver}
            spanRef={spanRef}
            handleToggle={handleToggle}
        />
    );
});

export default CommentBoxContainer;