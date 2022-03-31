import YoutubeAxios from './service/youtube-axios';
import Calculator from './service/calculator';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './service/auth';

const youtubeAxios = new YoutubeAxios();
const calc = new Calculator();
const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App 
        youtube = {youtubeAxios}
        calc = {calc}
        authService = {authService}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);