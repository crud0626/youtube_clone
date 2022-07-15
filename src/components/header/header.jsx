import React, { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/Icon/Icon';
import styles from 'styles/header.module.scss';
import logoIMG from 'assets/logo.png';
import keyboardIMG from 'assets/keyboard.gif';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError } from 'utils/utils';
import { CLOSE_MARK, SEARCH_MARK, VOICE_MARK, ADD_VIDEO_MARK, GRID_MARK, BELL_MARK, EXIT_MARK, USER_MARK } from 'constants/iconPath';
import IconButton from 'components/IconButton/IconButton';

const Header = memo(({ initVideo, onSearchVideo, onLogIn, onLogOut, userData }) => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const eraserRef = useRef();
    const modalRef = useRef();

    const handleModal = () => {
        const modal = modalRef.current;
        if (!modal.style.visibility || modal.style.visibility === 'hidden') {
            modal.style.visibility = "visible";
            return;
        }
        modal.style.visibility = "hidden";
        return;
    }

    const onSearch = (event) => {
        event.preventDefault();
        
        if (inputRef.current.value.match(/\S/)) {
            onSearchVideo(inputRef.current.value);
        }
    }

    const handleInput = () => {
        if (inputRef.current.value.length === 0) {
            eraserRef.current.classList.add("input_hidden");
            return;
        }
        eraserRef.current.classList.remove("input_hidden");
    }

    const eraseInputValue = () => {
        eraserRef.current.classList.add("input_hidden");
        inputRef.current.value = "";
    }

    const onClickLogo = () => {
        navigate("/");
        initVideo();
    }

    return (
        <header>
            <div className={styles.container}>
                <div className={styles.left} onClick={onClickLogo}>
                    <img src={logoIMG} draggable="false" alt="mainlogo"/>
                    <h1>YouTube</h1>
                </div>
                <div className={styles.center}>
                    <div className={styles.searchbar_container}>
                        <div className={styles.search_bar}>
                            <form className={styles.search_form} onSubmit={onSearch}>
                                <input ref={inputRef} placeholder='검색' type="text" onKeyUp={handleInput}/>
                            </form>
                            <div className={styles.input_icons_container}>
                                <button className={styles.input_icon} onClick={(e) => e.preventDefault()}>
                                    <img src={keyboardIMG} draggable="false" alt="keyboardIcon" />
                                </button>
                                <IconButton 
                                    ref={eraserRef}
                                    className={`${styles.input_icon} input_hidden`}
                                    onClick={eraseInputValue}
                                    def={CLOSE_MARK}
                                />
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
                        className={`${styles.voiceBtn} ${styles.btns}`} 
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
                            <button className={styles.thumbnail_container} onClick={handleModal}>
                                <img 
                                    src={userData.url}
                                    onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)} 
                                    draggable="false"
                                    alt="thumbnail" 
                                />
                            </button>
                            <div ref={modalRef} className={styles.userModal_container}>
                                <div className={styles.modal_top}>
                                    <img 
                                        src={userData.url} 
                                        onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                                        alt="thumbnail" 
                                    />
                                    <span>{userData.name}</span>
                                </div>
                                <div className={styles.modal_bottom}>
                                    <div className={styles.modal_content} onClick={onLogOut}>
                                        <div className={styles.modal_icons}>
                                            <Icon def={EXIT_MARK}/>
                                        </div>
                                        <span>로그아웃</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        !userData.uid &&
                        <IconButton 
                            className={`${styles.right_btns} ${styles.login_btn}`} 
                            titleName={"login button"}
                            onClick={onLogIn}
                            def={USER_MARK}
                            text={"로그인"}
                        />
                    }
                </div>
            </div>
        </header>
    );
});

export default Header;