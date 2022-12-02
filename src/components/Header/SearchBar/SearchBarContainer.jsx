import React, { useRef, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onSearchVideos } from 'store/actions/onSearchVideos';
import SearchBarPresenter from './SearchBarPresenter';

const SearchBarContainer = () => {
    const dispatch = useDispatch(), navigate = useNavigate();
    const [isDisplayEraser, setIsDisplayEraser] = useState(false);
    const inputRef = useRef();

    const handleEraserBtn = useCallback(() => {
        setIsDisplayEraser(inputRef.current.value.length === 0 ? false : true);
    }, []);

    const onSearch = useCallback((event) => {
        event.preventDefault();

        const query = inputRef.current.value;
        dispatch(onSearchVideos(query))
        .then(() => navigate(`results?search_query=${query}`));
    }, [dispatch, navigate]);
    
    const onErase = useCallback(() => {
        if(inputRef.current) {
            inputRef.current.value = "";
            setIsDisplayEraser(false);
        }
    }, []);

    return (
        <SearchBarPresenter 
            ref={inputRef}
            isDisplayEraser={isDisplayEraser}
            handleEraserBtn={handleEraserBtn}
            onSearch={onSearch}
            onErase={onErase}
        />
    );
};

export default SearchBarContainer;