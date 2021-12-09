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
                        src="https://www.youtube.com/embed/M7lc1UVf-VE"
                        frameBorder="0" 
                        allowFullScreen
                    ></iframe>
                    
                </div>
            </>
        );
    }
}

export default VideoSection;