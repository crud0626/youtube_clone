import React, { Component } from 'react';
import styles from './comments.module.css';

class Comments extends Component {
    render() {
        console.log(this.props.comments[0].snippet.topLevelComment.snippet.publishedAt);
        let test = new Date(this.props.comments[0].snippet.topLevelComment.snippet.publishedAt);
        // 문자열
        console.log(`${test.getFullYear()}. ${test.getMonth()}. ${test.getDate()}`);
        return (
            <ul className={styles.comment_container}>
                {this.props.comments.map((comment) => {
                    return (
                        // key설정필요.
                        <li className="comment">
                            <div className="user_info">
                                
                            </div>
                            <div className="comment_info">
                                <div className={styles.comment_top}>
                                    <p className={styles.author_name}>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                                    <span className={styles.comment_date}>{comment.snippet.topLevelComment.snippet.publishedAt}</span>
                                </div>
                                <span className={styles.comment_text}>{comment.snippet.topLevelComment.snippet.textDisplay}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Comments;