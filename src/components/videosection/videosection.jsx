import React, { useEffect, useRef, useState } from 'react';
import CommentsContainer from 'components/Comments_container/Comments_container';
import Icon from 'components/Icon/Icon';
import styles from 'styles/videosection.module.scss';
import { handleThumbnailError, handleToggle } from 'utils/utils';
import { EMPTY_LIKE_MARK, FILL_LIKE_MARK, EMPTY_DISLIKE_MARK, FILL_DISLIKE_MARK, SHARE_MARK, SAVE_MARK } from 'constants/iconPath';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import useTextOver from 'hooks/useTextOver';


const VideoSection = ({ userData, comments, selectedVideo, calculator, getMoreComment, youtube, onLogIn }) => {
    const toggleRef = useRef();
    const [isTextOver, descRef] = useTextOver();
    const [rating, setRating] = useState({
        like: false,
        disLike: false
    });
  
    useEffect(() => {
        if (userData.uid) getCurrentRate();
    }, [userData.uid]);

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
        const { expires } = getToken();
        if (Date.now() > expires) {
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            onLogIn();
        }
        return true;
    }

    const getCurrentRate = async () => {
        if (checkExpires()) {
            await youtube.getRating(selectedVideo.id, userData.uid)
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
                    onLogIn();
                }
            });
        }
    }

    const sendRating = async ({ currentTarget }) => {
        if (checkExpires()) {
            const rating = currentTarget.dataset.func;
            await youtube.ratingVideo(rating, selectedVideo.id, userData.uid)
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
                    onLogIn();
                }
            });
        }
    };

    const { channel, id, snippet, statistics } = selectedVideo;

    return (
        <div className={styles.container}>
            <div className={styles.player_container}>
                <iframe 
                    className={styles.player}
                    id="ytplayer" 
                    type="text/html" 
                    title='videoplayer'
                    width="720" height="405"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0" 
                    allowFullScreen
                ></iframe>
            </div>
            <div className={styles.video_info_container}>
                <h3 className={styles.video_title}>{snippet.title}</h3>
                <div className={styles.video_info}>
                    <div className={styles.video_info_left}>
                        <span>{`${Number(statistics.viewCount).toLocaleString("en")}회`}</span>
                        <span>{" • "}</span>
                        <span>{displayVideoDate()}</span>
                    </div>
                    <div className={styles.video_info_right}>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='이 동영상이 마음에 듭니다.' data-func={rating.like ? "none" : "like"} onClick={sendRating}>
                            <button>
                                {
                                    rating.like 
                                    ? <Icon def={FILL_LIKE_MARK} /> 
                                    : <Icon def={EMPTY_LIKE_MARK} />
                                }
                            </button>
                            <span>{calculator.convertCount(statistics.likeCount)}</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='이 동영상이 마음에 들지 않습니다.' data-func={rating.disLike ? "none" : "dislike"} onClick={sendRating}>
                            <button>
                                {
                                    rating.disLike 
                                    ? <Icon def={FILL_DISLIKE_MARK} /> 
                                    : <Icon def={EMPTY_DISLIKE_MARK} />
                                }
                            </button>
                            <span>싫어요</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='공유'>
                            <button>
                                <Icon def={SHARE_MARK} />
                            </button>
                            <span>공유</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='저장'>
                            <button>
                                <Icon def={SAVE_MARK}/>
                            </button>
                            <span>저장</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className={styles.channel_info_container}>
                <a className={styles.channel_info_left} href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer" >
                    <img 
                        src={channel.snippet.thumbnails.default.url} 
                        onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                        draggable="false"
                        alt="channelImage" 
                    />
                </a>
                <div className={styles.channel_info_right}>
                    <a 
                        href={`https://www.youtube.com/channel/${snippet.channelId}`} 
                        target="_blank" rel="noreferrer"
                        className={styles.channel}
                        title={snippet.channelTitle}
                    >
                        {snippet.channelTitle}
                    </a>
                    <span>{`구독자 ${calculator.convertCount(channel.statistics.subscriberCount)}명`}</span>
                    <div className={styles.desc_container}>
                        <pre ref={descRef} className={`${styles.video_desc} shortcut`}>{snippet.description}</pre>
                        {
                            isTextOver && 
                            <button 
                                ref={toggleRef} 
                                className={styles.toggle_btn} 
                                onClick={() => handleToggle(descRef.current, toggleRef.current)}
                            >
                                더보기
                            </button>
                        }
                    </div>
                    
                </div>
                
            </div>
            <CommentsContainer 
                commentCount={statistics.commentCount}
                comments={comments}
                getDiffTime={calculator.getDiffTime}
                getMoreComment={getMoreComment}
            />
        </div>
    );
};

export default VideoSection;
