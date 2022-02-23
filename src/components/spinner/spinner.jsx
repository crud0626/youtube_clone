import React, { Component } from 'react';
import styles from './spinner.module.css';

class Spinner extends Component {
    render() {
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
    }
}

export default Spinner;