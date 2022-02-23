import React, { PureComponent } from 'react';
import Comment from '../comment/comment';
import Spinner from '../spinner/spinner';
import styles from './comments_container.module.css';

class CommentsContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.lastCommentRef = React.createRef();
        this.observer = "";
    }

    state = {
        loading: false
    };

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
        this.setState({loading: true});
        this.props.getMoreComments()
        .then(() => this.setState({loading: false}))
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
                    {this.state.loading && <Spinner />}
                </ul>
            </>
        );
    }
}

export default CommentsContainer;