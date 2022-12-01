import React, { useCallback, useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CHANGE_SEARCH_QUERY } from 'store/slice/conditionSlice';
import { CHANGE_VIDEO_LOADING, requestSearchData, RESET_SELECTED_VIDEO } from 'store/slice/videoSlice';
import MobileSearchBarPresenter from './MobileSearchBarPresenter';

const MobileSearchBarContainer = () => {
    const dispatch = useDispatch(), navigate = useNavigate();
    const [isFillInput, setIsFillInput] = useState(false);
    const inputRef = useRef();

    const handleInput = useCallback((event) => {
        const text = event.target.value;
        setIsFillInput(text.match(/\S/) ? true : false);
    }, []);
    
    const onErase = useCallback(() => {
        if(inputRef.current) {
            inputRef.current.value = "";
            setIsFillInput(false);
        }
    }, []);

    const onSearch = useCallback((event) => {
        // 검색 아이콘 버튼을 누르는 경우 preventDefault를 호출 할 필요가 없음.
        if(event) event.preventDefault();

        dispatch(CHANGE_VIDEO_LOADING());

        if(inputRef.current.value.match(/\S/)) {
            const query = inputRef.current.value;
            dispatch(requestSearchData({ searchQuery: query, isFirst: true }))
            .then(() => {
                dispatch(RESET_SELECTED_VIDEO());
                dispatch(CHANGE_SEARCH_QUERY(query));
                navigate(`results?search_query=${query}`);
            })
            .finally(() => dispatch(CHANGE_VIDEO_LOADING()))
        }
    }, [dispatch, navigate]);

    return (
        <MobileSearchBarPresenter 
            ref={inputRef}
            isFillInput={isFillInput}
            handleInput={handleInput}
            onErase={onErase}
            onSearch={onSearch}
        />
    );
};

export default MobileSearchBarContainer;