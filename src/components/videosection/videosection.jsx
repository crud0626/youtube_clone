import React, { Component } from 'react';

class VideoSection extends Component {
    render() {
        return (
            <>
                <iframe 
                    id="ytplayer" 
                    type="text/html" 
                    title='videoplayer'
                    width="720" height="405"
                    src="https://www.youtube.com/embed/M7lc1UVf-VE"
                    frameBorder="0" 
                    allowFullScreen
                ></iframe>
            </>
        );
    }
}

export default VideoSection;