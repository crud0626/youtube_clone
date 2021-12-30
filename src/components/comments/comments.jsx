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
                            <a href={topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_thumbnail}>
                                <img src={topLevelComment.snippet.authorProfileImageUrl} alt="author thumbnail" />
                            </a>
                            <div className={styles.comment_info}>
                                <div className={styles.comment_top}>
                                    <a href={topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_name}>{topLevelComment.snippet.authorDisplayName}</a>
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