import React, { PureComponent } from 'react';
import Comment from '../comment/comment';
import styles from './comments_container.module.css';

class CommentsContainer extends PureComponent {    
    render() {
        return (
            <>
                <div className={styles.comments_top}>
                    <h3>{`댓글 ${Number(this.props.commentCount).toLocaleString("en")} 개`}</h3>
                </div>
                <ul className={styles.comments}>
                    {this.props.comments.map(({snippet : {topLevelComment}}) => (
                        <Comment
                            key={topLevelComment.id}
                            topLevelComment = {topLevelComment}
                            calcDiffDate={this.props.calcDiffDate}
                        />
                    ))}
                </ul>
            </>
        );
    }
}

export default CommentsContainer;