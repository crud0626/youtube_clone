import React, { useEffect, useRef, useState } from 'react';
import CommentsContainer from '../Comments_container/Comments_container';
import styles from '../../styles/videosection.module.scss';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError } from 'utils/utils';
import { EMPTY_LIKE_MARK, FILL_LIKE_MARK, EMPTY_DISLIKE_MARK, FILL_DISLIKE_MARK, SHARE_MARK, SAVE_MARK } from 'constants/iconPath';
import Icon from '../Icon/Icon';

const VideoSection = (props) => {
    const descRef = useRef();
    const toggleRef = useRef();
    const [isTextOver, setIsTextOver] = useState(false);
    const [rating, setRating] = useState({
        like: false,
        disLike: false
    });

    // 이름 변경
    const getToken = () => {
        if (props.userData.uid) {
            return JSON.parse(localStorage.getItem(props.userData.uid));
        }
    }

    const displayVideoDate = () => {
      const date = new Date(props.selectedVideo.snippet.publishedAt);
      return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
    }

    // 이름변경, ref로 통일
    const onClickToggle = () => {
        const desc = descRef.current;
        const toggle = toggleRef.current;

        if (desc.className.includes("expander")) {
            desc.classList.remove("expander");
            desc.classList.add("shortcut");
            toggle.innerText = "더보기";
            return;
        }

        desc.classList.remove("shortcut");
        desc.classList.add("expander");
        toggle.innerText = "간략히";
        return;
    };

    useEffect(() => {
      if (descRef.current.clientHeight < descRef.current.scrollHeight) {
        setIsTextOver(true);
      }
    }, []);

    useEffect(() => {
        if (props.userData.uid) getCurrentRate();
    }, [props.selectedVideo, props.userData.uid]);

    const checkExpires = () => {
        const { expires } = getToken();
        if (Date.now() > expires) {
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            props.onLogIn();
            return false;
        }
        return true;
    }

    const getCurrentRate = async () => {
        if (!checkExpires()) return;

        await props.youtube.getRating(props.selectedVideo.id, props.userData.uid)
        .then((response) => {
            if (response.data.items[0]) {
                const data = response.data.items[0].rating;
                switch(data) {
                    case "like":
                        setRating({
                            ...rating,
                            like: true
                        });
                        break;
                    case "dislike":
                        setRating({
                            ...rating,
                            disLike: true
                        });
                        break;
                    default:
                        break;
                }
            }
            return;
        })
        .catch(error => {
            console.log(error);
            // 여기서 핸들링 필요, error의 내용이 Invalid Credentials 일 때
            // props.onLogIn(); // 여기서 핸들링 필요
        });
    }

    const sendRating = async (event) => {
        if (!checkExpires()) return;

        const rating = event.currentTarget.dataset.func;
        // props에 없는데?
        await props.youtube.ratingVideo(rating, props.selectedVideo.id, props.userData.uid)
        .then(() => {
            let like = false, disLike = false;

            switch(rating) {
                case "like":
                    like = true;
                    // setRating({
                    //     like: true,
                    //     disLike: false
                    // });
                    break;
                case "dislike":
                    disLike = true;
                    // setRating({
                    //     like: false,
                    //     disLike: true
                    // });
                    break;
                case "none":
                    break;
                default:
                    throw new Error(`정의되지 않은 평가입니다. ${rating}`);
            }
            setRating({ like, disLike });
        })
        .catch(error => {
            // 
            // props.onLogIn();
        });
    };

    const selectedVideo = props.selectedVideo;

    return (
        <div className={styles.container}>
            <div className={styles.player_container}>
                <iframe 
                    className={styles.player}
                    id="ytplayer" 
                    type="text/html" 
                    title='videoplayer'
                    width="720" height="405"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    frameBorder="0" 
                    allowFullScreen
                ></iframe>
            </div>
            <div className={styles.video_info_container}>
                <h3 className={styles.video_title}>{selectedVideo.snippet.title}</h3>
                <div className={styles.video_info}>
                    <div className={styles.video_info_left}>
                        <span>{`${Number(props.selectedVideo.statistics.viewCount).toLocaleString("en")}회`}</span>
                        <span>{" • "}</span>
                        <span>{displayVideoDate()}</span>
                    </div>
                    <div className={styles.video_info_right}>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='이 동영상이 마음에 듭니다.' data-func={rating.like ? "none" : "like"} onClick={sendRating}>
                            <button>
                                {!rating.like && <Icon def={EMPTY_LIKE_MARK} />}
                                {rating.like && <Icon def={FILL_LIKE_MARK} />}
                            </button>
                            <span>{props.convertCount(selectedVideo.statistics.likeCount)}</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='이 동영상이 마음에 들지 않습니다.' data-func={rating.disLike ? "none" : "dislike"} onClick={sendRating}>
                            <button>
                                {rating.disLike && <Icon def={FILL_DISLIKE_MARK} />}
                                {!rating.disLike && <Icon def={EMPTY_DISLIKE_MARK} />}
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
                <a className={styles.channel_info_left} href={`https://www.youtube.com/channel/${selectedVideo.snippet.channelId}`} target="_blank" rel="noreferrer" >
                    <img 
                        src={selectedVideo.channel.snippet.thumbnails.default.url} 
                        onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                        alt="channelImage" 
                    />
                </a>
                <div className={styles.channel_info_right}>
                    <a 
                        href={`https://www.youtube.com/channel/${selectedVideo.snippet.channelId}`} 
                        target="_blank" rel="noreferrer"
                        className={styles.channel}
                        title={selectedVideo.snippet.channelTitle}
                    >
                        {selectedVideo.snippet.channelTitle}
                    </a>
                    <span>{`구독자 ${props.convertCount(selectedVideo.channel.statistics.subscriberCount)}명`}</span>
                    <div className={styles.desc_container}>
                        <pre ref={descRef} className={`${styles.video_desc} shortcut`}>{selectedVideo.snippet.description}</pre>
                        {isTextOver && <button ref={toggleRef} className={styles.toggle_btn} onClick={onClickToggle}>더보기</button>}
                    </div>
                    
                </div>
                
            </div>
            <CommentsContainer 
                commentCount={props.selectedVideo.statistics.commentCount}
                comments={props.comments}
                getDiffTime={props.getDiffTime}
                getMoreComment={props.getMoreComment}
            />
        </div>
    );
};

export default VideoSection;
