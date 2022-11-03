import React, { useEffect, useRef, useState } from 'react';
import styles from 'styles/videoSection/videoSection.module.scss';
import CommentsContainer from 'components/CommentsContainer/CommentsContainer';
import IconButton from 'components/IconButton/IconButton';
import PlayList from 'components/VideoSection/PlayList/PlayList';
import useTextOver from 'hooks/useTextOver';
import useResizeObserver from 'hooks/useResizeObserver';
import { handleThumbnailError, handleToggle } from 'utils/utils';
import { EMPTY_LIKE_MARK, FILL_LIKE_MARK, EMPTY_DISLIKE_MARK, FILL_DISLIKE_MARK, SHARE_MARK, SAVE_MARK } from 'constants/iconPath';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from 'store/slice/userSlice';
import youtubeAPI from 'service/youtube-api';

const VideoSection = ({ calculator, ...restProps}) => {
    const { selectedVideo } = useSelector(state => state.video);
    const userData = useSelector(state => state.user);
    const toggleRef = useRef();
    const [isTextOver, descRef] = useTextOver();
    const isInSection = useResizeObserver(1016);
    const [rating, setRating] = useState({
        like: false,
        disLike: false
    });
    const dispatch = useDispatch();

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

    const playListProps = { calculator, isInSection, ...restProps };
    const { channel, id, snippet, statistics } = selectedVideo;

    return (
        <section className="section_select_video">
            <div className={styles.container}>
                <div className={styles.player_container}>
                    <iframe 
                        className={styles.player}
                        id="ytplayer" 
                        type="text/html" 
                        title='videoplayer'
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder="0" 
                        allowFullScreen
                    ></iframe>
                </div>
                <div className={styles.video_info_container}>
                    <h3 className={styles.video_title}>{snippet.title}</h3>
                    <div className={styles.video_info}>
                        <div className={styles.video_info_text}>
                            <span>{`${Number(statistics.viewCount).toLocaleString("en")}회`}</span>
                            <span>{" • "}</span>
                            <span>{displayVideoDate()}</span>
                        </div>
                        <div className={styles.video_info_button_container}>
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`} 
                                titleName="이 동영상이 마음에 듭니다."
                                dataFunc={rating.like ? "none" : "like"} 
                                onClick={sendRating}
                                def={rating.like ? FILL_LIKE_MARK : EMPTY_LIKE_MARK}
                                text={calculator.convertCount(statistics.likeCount)}
                            />
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`}
                                titleName="이 동영상이 마음에 들지 않습니다."
                                dataFunc={rating.disLike ? "none" : "dislike"} 
                                onClick={sendRating}
                                def={rating.disLike ? FILL_DISLIKE_MARK : EMPTY_DISLIKE_MARK}
                                text="싫어요"
                            />
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`} 
                                titleName="공유"
                                def={SHARE_MARK}
                                text="공유"
                            />
                            <IconButton 
                                className={`${styles.video_info_button} ${styles.btns}`} 
                                titleName="저장"
                                def={SAVE_MARK} 
                                text="저장"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.channel_info_container}>
                    <a className={styles.channel_thumbnail} href={`https://www.youtube.com/channel/${snippet.channelId}`} target="_blank" rel="noreferrer" >
                        <img 
                            src={channel.snippet.thumbnails.default.url} 
                            onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                            draggable="false"
                            alt="channelImage" 
                        />
                    </a>
                    <div className={styles.channel_info}>
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
                            <pre ref={descRef} className={styles.desc} dangerouslySetInnerHTML={convertToLink(snippet.description)}></pre>
                            {
                                isTextOver && 
                                <button 
                                    ref={toggleRef} 
                                    className={styles.toggle_btn} 
                                    onClick={() => handleToggle(descRef.current, toggleRef.current)}
                                >
                                    <span>더보기</span>
                                </button>
                            }
                        </div>
                        
                    </div>
                    
                </div>
                { isInSection && <PlayList { ...playListProps } /> }
                <CommentsContainer 
                    commentCount={statistics.commentCount} // ??
                    getTimeDiff={calculator.getTimeDiff}
                />
            </div>
            { !isInSection && <PlayList { ...playListProps } /> }
        </section>
    );
};

export default VideoSection;
