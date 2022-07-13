import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import "./App.scss";
import Header from './components/Header/Header';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Results from "./pages/Results";

const App = ({ youtubeAPI, calculator, authService }) => {
  const [videos, setVideos] = useState({
    items: [],
    nextPageToken: ""
  });
  const [selectedVideo, setSelectedVideo] = useState({});
  const [comments, setComments] = useState({
    items: [],
    nextPageToken: "" 
  });
  const [isSearched, setIsSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.uid) {
      const resData = authService.checkUser();
      if (resData) setUserData(resData);
    }

    initVideo();
  }, []);

  const onLogIn = async () => {
    await authService.login()
    .then(data => setUserData(data));
  }

  const onLogOut = async () => {
    await authService.logOut()
    .then(() => {
      setUserData({});
      alert("로그아웃 되었습니다.");
    });
  }
  
  const onSearchVideo = async (query) => {
    setIsVideoLoading(true);

    await youtubeAPI.searchVideo(query)
    .then(({ items, nextPageToken }) => {
      setVideos({
        items,
        nextPageToken: nextPageToken ? nextPageToken : ""
      });
      setSelectedVideo({});
      setIsSearched(true);
      setSearchQuery(query);
      navigate(`results?search_query=${query}`);
    })
    .finally(() => {
      setIsVideoLoading(false);
    });
  };

  const getMoreVideo = async () => {
    setIsVideoLoading(true);

    const videoData = [...videos.items];

    isSearched
    ? await youtubeAPI.searchVideo(searchQuery, videos.nextPageToken) 
    : await youtubeAPI.getMostPopular(videos.nextPageToken)
    .then(({ items, nextPageToken }) => {
      videoData.push(...items);
      setVideos({ items: videoData, nextPageToken });
    })
    .finally(() => setIsVideoLoading(false));
  }

  const onClickVideo = async (video) => {
    await youtubeAPI.getCurrentVidInfo(video)
    .then(({ info, comments }) => {
      setSelectedVideo(info);
      setComments({
        items: comments.items,
        nextPageToken: comments.nextPageToken
      });
      navigate(`/watch?v=${video.id}`);
    });
  };

  const getMoreComment = async () => {
    await youtubeAPI.getComment(selectedVideo.id, comments.nextPageToken)
    .then(({ items, nextPageToken }) => {
      const data = [...comments.items];
      data.push(...items);

      setComments({ items: data, nextPageToken });
    });
  }

  const initVideo = async () => {
    const dummyVideos = new Array(24).fill("");
    setVideos({
      items: dummyVideos,
      nextPageToken: ""
    });
    setIsVideoLoading(true);

    await youtubeAPI.getMostPopular()
    .then(({ items, nextPageToken }) => {
      setVideos({ items, nextPageToken });
      setSelectedVideo({});
      setIsSearched(false);
      setSearchQuery("");
    })
    .finally(() => setIsVideoLoading(false));
  }

    return (
        <>
        <Header
          initVideo={initVideo} 
          onSearchVideo={onSearchVideo}
          onLogIn={onLogIn}
          onLogOut={onLogOut}
          userData={userData}
        />
        <section>
            <Routes>
              <Route 
                  path='/watch'
                  element={
                      <Watch 
                        userData={userData}
                        selectedVideo={selectedVideo} 
                        comments={comments}
                        videos={videos} 
                        calculator={calculator}
                        getMoreComment={getMoreComment}
                        onClickVideo={onClickVideo}
                        getMoreVideo={getMoreVideo}
                        youtube={youtubeAPI}
                        onLogIn={onLogIn}
                      />
                  }
              />
              <Route 
                  path='/'
                  element={
                  <Home 
                      videos={videos}
                      onClickVideo={onClickVideo}
                      calculator={calculator}
                      getMoreVideo={getMoreVideo}
                      isVideoLoading={isVideoLoading}
                  />
                  }
              />
              <Route 
                path='/results'
                element={
                  <Results 
                    videos={videos}
                    onClickVideo={onClickVideo}
                    calculator={calculator}
                    getMoreVideo={getMoreVideo}
                  />
                }
              />
            </Routes>
        </section>
        </>
    );
};

export default App;