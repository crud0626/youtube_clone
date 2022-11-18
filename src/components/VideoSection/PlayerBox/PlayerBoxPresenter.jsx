import React from 'react';
import styles from './PlayerBox.module.scss';
import IconButton from 'components/IconButton/IconButton';
import { EMPTY_DISLIKE_MARK, EMPTY_LIKE_MARK, FILL_DISLIKE_MARK, FILL_LIKE_MARK, SAVE_MARK, SHARE_MARK } from 'constants/iconPath';
import { convertCount } from 'utils/calculator';

const VideoPlayer = ({ videoId }) => (
    <div className={styles.player_wrapper}>
        <iframe 
            className={styles.player}
            id="ytplayer" 
            type="text/html" 
            title='videoplayer'
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0" 
            allowFullScreen
        ></iframe>
    </div>
)

const VideoInfoBtns = ({ rating, likeCount, sendRating }) => (
    <div className={styles.info_btn_wrapper}>
        <IconButton 
            className={styles.info_btn} 
            titleName="이 동영상이 마음에 듭니다."
            dataFunc={rating.like ? "none" : "like"} 
            onClick={() => sendRating()}
            def={rating.like ? FILL_LIKE_MARK : EMPTY_LIKE_MARK}
            text={convertCount(likeCount)}
        />
        <IconButton 
            className={styles.info_btn}
            titleName="이 동영상이 마음에 들지 않습니다."
            dataFunc={rating.disLike ? "none" : "dislike"} 
            onClick={() => sendRating()}
            def={rating.disLike ? FILL_DISLIKE_MARK : EMPTY_DISLIKE_MARK}
            text="싫어요"
        />
        <IconButton 
            className={styles.info_btn} 
            titleName="공유"
            def={SHARE_MARK}
            text="공유"
        />
        <IconButton
            className={styles.info_btn} 
            titleName="저장"
            def={SAVE_MARK} 
            text="저장"
        />
    </div>
)

const PlayerBoxPresenter = ({ selectedVideo, rating, displayVideoDate, sendRating }) => {
    const { snippet, statistics, id } = selectedVideo;

    return (
        <>
            <VideoPlayer videoId={id} />
            <div className={styles.info_wrapper}>
                <h3 className={styles.title}>{snippet.title}</h3>
                <div className={styles.info}>
                    <div className={styles.info_text}>
                        <span>{`${Number(statistics.viewCount).toLocaleString("en")}회`}</span>
                        <span>{" • "}</span>
                        <span>{displayVideoDate()}</span>
                    </div>
                    <VideoInfoBtns 
                        rating={rating}
                        likeCount={statistics.likeCount}
                        sendRating={sendRating}
                    />
                </div>
            </div>
        </>
    );
};

export default PlayerBoxPresenter;