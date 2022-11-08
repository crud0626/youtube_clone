import React, { forwardRef } from 'react';
import Icon from 'components/Icon/Icon';
import styles from './Header.module.scss';
import logoIMG from 'assets/logo.png';
import keyboardIMG from 'assets/keyboard.gif';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError } from 'utils/utils';
import { CLOSE_MARK, SEARCH_MARK, VOICE_MARK, ADD_VIDEO_MARK, GRID_MARK, BELL_MARK, EXIT_MARK, USER_MARK } from 'constants/iconPath';
import IconButton from 'components/IconButton/IconButton';

const HeaderPresenter = forwardRef((props, ref) => {
    const { 
        userData, 
        isModalOpen, 
        isDisplayEraser,
        handleModal, 
        handleEraserBtn, 
        onSearch, 
        onErase, 
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
                <div className={styles.center}>
                    <div className={styles.searchbar_container}>
                        <div className={styles.searchbar}>
                            <form className={styles.search_form} onSubmit={onSearch}>
                                <input ref={ref} placeholder='검색' type="text" onKeyUp={() => handleEraserBtn()}/>
                            </form>
                            <div className={styles.input_icons_container}>
                                <button className={styles.input_icon} onClick={(e) => e.preventDefault()}>
                                    <img src={keyboardIMG} draggable="false" alt="keyboardIcon" />
                                </button>
                                {
                                    isDisplayEraser && 
                                    <IconButton 
                                        className={styles.input_icon}
                                        onClick={() => onErase()}
                                        def={CLOSE_MARK}
                                    />
                                }
                            </div>
                        </div>
                        <IconButton 
                            className={`${styles.search_icon} ${styles.btns}`} 
                            onClick={onSearch} 
                            titleName="검색"
                            def={SEARCH_MARK}
                        />
                    </div>
                    <IconButton 
                        className={`${styles.voice_btn} ${styles.btns}`} 
                        titleName="음성으로 검색"
                        def={VOICE_MARK}
                    />
                </div>
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
});

export default HeaderPresenter;