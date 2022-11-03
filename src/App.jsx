import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from 'components/Header/Header';
import Home from 'pages/Home';
import Watch from 'pages/Watch';
import Results from 'pages/Results';

const App = ({ calculator }) => {
  const onSearchVideo = async (query) => {
    // // setIsVideoLoading(true);

    // await youtubeAPI.searchVideo(query)
    // .then(({ items, nextPageToken }) => {
    //   // setVideos({
    //   //   items,
    //   //   nextPageToken: nextPageToken ? nextPageToken : ""
    //   // });
    //   setSelectedVideo({});
    //   setIsSearched(true);
    //   setSearchQuery(query);
    //   navigate(`results?search_query=${query}`);
    // })
    // .finally(() => {
    //   // setIsVideoLoading(false);
    // });
  };

    return (
      <Provider store={store}>
        <Header
          onSearchVideo={onSearchVideo}
        />
        <main>
            <Routes>
              <Route 
                  path='/watch'
                  element={
                      <Watch 
                        calculator={calculator}
                      />
                  }
              />
              <Route 
                  path='/'
                  element={
                  <Home 
                    calculator={calculator}
                  />
                  }
              />
              <Route 
                path='/results'
                element={
                  <Results 
                    calculator={calculator}
                  />
                }
              />
            </Routes>
        </main>
      </Provider>
    );
};

export default App;