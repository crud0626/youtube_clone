import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from 'service/auth';
import { LOGIN, requestLogin, requestLogout } from 'store/slice/userSlice';
import { initVideo } from 'store/actions/initVideo';
import HeaderPresenter from './HeaderPresenter';

const HeaderContainer = () => {
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch(), navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClickLogo = useCallback(() => {
        navigate("/");
        dispatch(initVideo());
    }, [navigate, dispatch]);

    const handleModal = useCallback(() => setIsModalOpen(prevState => !prevState), []);

    const onLogin = useCallback(() => dispatch(requestLogin()), [dispatch]);

    const onLogout = useCallback(() => dispatch(requestLogout()), [dispatch]);

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
            userData={userData}
            isModalOpen={isModalOpen}
            handleModal={handleModal}
            onClickLogo={onClickLogo}
            onLogin={onLogin}
            onLogout={onLogout}
        />
    );
};

export default HeaderContainer;