import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

// fetch
// import YoutubeFetch from './service/youtube-fetch';
// const youtubeFetch = new YoutubeFetch(process.env.REACT_APP_YOUTUBE_API_KEY);

// Axios
import YoutubeAxios from './service/youtube-axios';
const youtubeAxios = new YoutubeAxios(process.env.REACT_APP_YOUTUBE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App 
      youtube = {youtubeAxios}
    />
  </React.StrictMode>,
  document.getElementById('root')
);