import React, { memo } from 'react';
import styles from './spinner.module.css';

const Spinner = memo((props) => {
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
});

export default Spinner;