import React from 'react';
import PlayerBox from './PlayerBox';
import PlayList from './PlayList';
import CommentsWrapper from 'components/CommentsWrapper';
import ChannelInfo from './ChannelInfo';

const VideoSectionPresenter = ({ isInSection }) => {
    return (
        <section className="section_select_video">
            <div>
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
