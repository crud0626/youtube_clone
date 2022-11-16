import React from 'react';
import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import RightBtnWrapper from './RightBtnWrapper';
import logoIMG from 'assets/logo.png';

const HeaderPresenter = ({ onClickLogo }) => {
    return (
        <header>
            <div className={styles.container}>
                <div 
                    className={styles.left} 
                    onClick={() => onClickLogo()}
                >
                    <img 
                        src={logoIMG} 
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