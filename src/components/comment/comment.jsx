import React, { PureComponent } from 'react';
import styles from './comment.module.css';

class Comment extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            textOver: false
        };
    }

    getDiffDate = () => {
        let publishDate = this.props.topLevelComment.snippet.publishedAt;
        const now = Date.now();
        publishDate = Date.parse(publishDate);
        return this.props.calcDiffDate(parseInt((now - publishDate) / 60000));
    }

    onClickToggle = (event) => {
        const target = event.target.previousSibling;
        console.log(target);
        if (target.matches("#expander")) {
            target.classList.remove("expander");
            target.classList.add("shortcut");
            target.id = "shortcut";
            event.target.innerText = "자세히 보기";
            return;
        }
        target.classList.remove("shortcut");
        target.classList.add("expander");
        target.id = "expander";
        event.target.innerText = "간략히";
        return;
    }

    componentDidMount = () => {
        if (this.ref.current.clientHeight < this.ref.current.scrollHeight) {
            !this.state.textOver && this.setState({textOver: true});
        }
    }

    render() {
        const textHTML = {__html: this.props.topLevelComment.snippet.textDisplay};
        return (
            <li key={this.props.topLevelComment.id} className={styles.comment_container}>
                <a href={this.props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_thumbnail}>
                    <img src={this.props.topLevelComment.snippet.authorProfileImageUrl} alt="author thumbnail" />
                </a>
                <div className={styles.comment_info}>
                    <div className={styles.info_top}>
                        <a href={this.props.topLevelComment.snippet.authorChannelUrl} target="_blank" rel='noreferrer' className={styles.author_name}>{this.props.topLevelComment.snippet.authorDisplayName}</a>
                        <span className={styles.comment_date}>{`${this.getDiffDate()} 전`}</span>
                    </div>
                    <div className={styles.info_bottom}>
                        <div ref={this.ref} className={`${styles.span_container} shortcut`}>
                            <span dangerouslySetInnerHTML={textHTML}></span>
                        </div>
                        {this.state.textOver && <button className="toggle" onClick={this.onClickToggle}>자세히 보기</button>}
                    </div>
                </div>
            </li>
        );
    }
}

export default Comment;