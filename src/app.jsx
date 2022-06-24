import "./App.scss";

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home';
import Watch from './pages/watch';
import Results from "./pages/results";
import { unstable_batchedUpdates } from "react-dom";

const App = (props) => {
  const [videos, setVideos] = useState({
    items: [],
    nextToken: ""
  });
  const [currentVid, setCurrentVid] = useState({});
  const [comments, setComments] = useState({
    items: [],
    nextToken: ""
  });
  const [isSearched, setIsSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const navigate = useNavigate();

    useEffect(() => moveToMain(), []);

    useEffect(() => {
      if (!user.uid) {
        const userData = props.authService.checkUser();
        if (userData) {setUser(userData)};
      }
    });
    
    const onLogIn = () => {
      props.authService.login()
      .then(response => {
        if (response) {setUser(response)};
      })
    }

    const onLogOut = () => {
        props.authService.logOut()
        .then((response) => {
          if (response) {
            alert("로그아웃 되었습니다.");
            setUser({});
          }
        });
      }
    
    const searchVideos = (query) => {
        setVideos({
          items: [], nextToken: ""
        });

        props.youtube
        .getSearchVideos(query)
        .then(response => {
            setVideos({
              items: response.items,
              nextToken: response.nextPageToken ? response.nextPageToken : ""
            });
            setCurrentVid({});
            setIsSearched(true);
            setSearchQuery(query);
        });

        navigate(`results?search_query=${query}`);
      }

    const getMoreVideos = () => {
        setIsVideoLoading(true);
        
        if (isSearched) {
          return props.youtube
          .getSearchVideos(searchQuery, videos.nextToken)
          .then(response => unstable_batchedUpdates(() => {

            const data = [...videos.items];
            data.push(...response.items);

            setVideos({
              items: data,
              nextToken: response.nextPageToken
            });

            setIsVideoLoading(false);
            }))
        } else {
          return props.youtube
          .getMostPopular(videos.nextToken)
          .then(response => unstable_batchedUpdates(() => {
            const data = [...videos.items];
            data.push(...response.items);
            setVideos({
              items: data,
              nextToken: response.nextPageToken
            });
            setIsVideoLoading(false);
          }));
        }
      }

    const clickedVideo = async (video) => {
        await props.youtube
        .getCurrentVidInfo(video)
        .then(response => {
            setCurrentVid(response.info);

            setComments({
              items: response.comments.items,
              nextToken: response.comments.nextPageToken
            });
        })
        .catch((error) => console.log(error));

        navigate(`/watch?v=${video.id}`);
      };

    const getMoreComments = () => {
      return props.youtube
      .getComment(currentVid.id, comments.nextToken)
      .then(response => {
        const data = [...comments.items];
        data.push(...response.items);

        setComments({
          items: data,
          nextToken: response.nextPageToken
        });
      })
    }

    const getPopularVideos = () => {
      return props.youtube.getMostPopular()
      .then((response) => {
          setVideos({
            items: response.items,
            nextToken: response.nextPageToken
          });
      })
      .catch((err) => console.log(`에러가 발생했습니다 : ${err.message}`));
  }

  const moveToMain = () => {
    const dummyVideos = new Array(24).fill("");
    unstable_batchedUpdates(() => {
      setVideos({
        items: dummyVideos,
        nextToken: ""
      });
      setIsVideoLoading(true);
    });

    return getPopularVideos()
    .then(() => {
        unstable_batchedUpdates(() => {
          setCurrentVid({});
          setIsSearched(false);
          setSearchQuery("");
          setIsVideoLoading(false);
        });
    })
  }

    const convertCount = (num) => {
      return props.calc.convertCount(num);
    }
    
    const calcDiffDate = (diffMinutes) => {
      return props.calc.getDiffTime(diffMinutes);
    }

    const convertVideoDuration = (time) => {
      return props.calc.convertVideoDuration(time);
    }

    return (
        <>
        <Header
          moveToMain = {moveToMain} 
          onSearch = {searchVideos}
          onLogIn = {onLogIn}
          onLogOut = {onLogOut}
          user = {user}
        />
        <section>
          <Routes>
            <Route 
                path='/watch'
                element={
                    <Watch 
                    user={user}
                    currentVid={currentVid} 
                    comments={comments.items}
                    videos={videos.items}
                    videoNextToken={videos.nextToken}
                    convertCount={convertCount}
                    calcDiffDate={calcDiffDate}
                    getMoreComments={getMoreComments}
                    clickedVideo={clickedVideo}
                    convertVideoDuration={convertVideoDuration}
                    getMoreVideos={getMoreVideos}
                    youtube={props.youtube}
                    onLogIn={onLogIn}
                    getPopularVideos={getPopularVideos}
                    />
                }
            />
            <Route 
                path='/'
                element={
                <Home 
                    videos={videos.items}
                    videoNextToken={videos.nextToken}
                    clickedVideo={clickedVideo}
                    convertCount={convertCount}
                    calcDiffDate={calcDiffDate}
                    convertVideoDuration={convertVideoDuration}
                    getMoreVideos={getMoreVideos}
                    videoLoading={isVideoLoading}
                />
                }
            />
            <Route 
              path='/results'
              element={
                <Results 
                  videos={videos.items}
                  videoNextToken={videos.nextToken}
                  clickedVideo={clickedVideo}
                  convertCount={convertCount}
                  calcDiffDate={calcDiffDate}
                  convertVideoDuration={convertVideoDuration}
                  getMoreVideos={getMoreVideos}
                  onSearch={searchVideos}
                />
              }
            />
          </Routes>
        </section>
        </>
    );
};

export default App;