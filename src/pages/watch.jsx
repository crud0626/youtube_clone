import React, { Component } from 'react';
import PlaylistContainer from '~/components/playlist_container/playlist_container';
import VideoSection from '~/components/videosection/videosection';

class Watch extends Component {
    render() {
        return (
            <>
                <VideoSection
                    currentVid={this.props.currentVid} 
                    comments={this.props.comments}
                    convertCount={this.props.convertCount}
                    calcDiffDate={this.props.calcDiffDate}
                    getMoreComments={this.props.getMoreComments}
                />
                <PlaylistContainer 
                    videos={this.props.videos}
                    clickedVideo={this.props.clickedVideo}
                    selected={this.props.selected}
                    convertCount={this.props.convertCount}
                    calcDiffDate={this.props.calcDiffDate}
                    convertVideoDuration={this.props.convertVideoDuration}
                    getMoreVideos={this.props.getMoreVideos}
                />
            </>
        );
    }
}

export default Watch;