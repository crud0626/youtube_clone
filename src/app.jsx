import "./App.css";

import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home';
import Watch from './pages/watch';
import AuthService from './service/auth';
import Results from "./pages/results";
import { unstable_batchedUpdates } from "react-dom";

const authService = new AuthService();

const App = (props) => {
    const [videos, setVideos] = useState([]);
    const [currentVid, setCurrentVid] = useState({});
    const [comments, setComments] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [videoNextToken, setVideoNextToken] = useState();
    const [commentNextToken, setCommentNextToken] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState({});
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => moveToMain(), []);

    useEffect(() => {
      if (!users.uid) {
        const userData = authService.checkUser();
        if (userData) {
          const data = {
            "uid" : userData.uid,
            "name": userData.displayName,
            "url" : userData.photoURL
          };
          setUsers(data);
        }
      }
    });
    
    const onLogIn = () => {
        authService.login()
        .then(result => {
          const data = {
            "uid" : result.user.uid,
            "name": result.user.displayName,
            "url" : result.user.photoURL
          };
          setUsers(data);
        })
      }

    const onLogOut = () => {
        authService.logOut()
        .then(() => {setUsers({})});
      }
    
    const searchVideos = (query) => {
        props.youtube
        .getSearchVideos(query)
        .then(response => {
            setVideoNextToken(response.nextPageToken);
            setVideos(response.items);
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
          .getSearchVideos(searchQuery, videoNextToken)
          .then(response => unstable_batchedUpdates(() => {
            const data = [...videos];
            data.push(...response.items);
            setVideos(data);
            setVideoNextToken(response.nextPageToken);
            setIsVideoLoading(false);
            }))
        } else {
          return props.youtube
          .getMostPopular(videoNextToken)
          .then(response => unstable_batchedUpdates(() => {
            const data = [...videos];
            data.push(...response.items);
            setVideos(data);
            setVideoNextToken(response.nextPageToken);
            setIsVideoLoading(false);
          }));
        }
      }

    const clickedVideo = async (video) => {
        await props.youtube
        .getCurrentVidInfo(video)
        .then(response => {
            setCurrentVid(response.info);
            setComments(response.comments.items);
            setCommentNextToken(response.comments.nextPageToken);
        })
        .catch((error) => console.log(error));

        navigate(`/watch?v=${video.id}`);
      }

    const getMoreComments = () => {
      return props.youtube
      .getComment(currentVid.id, commentNextToken)
      .then(response => {
        const data = [...comments];
        data.push(...response.items);
        setComments(data);
        setCommentNextToken(response.nextPageToken);
      })
    }

    const moveToMain = () => {
      setIsVideoLoading(true);

      return props.youtube
      .getMostPopular()
      .then(response => {
          unstable_batchedUpdates(() => {
            setVideos(response.items);
            setVideoNextToken(response.nextPageToken);
            setCurrentVid({});
            setIsSearched(false);
            setSearchQuery("");
            setIsVideoLoading(false);
          });
      })
      .catch((error) => console.log(error))
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
          userInfo = {users}
        />
        <section>
          <Routes>
            <Route 
                path='/watch'
                element={
                    <Watch 
                    currentVid={currentVid} 
                    comments={comments}
                    convertCount={convertCount}
                    calcDiffDate={calcDiffDate}
                    getMoreComments={getMoreComments}
                    videos={videos}
                    clickedVideo={clickedVideo}
                    convertVideoDuration={convertVideoDuration}
                    getMoreVideos={getMoreVideos}
                    />
                }
            />
            <Route 
                path='/'
                element={
                <Home 
                    videos={videos}
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
                  videos={videos}
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