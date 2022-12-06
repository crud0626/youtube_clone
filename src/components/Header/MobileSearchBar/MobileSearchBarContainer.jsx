import React, { useCallback, useRef, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_IS_SEARCHING } from 'store/slice/conditionSlice';
import { onSearchVideos } from 'store/actions/onSearchVideos';
import { useStableNavigate } from 'hooks/useStableNavigate';
import MobileSearchBarPresenter from './MobileSearchBarPresenter';

const MobileSearchBarContainer = () => {
    const dispatch = useDispatch(), navigate = useStableNavigate();
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

    const handleMobileSearchBar = useCallback((event) => {
        if(!event || event.currentTarget === event.target) {
            dispatch(CHANGE_IS_SEARCHING());
        }
    }, [dispatch]);

    const onSearch = useCallback((event) => {
        if(event) event.preventDefault();

        const query = inputRef.current.value;
        dispatch(onSearchVideos(query))
        .then(() => navigate(`results?search_query=${query}`))
        .finally(() => dispatch(CHANGE_IS_SEARCHING()));
    }, [dispatch, navigate]);

    useEffect(() => inputRef.current.focus(), []);

    return (
        <MobileSearchBarPresenter 
            ref={inputRef}
            isFillInput={isFillInput}
            handleInput={handleInput}
            handleMobileSearchBar={handleMobileSearchBar}
            onErase={onErase}
            onSearch={onSearch}
        />
    );
};

export default MobileSearchBarContainer;