import { ADD_VIDEO_LIST, CHANGE_VIDEO_LOADING, requestVideoData, RESET_SELECTED_VIDEO, RESET_VIDEO_LIST } from "../slice/videoSlice";

const dummyVideos = { 
    items: new Array(24).fill(""), 
    nextPageToken: null
};

export const initVideo = () => {
    return dispatch => {
        dispatch(CHANGE_VIDEO_LOADING());
        dispatch(RESET_VIDEO_LIST());
        dispatch(ADD_VIDEO_LIST(dummyVideos));

        dispatch(requestVideoData())
        .then(() => dispatch(RESET_SELECTED_VIDEO()))
        .finally(() => dispatch(CHANGE_VIDEO_LOADING()));
    }
}