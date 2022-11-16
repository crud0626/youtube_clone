import React, { useRef, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CHANGE_IS_SEARCHED, CHANGE_SEARCH_QUERY } from 'store/slice/conditionSlice';
import { CHANGE_VIDEO_LOADING, requestSearchData, RESET_SELECTED_VIDEO } from 'store/slice/videoSlice';
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
        dispatch(CHANGE_VIDEO_LOADING());

        if(inputRef.current.value.match(/\S/)) {
            const query = inputRef.current.value;
            dispatch(requestSearchData({ searchQuery: query, isFirst: true }))
            .then(() => {
                dispatch(RESET_SELECTED_VIDEO());
                dispatch(CHANGE_IS_SEARCHED());
                dispatch(CHANGE_SEARCH_QUERY(query));
                navigate(`results?search_query=${query}`);
            })
            .finally(() => dispatch(CHANGE_VIDEO_LOADING()))
        }
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