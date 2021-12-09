import './app.css';

import React, { Component } from 'react';
import Header from './components/header/header';
import VideoSection from './components/videosection/videosection';
import PlayList from './components/playlist/playlist';

class App extends Component {
  state = {
    vidoes: [],
    current: []
  }

  componentDidMount() {
    // let api = process.env.REACT_APP_YOUTUBE_API_KEY;
  }

  getSearch = (text) => {
    // requestOptions 나중에 따로 뺄 예정.
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    // 데이터 받아오는거 확인.
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=december&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <>
      <Header 
        onSearch = {this.getSearch}
      />
      <section>
        <VideoSection />
        <PlayList />
      </section>
      </>
    );
  }
}

export default App;
