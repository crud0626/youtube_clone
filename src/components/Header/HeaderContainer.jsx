import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeaderPresenter from './HeaderPresenter';
import { onAuthStateChanged } from 'firebase/auth';
import { LOGIN } from 'store/slice/userSlice';
import { initVideo } from 'store/actions/initVideo';
import authService from 'service/auth';
import useResizeObserver from 'hooks/useResizeObserver';

const HeaderContainer = () => {
    const dispatch = useDispatch(), navigate = useNavigate();
    const { isSearching } = useSelector(state => state.condition);
    const isMobile = useResizeObserver(600);

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
        <HeaderPresenter 
            isMobile={isMobile}
            isSearching={isSearching}
            onClickLogo={onClickLogo} 
        />
    );
};

export default HeaderContainer;