import './App.css';

import React, { Component } from 'react';
import Header from './components/header/header';
import VideoSection from './components/videosection/videosection';
import PlaylistContainer from './components/playlist_container/playlist_container';


class App extends Component {
  state = {
    videos: [],
    currentVid: {},
    comments: {},
    nextPageToken: ""
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

  getMoreVideos = () => {
    this.props.youtube
    .getNextVideos(this.state.nextPageToken)
    .then(response => {
      const data = [...this.state.videos];
      data.push(response.items);
      this.setState({
        videos: data,
        nextPageToken: response.nextPageToken
      })
    })
  }

  clickedVideo = (video) => {
    this.props.youtube
    .getCurrentVidInfo(video)
    .then(currentVid => this.setState({currentVid}))
    .catch(console.log(`Cannot load datas`))
  }

  moveToMain = () => {
    this.props.youtube
    .getMostPopular()
    .then(response => this.setState({videos: response.items, currentVid: {}, nextPageToken: response.nextPageToken}))
    .catch(console.log(`Cannot load datas`))
  }

  // 왜 여기에 하위컴포넌트에서는 못부르고 여기서만 가능하지? 여기서도 prop으로 받는건데?
  convertCount = (num) => {
    return this.props.calc.convertCount(num);
  }

  calcDiffDate = (diffMinutes) => {
    return this.props.calc.getDiffTime(diffMinutes);
  }

  convertVideoDuration = (time) => {
    return this.props.calc.convertVideoDuration(time);
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
            comments={this.state.currentVid.comments}
            convertCount={this.convertCount}
            calcDiffDate={this.calcDiffDate}
          />
          }
            <PlaylistContainer 
              videos={this.state.videos}
              clickedVideo={this.clickedVideo}
              selected={selected}
              convertCount={this.convertCount}
              calcDiffDate={this.calcDiffDate}
              convertVideoDuration={this.convertVideoDuration}
              getMoreVideos={this.getMoreVideos}
            />
        </section>
        <div className="App">
          <div className="circle"></div>
        </div>
      </>
    );
  }
}

export default App;
