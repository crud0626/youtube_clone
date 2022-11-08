import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useResizeObserver from 'hooks/useResizeObserver';
import useTextOver from 'hooks/useTextOver';
import VideoSectionPresenter from './VideoSectionPresenter';
import youtubeAPI from 'service/youtube-api';
import { requestLogin } from 'store/slice/userSlice';

const VideoSectionContainer = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    const isInSection = useResizeObserver(1016);
    const { selectedVideo } = useSelector(state => state.video);
    const [isFlipOpen, setIsFlipOpen] = useState(false);
    const [isTextOver, descRef] = useTextOver();
    const [rating, setRating] = useState({
        like: false,
        disLike: false
    });

    const handleToggle = useCallback(() => setIsFlipOpen((prevState) => !prevState), []);

    const displayVideoDate = () => {
        const date = new Date(selectedVideo.snippet.publishedAt);
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
    }

    const getToken = () => {
        if (userData.uid) {
            return JSON.parse(localStorage.getItem(userData.uid));
        }
    }

    const checkExpires = () => {
        const tokenData = getToken();
        if (Date.now() > tokenData.expires) {
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            dispatch(requestLogin());
        }

        return true;
    }

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

    const convertToLink = (text) => {
        const convertedText = text.replace(/\bhttps?:\/\/\S+\b/g, '<a href=$& target="_blank" rel="noreferrer">$&</a>');
        return { __html: convertedText };
    }

    useEffect(() => {
        if (userData.uid) getCurrentRate();
    }, [userData.uid]);
    
    return (
        <VideoSectionPresenter 
            ref={descRef}
            selectedVideo={selectedVideo}
            rating={rating}
            isFlipOpen={isFlipOpen}
            isTextOver={isTextOver}
            isInSection={isInSection}
            handleToggle={handleToggle}
            displayVideoDate={displayVideoDate}
            sendRating={sendRating}
            convertToLink={convertToLink}
        />
    );
};

export default VideoSectionContainer;
