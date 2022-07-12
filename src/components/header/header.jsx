import React, { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/header.module.scss';
import logoIMG from 'assets/logo.png';
import keyboardIMG from 'assets/keyboard.gif';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError } from 'utils/utils';
import { CLOSE_MARK, SEARCH_MARK, VOICE_MARK, ADD_VIDEO_MARK, GRID_MARK, BELL_MARK, EXIT_MARK, USER_MARK } from 'constants/iconPath';

const Header = memo(({moveToMain, searchVideos, onLogIn, onLogOut, user}) => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const eraser = document.querySelector("button#input_eraser");

    const handleModal = () => {
        const modal = document.querySelector("#userModal");
        if (modal.style.visibility === "" || modal.style.visibility === 'hidden') {
            modal.style.visibility = "visible";
            return;
        }
        modal.style.visibility = "hidden";
        return;
    }

    const onSearch = (event) => {
        event.preventDefault();
        if (inputRef.current.value.search(/\S/g) === 0) {
            searchVideos(inputRef.current.value);
        }
    }

    const handleInput = () => {
        if (inputRef.current.value.length === 0) {
            eraser.classList.add("input_hidden");
        } else {
            eraser.classList.remove("input_hidden");
        }
    }

    const removeInputValue = () => {
        eraser.classList.add("input_hidden");
        inputRef.current.value = "";
    }

    const clickKeyboard = (e) => {
        e.preventDefault();
    }

    const clickedLogo = async () => {
        navigate("/");
        await moveToMain();
    }

    return (
        <header>
            <div className={styles.container}>
                <div className={styles.left} onClick={clickedLogo}>
                    <img src={logoIMG} alt="mainlogo"/>
                    <h1>YouTube</h1>
                </div>
                <div className={styles.center}>
                    <div className={styles.searchbar_container}>
                        <div className={styles.search_bar}>
                            <form className={styles.search_form} onSubmit={onSearch}>
                                <input ref={inputRef} placeholder='검색' type="text" onKeyUp={handleInput}/>
                            </form>
                            <div className={styles.input_icons_container}>
                                <button className={styles.input_icon} onClick={clickKeyboard}>
                                    <img src={keyboardIMG} alt="keyboardIcon" />
                                </button>
                                <button id='input_eraser' className={`${styles.input_icon} input_hidden`} onClick={removeInputValue}>
                                    <svg width="20" height="20">
                                        <path d={CLOSE_MARK}></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button className={`${styles.search_icon} ${styles.btns}`} onClick={onSearch} title='검색'>
                            <svg width="24" height="24">
                                <path d={SEARCH_MARK}></path>
                            </svg>
                        </button>
                    </div>
                    <button className={`${styles.voiceBtn} ${styles.btns}`} title='음성으로 검색'>
                        <svg width="24" height="24">
                            <path d={VOICE_MARK}></path>
                        </svg>
                    </button>
                </div>
                <div className={styles.right}>
                    <button className={`${styles.right_btns} ${styles.btns}`} title='만들기'>
                        <svg width="24" height="24">
                            <path d={ADD_VIDEO_MARK}></path>
                        </svg>
                    </button>
                    <button className={`${styles.right_btns} ${styles.btns}`} title='YouTube 앱'>
                        <svg width="24" height="24">
                            <path d={GRID_MARK}></path>
                        </svg>
                    </button>
                    <button className={`${styles.right_btns} ${styles.btns}`} title='알림'>
                        <svg width="24" height="24">
                            <path d={BELL_MARK}></path>
                        </svg>
                    </button>
                    {
                        user.uid &&
                        <>
                            <button className={styles.thumbnail_container} onClick={handleModal}>
                                <img 
                                    src={user.url}
                                    onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)} 
                                    alt="thumbnail" 
                                />
                            </button>
                            <div id='userModal' className={styles.userModal_container}>
                                <div className={styles.modal_top}>
                                    <img src={user.url} alt="thumbnail" />
                                    <span>{user.name}</span>
                                </div>
                                <div className={styles.modal_bottom}>
                                    <div className={styles.modal_content} onClick={onLogOut}>
                                        <div className={styles.modal_icons}>
                                            <svg viewBox="0 0 24 24">
                                                <path d={EXIT_MARK}></path>
                                            </svg>
                                        </div>
                                        <span>로그아웃</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        !user.uid &&
                        <button className={`${styles.right_btns} ${styles.login_btn} g-signin2`} data-onsuccess="onSignIn" onClick={onLogIn}>
                            <svg width="24" height="24">
                                <path d={USER_MARK}></path>
                            </svg>
                            <span>로그인</span>
                        </button>
                    }
                </div>
            </div>
        </header>
    );
});

export default Header;