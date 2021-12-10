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
  // contentDetails.duration | 플레이시간
  // statistics.commentCount | 댓글 수.
  // statistics.dislikeCount | 싫어요 수
  // statistics.likeCount | 좋아요
  // statistics.viewCount | 조회수
  // search에서 못 받아오고 있음.

  componentDidMount() {
    this.props.youtube
    .getMostPopular()
    .then(videos => this.setState({videos}));
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

  render() {
    return (
      <>
      <Header 
        onSearch = {this.searchVideos}
      />
      <section>
        {
        Object.keys(this.state.currentVid).length !== 0 && 
        <VideoSection 
          currentVid={this.state.currentVid} 
          comments={this.state.comments}
        />
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
