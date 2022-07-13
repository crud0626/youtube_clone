import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import YoutubeAPI from './service/youtube-api';
import Calculator from './utils/calculator';
import AuthService from './service/auth';

const youtubeAPI = new YoutubeAPI();
const calculator = new Calculator();
const authService = new AuthService();

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App 
        youtubeAPI = {youtubeAPI}
        calculator = {calculator}
        authService = {authService}
      />
    </BrowserRouter>
  </React.StrictMode>
);