import React, { Component } from 'react';
import Comments from '../comments/comments';
import styles from './videosection.module.css';

class VideoSection extends Component {
    displayVideoDate = () => {
        const date = new Date(this.props.currentVid.snippet.publishedAt);
        return `${date.getFullYear()}. ${date.getMonth()}. ${date.getDate()}.`;
    }

    convertViewCount = () => {
        const count = parseInt(this.props.currentVid.statistics.viewCount);
        return count.toLocaleString("en");
    }

    render() {
        console.log(this.props.currentVid.statistics.viewCount);
        return (
            <div className={styles.videosection_container}>
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
                </div>
                <div className={styles.video_info_container}>
                    <h3 className={styles.video_title}>{this.props.currentVid.snippet.title}</h3>
                    <div className={styles.video_info}>
                        <span>{`${this.convertViewCount()}회`}</span>
                        <span>{" • "}</span>
                        <span>{this.displayVideoDate()}</span>
                    </div>
                </div>
                <div className='separateLine'></div>
                {/* 얘네도 div로 묶을까 고민중. */}
                <span className={styles.channel}>{this.props.currentVid.snippet.channelTitle}</span>
                <pre className={styles.video_desc}>{this.props.currentVid.snippet.description}</pre>
                <div className='separateLine'></div>
                <Comments 
                    comments={this.props.comments}
                />
            </div>
        );
    }
}

export default VideoSection;