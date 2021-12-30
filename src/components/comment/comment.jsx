import React, { PureComponent } from 'react';
import styles from './comment.module.css';

class Comment extends PureComponent {
    getDiffDate = () => {
        let publishDate = this.props.topLevelComment.snippet.publishedAt;
        const now = Date.now();
        publishDate = Date.parse(publishDate);
        return this.props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    render() {
        const textHTML = {__html: this.props.topLevelComment.snippet.textDisplay};
        return (
            <li key={this.props.topLevelComment.id} className={styles.comment_container}>
                <a href={this.props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_thumbnail}>
                    <img src={this.props.topLevelComment.snippet.authorProfileImageUrl} alt="author thumbnail" />
                </a>
                <div className={styles.comment_info}>
                    <div className={styles.comment_top}>
                        <a href={this.props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_name}>{this.props.topLevelComment.snippet.authorDisplayName}</a>
                        <span className={styles.comment_date}>{`${this.props.getDiffDate} 전`}</span>
                    </div>
                    <span dangerouslySetInnerHTML={textHTML}></span>
                </div>
            </li>
        );
    }
}

export default Comment;