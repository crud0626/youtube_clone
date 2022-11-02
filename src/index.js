import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import YoutubeAPI from './service/youtube-api';
import Calculator from './utils/calculator';

const youtubeAPI = new YoutubeAPI();
const calculator = new Calculator();

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App 
        youtubeAPI = {youtubeAPI}
        calculator = {calculator}
      />
    </BrowserRouter>
  </React.StrictMode>
);