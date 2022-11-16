import React from 'react';
import Icon from 'components/Icon/Icon';
import styles from './Header.module.scss';
import logoIMG from 'assets/logo.png';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError } from 'utils/utils';
import { ADD_VIDEO_MARK, GRID_MARK, BELL_MARK, EXIT_MARK, USER_MARK } from 'constants/iconPath';
import IconButton from 'components/IconButton/IconButton';
import SearchBar from './SearchBar/index';

const HeaderPresenter = (props) => {
    const { 
        userData, 
        isModalOpen, 
        handleModal, 
        onClickLogo,
        onLogin,
        onLogout
    } = props;

    return (
        <header>
            <div className={styles.container}>
                <div className={styles.left} onClick={onClickLogo}>
                    <img src={logoIMG} draggable="false" alt="mainlogo"/>
                    <h1>YouTube</h1>
                </div>
                <SearchBar />
                <div className={styles.right}>
                    <IconButton 
                        className={`${styles.right_btns} ${styles.btns}`} 
                        titleName="만들기"
                        def={ADD_VIDEO_MARK}
                    />
                    <IconButton 
                        className={`${styles.right_btns} ${styles.btns}`} 
                        titleName="YouTube 앱"
                        def={GRID_MARK}
                    />
                    <IconButton 
                        className={`${styles.right_btns} ${styles.btns}`} 
                        titleName="알림"
                        def={BELL_MARK}
                    />
                    {
                        userData.uid &&
                        <>
                            <button className={styles.thumbnail_container} onClick={() => handleModal()}>
                                <img 
                                    src={userData.url}
                                    onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)} 
                                    draggable="false"
                                    alt="thumbnail" 
                                />
                            </button>
                            {
                                isModalOpen &&
                                <div className={styles.modal_container}>
                                    <div className={styles.modal_header}>
                                        <img 
                                            src={userData.url} 
                                            onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                                            alt="thumbnail" 
                                        />
                                        <span>{userData.name}</span>
                                    </div>
                                    <div className={styles.modal_body}>
                                        <button className={styles.modal_button} onClick={() => onLogout()}>
                                            <div className={styles.modal_icons}>
                                                <Icon def={EXIT_MARK}/>
                                            </div>
                                            <span>로그아웃</span>
                                        </button>
                                    </div>
                                </div>
                            }
                        </>
                    }
                    {
                        !userData.uid &&
                        <IconButton 
                            className={`${styles.right_btns} ${styles.login_btn}`} 
                            titleName={"login button"}
                            onClick={() => onLogin()}
                            def={USER_MARK}
                            text={"로그인"}
                        />
                    }
                </div>
            </div>
        </header>
    );
};

export default HeaderPresenter;