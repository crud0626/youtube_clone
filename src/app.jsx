import './App.css';

import React, { Component } from 'react';
import Header from './components/header/header';
import VideoSection from './components/videosection/videosection';
import PlaylistContainer from './components/playlist_container/playlist_container';


class App extends Component {
  state = {
    videos: [],
    currentVid: {},
    comments: [],
    isSearched: false,
    videoNextToken: "",
    commentNextToken: "",
    searchQuery: ""
  }

  componentDidMount() {
    this.moveToMain();
  }

  searchVideos = (query) => {
    this.props.youtube
    .getSearchVideos(query)
    .then(response => this.setState({
      videos: response.items,
      currentVid: {},
      isSearched: true,
      videoNextToken: response.nextPageToken,
      searchQuery: query
    }))
  }

  getMoreVideos = () => {
    if (this.state.isSearched) {
      this.props.youtube
      .getSearchVideos(this.state.searchQuery, this.state.videoNextToken)
      .then(response => {
        const data = [...this.state.videos];
        data.push(...response.items);
        this.setState({
          videos: data,
          videoNextToken: response.nextPageToken
        })
      })
    } else {
      this.props.youtube
      .getMostPopular(this.state.videoNextToken)
      .then(response => {
        const data = [...this.state.videos];
        data.push(...response.items);
        this.setState({
          videos: data,
          videoNextToken: response.nextPageToken
        })
      })
    }
  }

  clickedVideo = (video) => {
    this.props.youtube
    .getCurrentVidInfo(video)
    .then(response => this.setState({
      currentVid: response.info,
      comments: response.comments.items,
      commentNextToken: response.comments.nextPageToken
    }))
    .catch(console.log(`Cannot load datas`))
  }

  getMoreComments = () => {
    this.props.youtube
    .getComment(this.state.currentVid.id, this.state.commentNextToken)
    .then(response => {
      const comments = [...this.state.comments];
      comments.push(...response.items);
      this.setState({
        comments: comments,
        commentNextToken: response.nextPageToken
      })
    })
  }

  moveToMain = () => {
    this.props.youtube
    .getMostPopular()
    .then(response => this.setState({
      videos: response.items, 
      currentVid: {}, 
      isSearched: false,
      videoNextToken: response.nextPageToken,
      searchQuery: ""
    }))
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
            comments={this.state.comments}
            convertCount={this.convertCount}
            calcDiffDate={this.calcDiffDate}
            getMoreComments={this.getMoreComments}
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
