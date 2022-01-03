import YoutubeAxios from './service/youtube-axios';
import Calculator from './service/calculator';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

const youtubeAxios = new YoutubeAxios();
const calc = new Calculator();

ReactDOM.render(
  <React.StrictMode>
    <App 
      youtube = {youtubeAxios}
      calc = {calc}
    />
  </React.StrictMode>,
  document.getElementById('root')
);