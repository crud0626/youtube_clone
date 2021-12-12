import React, { Component } from 'react';

class Comments extends Component {
    render() {
        return (
            <ul className="comment_container">
                {this.props.comments.map((comment) => (
                    <li className="comment">
                        <div className="user_info">
                            
                        </div>
                        <div className="comment_info">
                            <div className="comment_top">
                                {/* author랑 날짜 */}
                                <p>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                                <span>{comment.snippet.topLevelComment.snippet.publishedAt}</span>
                            </div>
                            <span>{comment.snippet.topLevelComment.snippet.textDisplay}</span>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Comments;