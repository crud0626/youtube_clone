import React, { forwardRef } from 'react';
import styles from './SearchBar.module.scss';
import { CLOSE_MARK, SEARCH_MARK, VOICE_MARK } from 'constants/iconPath';
import IconButton from 'components/IconButton/IconButton';
import { KEYBOARD_IMG } from 'assets';

const SearchBarPresenter = forwardRef((props, ref) => {
    const { isDisplayEraser, handleEraserBtn, onSearch, onErase } = props;

    return ( 
        <div className={styles.center}>
            <div className={styles.searchbar_container}>
                <div className={styles.searchbar}>
                    <form className={styles.search_form} onSubmit={(e) => onSearch(e)}>
                        <input ref={ref} placeholder='검색' type="text" onKeyUp={() => handleEraserBtn()} />
                    </form>
                    <div className={styles.input_icons_container}>
                        <button className={styles.input_icon} onClick={(e) => e.preventDefault()}>
                            <img src={KEYBOARD_IMG} draggable="false" alt="keyboardIcon" />
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
    );
});

export default SearchBarPresenter;