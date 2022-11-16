import React from 'react';
import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import RightBtnWrapper from './RightBtnWrapper';
import { LOGO_IMG } from 'assets';

const HeaderPresenter = ({ onClickLogo }) => {
    return (
        <header>
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
                <SearchBar />
                <RightBtnWrapper />
            </div>
        </header>
    );
};

export default HeaderPresenter;