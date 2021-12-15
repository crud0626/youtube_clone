import React, { Component } from 'react';
import styles from './comments.module.css';

class Comments extends Component {
    render() {
        return (
            <ul className={styles.comment_container}>
                {this.props.comments.map((comment) => {
                    const textHTML = {__html: comment.snippet.topLevelComment.snippet.textDisplay}
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
                                <span dangerouslySetInnerHTML={textHTML}></span>
                                {/* <span className={styles.comment_text}>{comment.snippet.topLevelComment.snippet.textDisplay}</span> */}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Comments;