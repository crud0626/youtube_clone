import './app.css';

import React, { Component } from 'react';
import Header from './components/header/header';
import VideoSection from './components/videosection/videosection';
import PlayLists from './components/playlists/playlists';

class App extends Component {
  state = {
    videos: [],
    current: {}
  }
  // contentDetails.duration | 플레이시간
  // statistics.commentCount | 댓글 수.
  // statistics.dislikeCount | 싫어요 수
  // statistics.likeCount | 좋아요
  // statistics.viewCount | 조회수

  componentDidMount() {
    this.props.youtube.getMostPopular()
    .then(videos => this.setState({videos}));
  }

  searchVideos = (query) => {
    this.props.youtube.getSearchVideos(query)
    .then(videos => this.setState({videos, current: {}}))
  }

  clickedVideo = (video) => {
    this.setState({current: video});
  }

  render() {
    return (
      <>
      <Header 
        onSearch = {this.searchVideos}
      />
      <section>
        {
        Object.keys(this.state.current).length !== 0 && 
        <VideoSection currentVid={this.state.current} />
        }
        
          <PlayLists 
            videos={this.state.videos}
            clickedVideo={this.clickedVideo}
          />
      </section>
      </>
    );
  }
}

export default App;
