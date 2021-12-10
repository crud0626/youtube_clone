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

  componentDidMount() {
    // 따로 뺄 예정.
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    // 데이터 받아오는거 확인.
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => this.setState({videos: result.items}))
      .catch(error => console.log('error', error));
  }

  getSearch = (text) => {
    // requestOptions 나중에 따로 뺄 예정.
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${text}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => this.setState({videos: result.items}))
      // current 빈 객체로 초기화 해줘야함.
      .catch(error => console.log('error', error));
  }

  clickedVideo = (video) => {
    this.setState({current: video});
  }

  render() {
    return (
      <>
      <Header 
        onSearch = {this.getSearch}
      />
      <section>
        {
        Object.keys(this.state.current).length && 
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
