import React, { forwardRef } from 'react';
import Icon from 'components/Icon/Icon';
import styles from './IconButton.module.scss';

const IconButton = forwardRef(({ className, titleName, text, def, onClick, dataFunc }, ref) => {
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
});

export default IconButton;