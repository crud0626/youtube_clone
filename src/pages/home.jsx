import React, { Component } from 'react';
import PlaylistContainer from '~/components/playlist_container/playlist_container';

class Home extends Component {
    render() {
        return (
            <PlaylistContainer 
              videos={this.props.videos}
              clickedVideo={this.props.clickedVideo}
              selected={this.props.selected}
              convertCount={this.props.convertCount}
              calcDiffDate={this.props.calcDiffDate}
              convertVideoDuration={this.props.convertVideoDuration}
              getMoreVideos={this.props.getMoreVideos}
            />
        );
    }
}

export default Home;