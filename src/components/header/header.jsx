import React, { Component } from 'react';
import styles from './header.module.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.eraser = document.querySelector("button#input_eraser");
    }

    onSearch = (e) => {
        e.preventDefault();
        this.inputRef.current.value.search(/\S/g) === 0 &&
        this.props.onSearch(this.inputRef.current.value);
    }

    handleInput = () => {
        if (this.inputRef.current.value.length === 0) {
            const eraser = document.querySelector("button#input_eraser");
            eraser.classList.add("input_hidden");
        } else {
            const eraser = document.querySelector("button#input_eraser");
            eraser.classList.remove("input_hidden");
        }
    }

    removeInputValue = () => {
        const eraser = document.querySelector("button#input_eraser");
        eraser.classList.add("input_hidden");
        this.inputRef.current.value = "";
    }

    render() {
        return (
            <header>
                <div className={styles.left} onClick={this.props.moveToMain}>
                    <img src="./images/logo.png" alt="mainlogo"/>
                    <span>Youtube</span>
                </div>
                <div className={styles.center}>
                    <form className={styles.searchbar_container} onSubmit={this.onSearch}>
                        <div className={styles.searchbar}>
                            <input ref={this.inputRef} placeholder='검색' type="text" onKeyUp={this.handleInput}/>
                            <button className={styles.input_icon}>
                                <i className="fas fa-keyboard"></i>
                            </button>
                            <button id='input_eraser' className={`${styles.input_icon} input_hidden`} onClick={this.removeInputValue}>
                                <i className="fas fa-times"></i>
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