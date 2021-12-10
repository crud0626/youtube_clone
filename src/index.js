import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

// fetch
import YoutubeFetch from './service/youtube-fetch';
// Axios
// import YoutubeAxios from './components/service/youtube-axios';

const youtubeFetch = new YoutubeFetch(process.env.REACT_APP_YOUTUBE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App 
      youtube = {youtubeFetch}
    />
  </React.StrictMode>,
  document.getElementById('root')
);