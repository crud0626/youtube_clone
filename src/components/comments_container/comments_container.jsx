import React, { PureComponent } from 'react';
import Comment from '../comment/comment';
import styles from './comments_container.module.css';

class CommentsContainer extends PureComponent {
    
    componentDidMount = () => {
        const spans = document.querySelectorAll('#span');
        for (let i = 0; i < spans.length; i++) {
            console.log(spans[i].offsetHeight);
        }
    }


    render() {
        return (
            <ul className={styles.comments}>
                {this.props.comments.map(({snippet : {topLevelComment}}) => (
                    <Comment
                        topLevelComment = {topLevelComment}
                        calcDiffDate={this.props.calcDiffDate}
                    />
                ))}
            </ul>
        );
    }
}

export default CommentsContainer;