import React, { Component } from 'react';
import styles from './header.module.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
       
    onSearch = (e) => {
        e.preventDefault();
        this.props.onSearch(this.inputRef.current.value);
    }

    render() {
        return (
            <header>
                <div className={styles.left}>
                    <img src="./images/logo.png" alt="mainlogo"/>
                    <span>Youtube</span>
                </div>
                <div className={styles.center}>
                    <form className={styles.searchbar_container} onSubmit={this.onSearch}>
                        <div className={styles.searchbar}>
                            <input ref={this.inputRef} type="text" />
                            <button className={styles.input_icon}>
                                <i className="fas fa-keyboard"></i>
                            </button>
                        </div>
                        <button className={styles.search_icon}>
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" alt='searchButton'/>
                        </button>
                    </form>
                    <button className={styles.voiceBtn}>
                        <i className="fas fa-microphone"></i>
                    </button>
                </div>
                <div className={styles.right}>
                    <button className={styles.btns}>
                        <i className="fas fa-video"></i>
                    </button>
                    <button className={styles.btns}>
                        <i className="fas fa-th"></i>
                    </button>
                    <button className={styles.btns}>
                        <i className="far fa-bell"></i>
                    </button>
                    <button className={styles.btns}>
                        <i className="far fa-user-circle"></i>
                    </button>
                </div>
        </header>
        );
    }
}

export default Header;