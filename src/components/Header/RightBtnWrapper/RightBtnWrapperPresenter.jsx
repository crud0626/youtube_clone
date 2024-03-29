import React from 'react';
import styles from './RightBtnWrapper.module.scss';
import IconButton from 'components/IconButton/IconButton';
import Icon from 'components/Icon/Icon';
import { ADD_VIDEO_MARK, BELL_MARK, EXIT_MARK, GRID_MARK, SEARCH_MARK, USER_MARK } from 'constants/iconPath';
import { handleThumbnailError } from 'utils/utils';
import { DEFAULT_THUMBNAIL } from 'assets';

// 로그인시 유저 아이콘을 클릭했을때 디스플레이되는 모달창
const UserModal = ({ userData, handleThumbnailError, onLogout }) => {
    return(
        <div className={styles.modal_wrapper}>
            <div className={styles.modal_header}>
                <img 
                    src={userData.url} 
                    onError={({ currentTarget }) => 
                        handleThumbnailError(currentTarget, DEFAULT_THUMBNAIL)
                    }
                    alt="thumbnail" 
                />
                <span>{userData.name}</span>
            </div>
            <div className={styles.modal_body}>
                <button 
                    className={styles.modal_button} 
                    onClick={() => onLogout()}
                >
                    <div className={styles.modal_icons}>
                        <Icon def={EXIT_MARK}/>
                    </div>
                    <span>로그아웃</span>
                </button>
            </div>
        </div>
    );
}

// 로그인 여부에 따라 로그인버튼 또는 유저의 아이콘을 디스플레이
const LoginButton = ({ userData, isModalOpen, handleModal, onLogout, onLogin }) => (
    userData.uid ? (
        <>
            <button 
                className={styles.thumbnail_wrapper} 
                onClick={() => handleModal()}
            >
                <img 
                    src={userData.url}
                    onError={({ currentTarget }) => 
                        handleThumbnailError(currentTarget, DEFAULT_THUMBNAIL)
                    } 
                    draggable="false"
                    alt="thumbnail" 
                />
            </button>
            {
                isModalOpen &&
                <UserModal 
                    userData={userData}
                    handleThumbnailError={handleThumbnailError}
                    onLogout={onLogout}
                />
            }
        </>
    ) : (
        <IconButton 
            className={styles.login_btn}
            titleName={"login button"}
            onClick={() => onLogin()}
            def={USER_MARK}
            text={"로그인"}
        />
    )
);

const RightBtnWrapperPresenter = (props) => {
    const {
        userData,
        isMobile,
        isModalOpen,
        handleModal,
        handleMobileSearchBar,
        onLogout,
        onLogin
    } = props;

    return (
        <div className={styles.wrapper}>
            <IconButton 
                className={styles.btns}
                titleName="만들기"
                def={ADD_VIDEO_MARK}
            />
            <IconButton 
                className={styles.btns}
                titleName="YouTube 앱"
                def={GRID_MARK}
            />
            <IconButton 
                className={styles.btns}
                titleName="알림"
                def={BELL_MARK}
            />
            {
                isMobile && 
                <IconButton 
                    className={`${styles.btns} ${styles.mobile_search_btn}`}
                    titleName="검색"
                    def={SEARCH_MARK}
                    onClick={() => handleMobileSearchBar()}
                />
            }
            <LoginButton 
                userData={userData}
                isModalOpen={isModalOpen}
                handleModal={handleModal}
                onLogout={onLogout}
                onLogin={onLogin}
            />
        </div>
    );
};

export default RightBtnWrapperPresenter;