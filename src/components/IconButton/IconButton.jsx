import React, { forwardRef, memo } from 'react';
import Icon from 'components/Icon/Icon';
import styles from 'styles/iconButton.module.scss';

const IconButton = ({ className, titleName, text, def, onClick, dataFunc }, ref) => {
    return (
        <button 
            ref={ref}
            className={`${className} ${styles.btns}`}
            title={titleName}
            onClick={onClick}
            data-func={dataFunc}
        >
            <Icon def={def}/>
            <span>{text}</span>
        </button>
    );
};

export default memo(forwardRef(IconButton));