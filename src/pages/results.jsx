import React, { memo } from 'react';
import PlaylistContainer from '~/components/playlist_container/playlist_container';

const Results = memo((props) => {
    return (
        <PlaylistContainer 
            videos={props.videos}
            clickedVideo={props.clickedVideo}
            selected={props.selected}
            convertCount={props.convertCount}
            calcDiffDate={props.calcDiffDate}
            convertVideoDuration={props.convertVideoDuration}
            getMoreVideos={props.getMoreVideos}
        />
    );
});

export default Results;