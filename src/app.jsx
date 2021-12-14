import './app.css';

import React, { Component } from 'react';
import Header from './components/header/header';
import VideoSection from './components/videosection/videosection';
import PlayLists from './components/playlists/playlists';

class App extends Component {
  state = {
    videos: [],
    currentVid: {},
    comments: {}
  }

  componentDidMount() {
    this.moveToMain();
  }

  searchVideos = (query) => {
    this.props.youtube
    .getSearchVideos(query)
    .then(videos => this.setState({
      videos: videos,
      currentVid: {}
    }))
  }

  clickedVideo = (video) => {
    this.props.youtube
    .getCurrentComment(video.id)
    .then(comments => this.setState({
        comments: comments,
        currentVid: video
      })
    )
  }

  moveToMain = () => {
    this.props.youtube
    .getMostPopular()
    .then(videos => this.setState({videos, currentVid: {}}));
  }

  render() {
    const selected = Object.keys(this.state.currentVid).length !== 0 ? true : false;
    return (
      <>
      <Header
        moveToMain = {this.moveToMain} 
        onSearch = {this.searchVideos}
      />
      <section>
        {
        selected && 
        <VideoSection 
          currentVid={this.state.currentVid} 
          comments={this.state.comments}
        />
        }
          <PlayLists 
            videos={this.state.videos}
            clickedVideo={this.clickedVideo}
            selected={selected}
          />
      </section>
      </>
    );
  }
}

export default App;
