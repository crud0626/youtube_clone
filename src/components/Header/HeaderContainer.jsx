import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from 'service/auth';
import { CHANGE_IS_SEARCHED, CHANGE_SEARCH_QUERY } from 'store/slice/conditionSlice';
import { CHANGE_VIDEO_LOADING, requestSearchData, RESET_SELECTED_VIDEO } from 'store/slice/videoSlice';
import { LOGIN, requestLogin, requestLogout } from 'store/slice/userSlice';
import { initVideo } from 'store/actions/initVideo';
import HeaderPresenter from './HeaderPresenter';

const HeaderContainer = () => {
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch(), navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDisplayEraser, setIsDisplayEraser] = useState(false);

    const inputRef = useRef();


    const handleModal = () => {
        setIsModalOpen(prevState => !prevState);
    }

    const onSearch = async (event) => {
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
    };

    const handleEraserBtn = () => {
        if (inputRef.current.value.length === 0) {
            setIsDisplayEraser(false);
            return;
        }
        setIsDisplayEraser(true);
    }

    const onErase = () => {
        inputRef.current.value = "";
        setIsDisplayEraser(false);
    }

    const onClickLogo = () => {
        navigate("/");
        dispatch(initVideo());
    }

    const onLogin = () => {
        dispatch(requestLogin());
    }

    const onLogout = () => {
        dispatch(requestLogout());
    }

    useEffect(() => {
        onAuthStateChanged(authService.auth, (user) => {
            if (user) {
                dispatch(LOGIN({
                    "uid": user.uid,
                    "name": user.displayName,
                    "url": user.photoURL
                }));
            }
        })
    }, [dispatch]);
    
    return (
        <HeaderPresenter 
            ref={inputRef}
            userData={userData}
            isDisplayEraser={isDisplayEraser}
            isModalOpen={isModalOpen}
            handleModal={handleModal}
            handleEraserBtn={handleEraserBtn}
            onSearch={onSearch}
            onErase={onErase}
            onClickLogo={onClickLogo}
            onLogin={onLogin}
            onLogout={onLogout}
        />
    );
};

export default HeaderContainer;