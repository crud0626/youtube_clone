import React, { memo, useEffect, useRef, useState } from 'react';
import CommentsContainer from '../Comments_container/Comments_container';
import styles from '../../styles/videosection.module.scss';

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
                                    {!like && <path d='M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z'></path>}
                                    {like && <path d='M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z'></path>}
                                </svg>
                            </button>
                            <span>{convertShortCount(currentVid.statistics.likeCount)}</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='이 동영상이 마음에 들지 않습니다.' data-func={disLike ? "none" : "dislike"} onClick={sendRating}>
                            <button>
                                <svg width="24" height="24">
                                    {disLike && <path d='M18,4h3v10h-3V4z M5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21c0.58,0,1.14-0.24,1.52-0.65L17,14V4H6.57 C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14z'></path>}
                                    {!disLike && <path d='M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z'></path>}
                                </svg>
                            </button>
                            <span>싫어요</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='공유'>
                            <button>
                                <svg width="24" height="24">
                                    <path d='M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z'></path>
                                </svg>
                            </button>
                            <span>공유</span>
                        </div>
                        <div className={`${styles.video_info_item} ${styles.btns}`} title='저장'>
                            <button>
                                <svg width="24" height="24">
                                    <path d='M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z'></path>
                                </svg>
                            </button>
                            <span>저장</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className={styles.channel_info_container}>
                <a className={styles.channel_info_left} href={`https://www.youtube.com/channel/${currentVid.snippet.channelId}`} target="_blank" rel="noreferrer" >
                    <img src={currentVid.channel.snippet.thumbnails.default.url} alt="channelImage" />
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
            />
        </div>
    );
});

export default VideoSection;
