import React, { Component } from 'react';
import styles from './videosection.module.css';

class VideoSection extends Component {
    render() {
        return (
            <>
                <div className={styles.videoplayer_container}>
                    <iframe 
                        className={styles.videoplayer}
                        id="ytplayer" 
                        type="text/html" 
                        title='videoplayer'
                        width="720" height="405"
                        src={`https://www.youtube.com/embed/${this.props.currentVid.id}`}
                        frameBorder="0" 
                        allowFullScreen
                    ></iframe>
                    <div className={styles.video_info}>
                        <h3 className={styles.video_title}>{this.props.currentVid.snippet.title}</h3>
                        <span className={styles.video_date}>{this.props.currentVid.snippet.publishedAt}</span>
                    </div>
                    <div className='separateLine'></div>
                    {/* 얘네도 div로 묶을까 고민중. */}
                    <span className={styles.channel}>{this.props.currentVid.snippet.channelTitle}</span>
                    <pre className={styles.video_desc}>{this.props.currentVid.snippet.description}</pre>
                    <div className='separateLine'></div>
                    <ul className="comment_container">
                        {/* comments는 컴포넌트 분리. */}
                        {this.props.comments.map((comment) => (
                            // CSS는 아직 안함.
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
                </div>
            </>
        );
    }
}

export default VideoSection;