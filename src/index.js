import YoutubeAxios from './service/youtube-axios';
import Calculator from './utils/calculator';

import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './service/auth';

const youtubeAxios = new YoutubeAxios();
const calc = new Calculator();
const authService = new AuthService();

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App 
        youtube = {youtubeAxios}
        calc = {calc}
        authService = {authService}
      />
    </BrowserRouter>
  </React.StrictMode>
);