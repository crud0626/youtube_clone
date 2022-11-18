import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerBoxPresenter from './PlayerBoxPresenter';
import youtubeAPI from 'service/youtube-api';
import { requestLogin } from 'store/slice/userSlice';

const PlayerBoxContainer = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const { selectedVideo } = useSelector(state => state.video);
    const [rating, setRating] = useState({
        like: false,
        disLike: false
    });
    
    const displayVideoDate = useCallback(() => {
        const date = new Date(selectedVideo.snippet.publishedAt);
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
    }, [selectedVideo.snippet.publishedAt]);

    const getToken = useCallback(() => {
        if (userData.uid) {
            return JSON.parse(localStorage.getItem(userData.uid));
        }
    }, [userData.uid]);

    const checkExpires = useCallback(() => {
        const tokenData = getToken();
        if (Date.now() > tokenData.expires) {
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            dispatch(requestLogin());
        }

        return true;
    }, [dispatch, getToken]);
    
    const sendRating = async ({ currentTarget }) => {
        if (checkExpires()) {
            const rating = currentTarget.dataset.func;
            await youtubeAPI.ratingVideo(rating, selectedVideo.id, userData.uid)
            .then(() => {
                const newRating = { like: false, disLike: false };

                switch(rating) {
                    case "like":
                        newRating.like = true;
                        break;
                    case "dislike":
                        newRating.disLike = true;
                        break;
                    case "none":
                        break;
                    default:
                        throw new Error(`정의되지 않은 평가입니다. ${rating}`);
                }
                setRating({ ...newRating });
            })
            .catch(error => {
                if (error === "Invalid Credentials") {
                    alert("토큰이 만료되어 로그인을 재시도합니다.");
                    dispatch(requestLogin());
                }
            });
        }
    };

    const getCurrentRate = async () => {
        if (checkExpires()) {
            await youtubeAPI.getRating(selectedVideo.id, userData.uid)
            .then((data) => {
                const newRating = { like: false, disLike: false };
                
                switch(data) {
                    case "like":
                        newRating.like = true;
                        break;
                    case "dislike":
                        newRating.disLike = true;
                        break;
                    default:
                        return;
                }
                setRating({ ...newRating });
            })
            .catch(error => {
                if (error === "Invalid Credentials") {
                    alert("토큰이 만료되어 로그인을 재시도합니다.");
                    dispatch(requestLogin());
                }
            });
        }
    }

    useEffect(() => {
        if (userData.uid) getCurrentRate();
    }, [userData.uid]);

    return (
        <PlayerBoxPresenter 
            selectedVideo={selectedVideo}
            rating={rating}
            displayVideoDate={displayVideoDate}
            sendRating={sendRating}
        />
    );
};

export default PlayerBoxContainer;