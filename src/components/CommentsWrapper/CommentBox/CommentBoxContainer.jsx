import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import useTextOver from 'hooks/useTextOver';
import CommentBoxPresenter from './CommentBoxPresenter';

// ref 2개인거 추후 해결하기
const CommentBoxContainer = forwardRef(({ commentData, setObserver }, ref) => {
    const [isFlipOpen, setIsFlipOpen] = useState(false);
    const [isTextOver, spanRef] = useTextOver(); // 일단 spanRef는 필요함.

    const handleToggle = useCallback(() => setIsFlipOpen((prevState) => !prevState), []);

    useEffect(() => {
        if (ref) setObserver();
    }, []);

    return (
        <CommentBoxPresenter 
            ref={ref}
            commentData={commentData}
            isFlipOpen={isFlipOpen}
            isTextOver={isTextOver}
            spanRef={spanRef}
            handleToggle={handleToggle}
        />
    );
});

export default CommentBoxContainer;