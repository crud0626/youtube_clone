import React, { forwardRef } from 'react';
import styles from './MobileSearchBar.module.scss';
import IconButton from 'components/IconButton/IconButton';
import { CLOSE_MARK, LEFT_ARROW_MARK, SEARCH_MARK, VOICE_MARK } from 'constants/iconPath';

const MobileSearchBarPresenter = forwardRef((props, ref) => {
    const { isFillInput, handleInput, handleMobileSearchBar, onErase, onSearch } = props;

    return (
        <div 
            className={styles.overlap_wrapper}
            onClick={(event) => handleMobileSearchBar(event)}
        >
            <div className={styles.wrapper}>
                <IconButton 
                    className={styles.btns}
                    titleName="검색 닫기"
                    def={LEFT_ARROW_MARK}
                    onClick={() => handleMobileSearchBar()}
                />
                {/* search bar 부분 분할 예정 */}
                <div className={styles.searchbar}>
                    <form className={styles.search_form} onSubmit={(e) => onSearch(e)}>
                        <input 
                            ref={ref} 
                            placeholder='YouTube 검색' 
                            type="text"
                            onKeyUp={(e) => handleInput(e)} 
                        />
                    </form>
                    {
                            isFillInput && 
                            <IconButton 
                                className={styles.input_icon}
                                onClick={() => onErase()}
                                def={CLOSE_MARK}
                            />
                    }
                    <IconButton 
                        className={`${styles.search_icon} ${styles.btns}`} 
                        onClick={() => onSearch()} 
                        titleName="검색"
                        def={SEARCH_MARK}
                    />
                </div>
                {
                    !isFillInput &&
                    <IconButton 
                        className={`${styles.voice_btn} ${styles.btns}`} 
                        titleName="음성으로 검색"
                        def={VOICE_MARK}
                    />
                }
            </div>
        </div>
    );
});

export default MobileSearchBarPresenter;