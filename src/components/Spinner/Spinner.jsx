import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner_rolling}>
                <div className={styles.ldio}>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;