import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderPresenter from './HeaderPresenter';
import { onAuthStateChanged } from 'firebase/auth';
import authService from 'service/auth';
import { LOGIN } from 'store/slice/userSlice';
import { initVideo } from 'store/actions/initVideo';

const HeaderContainer = () => {
    const dispatch = useDispatch(), navigate = useNavigate();

    const onClickLogo = useCallback(() => {
        navigate("/");
        dispatch(initVideo());
    }, [navigate, dispatch]);

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
        <HeaderPresenter onClickLogo={onClickLogo} />
    );
};

export default HeaderContainer;