import React, { PureComponent } from 'react';
import { createRef } from 'react/cjs/react.development';
import Comment from '../comment/comment';
import styles from './comments_container.module.css';

class CommentsContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.lastCommentRef = createRef();
        this.observer = "";
    }

    setObserve = () => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1
        }

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.catchObserver();
            }
        },options)
        this.observer.observe(this.lastCommentRef.current);
    }

    catchObserver = () => {
        this.props.getMoreComments();
        this.observer.disconnect();
    }

    render() {
        return (
            <>
                <div className={styles.comments_top}>
                    <h3>{`댓글 ${Number(this.props.commentCount).toLocaleString("en")} 개`}</h3>
                </div>
                <ul className={styles.comments}>
                    {this.props.comments.map(({snippet : {topLevelComment}}, index) => {
                        if (index === this.props.comments.length - 1) {
                            return (
                                <Comment
                                    key={topLevelComment.id}
                                    topLevelComment = {topLevelComment}
                                    calcDiffDate={this.props.calcDiffDate}
                                    lastCommentRef={this.lastCommentRef}
                                    setObserve={this.setObserve}
                                />
                            );
                        }
                        return(
                            <Comment
                                key={topLevelComment.id}
                                topLevelComment = {topLevelComment}
                                calcDiffDate={this.props.calcDiffDate}
                            />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default CommentsContainer;