import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import youtubeAPI from 'service/youtube-api';
import authService from 'service/auth';
import { CHANGE_IS_SEARCHED, CHANGE_SEARCH_QUERY } from 'store/slice/conditionSlice';
import { ADD_VIDEO_LIST, CHANGE_VIDEO_LOADING, RESET_SELECTED_VIDEO, RESET_VIDEO_LIST } from 'store/slice/videoSlice';
import { LOGIN, requestLogin, requestLogout } from 'store/slice/userSlice';
import Header from './Header';

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

            await youtubeAPI.searchVideo(query)
            .then(({ items, nextPageToken }) => {
                dispatch(RESET_VIDEO_LIST());
                dispatch(ADD_VIDEO_LIST({ items, nextPageToken }));
                dispatch(RESET_SELECTED_VIDEO());
                dispatch(CHANGE_IS_SEARCHED());
                dispatch(CHANGE_SEARCH_QUERY());
                navigate(`results?search_query=${query}`);
            })
            .finally(() => {
                dispatch(CHANGE_VIDEO_LOADING());
            })
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

    const initVideo = async () => {
        const dummyVideos = { items: new Array(24).fill(""), nextPageToken: null};

        dispatch(CHANGE_VIDEO_LOADING());
        dispatch(RESET_VIDEO_LIST());
        dispatch(ADD_VIDEO_LIST(dummyVideos));

        await youtubeAPI.getMostPopular()
        .then(({ items, nextPageToken }) => {
            dispatch(RESET_VIDEO_LIST());
            dispatch(ADD_VIDEO_LIST({ items, nextPageToken }));
            dispatch(RESET_SELECTED_VIDEO());
        })
        .finally(() => dispatch(CHANGE_VIDEO_LOADING()));
    }

    const onClickLogo = () => {
        navigate("/");
        initVideo();
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
        <Header 
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