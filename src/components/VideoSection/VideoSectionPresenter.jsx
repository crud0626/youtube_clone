import React from 'react';
import styles from './VideoSection.module.scss';
import PlayerBox from './PlayerBox';
import PlayList from './PlayList';
import CommentsWrapper from 'components/CommentsWrapper';
import ChannelInfo from './ChannelInfo';

const VideoSectionPresenter = ({ isInSection }) => {
    return (
        <section className="section_select_video">
            <div className={styles.wrapper}>
                <PlayerBox />
                <ChannelInfo />
                {isInSection && <PlayList isInSection={isInSection} />}
                <CommentsWrapper />
            </div>
            {!isInSection && <PlayList isInSection={isInSection} />}
        </section>
    );
};

export default VideoSectionPresenter;
