import React, { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.scss';

const Header = memo((props) => {
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
            props.onSearch(inputRef.current.value);
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
        await props.moveToMain();
    }

    return (
        <header>
            <div className={styles.container}>
                <div className={styles.left} onClick={clickedLogo}>
                    <img src="./images/logo.png" alt="mainlogo"/>
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
                                    <img src="./images/keyboard.gif" alt="keyboardIcon" />
                                </button>
                                <button id='input_eraser' className={`${styles.input_icon} input_hidden`} onClick={removeInputValue}>
                                    <svg width="20" height="20">
                                        <path d='M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z'></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button className={`${styles.search_icon} ${styles.btns}`} onClick={onSearch} title='검색'>
                            <svg width="24" height="24">
                                <path d='M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z'></path>
                            </svg>
                        </button>
                    </div>
                    <button className={`${styles.voiceBtn} ${styles.btns}`} title='음성으로 검색'>
                        <svg width="24" height="24">
                            <path d='M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z'></path>
                        </svg>
                    </button>
                </div>
                <div className={styles.right}>
                    <button className={`${styles.right_btns} ${styles.btns}`} title='만들기'>
                        <svg width="24" height="24">
                            <path d='M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z M17,6H3v12h14v-6.39l4,1.83V8.56l-4,1.83V6 M18,5v3.83L22,7v8l-4-1.83V19H2V5H18L18,5 z'></path>
                        </svg>
                    </button>
                    <button className={`${styles.right_btns} ${styles.btns}`} title='YouTube 앱'>
                        <svg width="24" height="24">
                            <path d='M16,4v4h4V4H16z M19,7h-2V5h2V7z M16,10v4h4v-4H16z M19,13h-2v-2h2V13z M10,4v4h4V4H10z M13,7h-2V5h2V7z M10,10v4h4v-4H10z M13,13h-2v-2h2V13z M16,16v4h4v-4H16z M19,19h-2v-2h2V19z M10,16v4h4v-4H10z M13,19h-2v-2h2V19z M4,4v4h4V4H4z M7,7H5V5h2V7z M4,10 v4h4v-4H4z M7,13H5v-2h2V13z M4,16v4h4v-4H4z M7,19H5v-2h2V19z'></path>
                        </svg>
                    </button>
                    <button className={`${styles.right_btns} ${styles.btns}`} title='알림'>
                        <svg width="24" height="24">
                            <path d='M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M20,17.35V19H4v-1.65l2-1.88v-5.15c0-2.92,1.56-5.22,4-5.98V3.96 c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96l0,0.39c2.44,0.75,4,3.06,4,5.98v5.15L20,17.35z M19,17.77l-2-1.88v-5.47 c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C8.15,6.11,7,7.99,7,10.42v5.47l-2,1.88V18h14V17.77z'></path>
                        </svg>
                    </button>
                    {
                        props.user.uid &&
                        <>
                            <button className={styles.thumbnail_container} onClick={handleModal}>
                                <img src={props.user.url} alt="thumbnail" />
                            </button>
                            <div id='userModal' className={styles.userModal_container}>
                                <div className={styles.modal_top}>
                                    <img src={props.user.url} alt="thumbnail" />
                                    <span>{props.user.name}</span>
                                </div>
                                <div className={styles.modal_bottom}>
                                    <div className={styles.modal_content}>
                                        <div className={styles.modal_icons}>
                                            <svg viewBox="0 0 24 24">
                                                <path d='M20,3v18H8v-1h11V4H8V3H20z M11.1,15.1l0.7,0.7l4.4-4.4l-4.4-4.4l-0.7,0.7l3.1,3.1H3v1h11.3L11.1,15.1z'></path>
                                            </svg>
                                        </div>
                                        <span onClick={props.onLogOut}>로그아웃</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {
                        !props.user.uid &&
                        <button className={`${styles.right_btns} ${styles.login_btn} g-signin2`} data-onsuccess="onSignIn" onClick={props.onLogIn}>
                            <svg width="24" height="24">
                                <path d='M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,3c4.96,0,9,4.04,9,9 c0,1.42-0.34,2.76-0.93,3.96c-1.53-1.72-3.98-2.89-7.38-3.03C14.57,12.6,16,10.97,16,9c0-2.21-1.79-4-4-4C9.79,5,8,6.79,8,9 c0,1.97,1.43,3.6,3.31,3.93c-3.4,0.14-5.85,1.31-7.38,3.03C3.34,14.76,3,13.42,3,12C3,7.04,7.04,3,12,3z M9,9c0-1.65,1.35-3,3-3 s3,1.35,3,3c0,1.65-1.35,3-3,3S9,10.65,9,9z M12,21c-3.16,0-5.94-1.64-7.55-4.12C6.01,14.93,8.61,13.9,12,13.9 c3.39,0,5.99,1.03,7.55,2.98C17.94,19.36,15.16,21,12,21z'></path>
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