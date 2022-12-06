import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { StableNavigateContextProvider } from './hooks/useStableNavigate';
import Header from 'components/Header';
import Home from 'pages/Home';
import Watch from 'pages/Watch';
import Results from 'pages/Results';

const App = () => (
  <StableNavigateContextProvider>
    <Provider store={store}>
      <Header />
      <main>
          <Routes>
            <Route 
                path='/watch'
                element={<Watch />}
            />
            <Route 
                path='/'
                element={<Home />}
            />
            <Route 
              path='/results'
              element={<Results />}
            />
          </Routes>
      </main>
    </Provider>
  </StableNavigateContextProvider>
);

export default App;