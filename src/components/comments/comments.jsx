import React, { Component } from 'react';
import styles from './comments.module.css';

class Comments extends Component {
    getDiffDate = (publishDate) => {
        const now = Date.now();
        publishDate = Date.parse(publishDate);
        return this.props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

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
                                    <span className={styles.comment_date}>{`${this.getDiffDate(comment.snippet.topLevelComment.snippet.publishedAt)} 전`}</span>
                                </div>
                                <span dangerouslySetInnerHTML={textHTML}></span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default Comments;