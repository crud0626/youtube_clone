import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin, requestLogout } from 'store/slice/userSlice';
import { CHANGE_IS_SEARCHING } from 'store/slice/conditionSlice';
import useResizeObserver from 'hooks/useResizeObserver';
import RightBtnWrapperPresenter from './RightBtnWrapperPresenter';

const RightBtnWrapperContainer = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useResizeObserver(600);

    const handleModal = useCallback(() => setIsModalOpen(prevState => !prevState), []);

    const onLogout = useCallback(() => dispatch(requestLogout()), [dispatch]);

    const onLogin = useCallback(() => dispatch(requestLogin()), [dispatch]);

    const handleMobileSearchBar = useCallback(() => dispatch(CHANGE_IS_SEARCHING()), [dispatch]);

    return (
        <RightBtnWrapperPresenter 
            userData={userData}
            isMobile={isMobile}
            isModalOpen={isModalOpen}
            handleModal={handleModal}
            handleMobileSearchBar={handleMobileSearchBar}
            onLogout={onLogout}
            onLogin={onLogin}
        />
    );
};

export default React.memo(RightBtnWrapperContainer);