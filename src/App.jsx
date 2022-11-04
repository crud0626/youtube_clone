import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HeaderContainer from 'components/Header/HeaderContainer';
import Home from 'pages/Home';
import Watch from 'pages/Watch';
import Results from 'pages/Results';

const App = () => (
  <Provider store={store}>
    <HeaderContainer />
    <main>
        <Routes>
          <Route 
              path='/watch'
              element={
                <Watch /> 
              }
          />
          <Route 
              path='/'
              element={
                <Home />
              }
          />
          <Route 
            path='/results'
            element={
              <Results />
            }
          />
        </Routes>
    </main>
  </Provider>
);

export default App;