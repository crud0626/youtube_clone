import React from 'react';
import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import RightBtnWrapper from './RightBtnWrapper';
import MobileSearchBar from './MobileSearchBar';
import { LOGO_IMG } from 'assets';

const HeaderPresenter = ({ isMobile, isSearching, onClickLogo }) => {
    return (
        <header>
            {/* 검색 버튼 클릭시 MobileSearchBar 렌더링 */}
            {isSearching && <MobileSearchBar />}
            <div className={styles.container}>
                <div 
                    className={styles.left} 
                    onClick={() => onClickLogo()}
                >
                    <img 
                        src={LOGO_IMG} 
                        draggable="false" 
                        alt="mainlogo"
                    />
                    <h1>YouTube</h1>
                </div>
                {!isMobile && <SearchBar />}
                <RightBtnWrapper />
            </div>
        </header>
    );
};

export default HeaderPresenter;