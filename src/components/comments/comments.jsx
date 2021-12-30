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
            <ul className={styles.comments}>
                {this.props.comments.map(({snippet : {topLevelComment}}) => {
                    const textHTML = {__html: topLevelComment.snippet.textDisplay}
                    return (
                        <li key={topLevelComment.id} className={styles.comment_container}>
                            <div className={styles.user_info}>
                            </div>
                            <div className={styles.comment_info}>
                                <div className={styles.comment_top}>
                                    <p className={styles.author_name}>{topLevelComment.snippet.authorDisplayName}</p>
                                    <span className={styles.comment_date}>{`${this.getDiffDate(topLevelComment.snippet.publishedAt)} 전`}</span>
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