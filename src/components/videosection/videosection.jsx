import React, { Component } from 'react';
import styles from './videosection.module.css';

class VideoSection extends Component {
    render() {
        console.log(this.props.currentVid.snippet.description);
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
                </div>
            </>
        );
    }
}

export default VideoSection;