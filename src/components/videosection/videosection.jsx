import React, { memo, useEffect, useRef, useState } from 'react';
import CommentsContainer from '../Comments_container/Comments_container';
import styles from '../../styles/videosection.module.scss';
import defaultThubmnail from 'assets/default_thubmnail.gif';
import { handleThumbnailError } from 'utils/utils';
import { EMPTY_LIKE_MARK, FILL_LIKE_MARK, EMPTY_DISLIKE_MARK, FILL_DISLIKE_MARK, SAHRE_MARK, SAVE_MARK } from 'constants/iconPath';

const VideoSection = memo((props) => {
    const descRef = useRef();
    const [textOver, setTextOver] = useState(false);
    const [like, setLike] = useState(false);
    const [disLike, setDisLike] = useState(false);

    const getTokens = () => {
        if (props.user.uid) {
            return JSON.parse(localStorage.getItem(props.user.uid));
        }
    }

    const displayVideoDate = () => {
      const date = new Date(props.currentVid.snippet.publishedAt);
      return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
    }

    const convertShortCount = (count) => {
      return props.convertCount(count);
    };
    
    const onDescButton = (event) => {
      const target = event.target.previousSibling;

      if (target.matches("#expander")) {
        target.classList.remove("expander");
        target.classList.add("shortcut");
        target.id = "shortcut";
        event.target.innerText = "더보기";
        return;
      }

      target.classList.remove("shortcut");
      target.classList.add("expander");
      target.id = "expander";
      event.target.innerText = "간략히";
      return;
    };

    useEffect(() => {
      if (descRef.current.clientHeight < descRef.current.scrollHeight) {
        setTextOver(true);
      }
    }, []);

    useEffect(() => {
        setLike(false);
        setDisLike(false);
        if(props.user.uid) {
            getCurrentRate();
        }
    }, [props.currentVid, props.user.uid]);

    const checkExpires = () => {
        const { expires } = getTokens();
        if (Date.now() > expires) {
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            props.onLogIn();
            return false;
        }
        return true;
    }

    const getCurrentRate = async () => {
        if (!checkExpires()) {
            return;
        }

        return await props.youtube.getRating(props.currentVid.id, props.user.uid)
        .then((response) => {
            if (response.data.items[0]) {
                const data = response.data.items[0].rating;
                switch(data) {
                    case "like":
                        setLike(true);
                        break;
                    case "dislike":
                        setDisLike(true);
                        break;
                    default:
                        break;
                }
            }
            return;
        })
        .catch(error => {
            const message = error.response.data.error.errors[0].message;
            if (message === "Invalid Credentials") {
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            props.onLogIn();
            } else {
            alert(`에러가 발생했습니다 : ${message}`);
            throw new Error(`에러가 발생했습니다 : ${message}`);
            }
        });
    }

    const sendRating = async (event) => {
        if (!checkExpires()) {
            return;
        }

        const rating = event.currentTarget.dataset.func;
        await props.youtube.ratingVideo(rating, props.currentVid.id, props.user.uid)
        .then(() => {
            switch(rating) {
                case "like":
                    setLike(true);
                    if (disLike) {setDisLike(false)};
                    break;
                case "dislike":
                    setDisLike(true);
                    if (like) {setLike(false)};
                    break;
                case "none":
                    setLike(false);
                    setDisLike(false);
                    break;
                default:
                    console.log(`정의되지 않은 평가입니다. ${rating}`);
                    break;
            }
        })
        .catch(err => {
          const message = err.response.data.error.errors[0].message;
          if (message === "Invalid Credentials") {
            alert("토큰이 만료되어 로그인을 재시도합니다.");
            props.onLogIn();
          } else {
            alert(`에러가 발생했습니다 : ${message}`);
            throw new Error(`에러가 발생했습니다 : ${message}`);
          }
        });
    };

    const currentVid = props.currentVid;

    return (
        <div className={styles.container}>
            <div className={styles.player_container}>
                <iframe 
                    className={styles.player}
                    id="ytplayer" 
                    type="text/html" 
                    title='videoplayer'
                    width="720" height="405"
                    src={`https://www.youtube.com/embed/${currentVid.id}`}
                    frameBorder="0" 
                    allowFullScreen
                ></iframe>
            </div>
            <div className={styles.video_info_container}>
                <h3 className={styles.video_title}>{currentVid.snippet.title}</h3>
                <div className={styles.video_info}>
                    <div className={styles.video_info_left}>
                        <span>{`${Number(props.currentVid.statistics.viewCount).toLocaleString("en")}회`}</span>
                        <span>{" • "}</span>
                        <span>{displayVideoDate()}</span>
                    </div>
                    <div className={styles.video_info_right}>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='이 동영상이 마음에 듭니다.' data-func={like ? "none" : "like"} onClick={sendRating}>
                            <button>
                                <svg width="24" height="24">
                                    {!like && <path d={EMPTY_LIKE_MARK}></path>}
                                    {like && <path d={FILL_LIKE_MARK}></path>}
                                </svg>
                            </button>
                            <span>{convertShortCount(currentVid.statistics.likeCount)}</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='이 동영상이 마음에 들지 않습니다.' data-func={disLike ? "none" : "dislike"} onClick={sendRating}>
                            <button>
                                <svg width="24" height="24">
                                    {disLike && <path d={FILL_DISLIKE_MARK}></path>}
                                    {!disLike && <path d={EMPTY_DISLIKE_MARK}></path>}
                                </svg>
                            </button>
                            <span>싫어요</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='공유'>
                            <button>
                                <svg width="24" height="24">
                                    <path d={SAHRE_MARK}></path>
                                </svg>
                            </button>
                            <span>공유</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='저장'>
                            <button>
                                <svg width="24" height="24">
                                    <path d={SAVE_MARK}></path>
                                </svg>
                            </button>
                            <span>저장</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className={styles.channel_info_container}>
                <a className={styles.channel_info_left} href={`https://www.youtube.com/channel/${currentVid.snippet.channelId}`} target="_blank" rel="noreferrer" >
                    <img 
                        src={currentVid.channel.snippet.thumbnails.default.url} 
                        onError={({ currentTarget }) => handleThumbnailError(currentTarget, defaultThubmnail)}
                        alt="channelImage" 
                    />
                </a>
                <div className={styles.channel_info_right}>
                    <a 
                        href={`https://www.youtube.com/channel/${currentVid.snippet.channelId}`} 
                        target="_blank" rel="noreferrer"
                        className={styles.channel}
                        title={currentVid.snippet.channelTitle}
                    >
                        {currentVid.snippet.channelTitle}
                    </a>
                    <span>{`구독자 ${convertShortCount(currentVid.channel.statistics.subscriberCount)}명`}</span>
                    <div className={styles.desc_container}>
                        <pre id='expander' ref={descRef} className={`${styles.video_desc} shortcut`}>{currentVid.snippet.description}</pre>
                        {textOver && <button className={styles.toggle_btn} onClick={onDescButton}>더보기</button>}
                    </div>
                    
                </div>
                
            </div>
            <CommentsContainer 
                commentCount={props.currentVid.statistics.commentCount}
                comments={props.comments}
                calcDiffDate={props.calcDiffDate}
                getMoreComments={props.getMoreComments}
                changeDefaultThumbnail={props.changeDefaultThumbnail}
            />
        </div>
    );
});

export default VideoSection;
