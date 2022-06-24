import React, { memo } from 'react';
import styles from './spinner.module.scss';

const Spinner = memo(() => {
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