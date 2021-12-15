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

  // 왜 여기에 하위컴포넌트에서는 못부르고 여기서만 가능하지? 여기서도 prop으로 받는건데?
  // videosection쪽 좋아요 하는거 안됨. 조회수는 잘되는데 왜 videosection쪽에서 안되지?
  // 안될꺼면 playlists에서도 안되야지;
  convertCount = (num) => {
    console.log(num);
    return this.props.calc.convertCount(num);
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
          convertCount={this.convertCount}
        />
        }
          <PlayLists 
            videos={this.state.videos}
            clickedVideo={this.clickedVideo}
            selected={selected}
            convertCount={this.convertCount}
          />
      </section>
      </>
    );
  }
}

export default App;
