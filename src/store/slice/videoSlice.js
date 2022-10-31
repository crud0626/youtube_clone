import { createSlice } from '@reduxjs/toolkit';
// videos (add, reset), selectedVideo(change, reset), comments(add, reset), isVideoLoading
// ADD_VIDEO_LIST, RESET_VIDEO_LIST
// CHANGE_SELECTED_VIDEO, RESET_SELECTED_VIDEO
// ADD_COMMENTS, RESET_COMMENTS
// CHANGE_VIDEO_LOADING

// ---- video 관련
// videos - addVideos, resetVideos (메인로고 클릭 또는 최초 접근시 사용 할 reducer)
// selectedVideo - change || reset
// comments - add와 reset
// isVideoLoading - true / false
const initialState = {
    videos: [],
    selectedVideo: null, // null || 객체
    comments: [],
    isVideoLoading: false
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        // add video list랑 add comments는 그냥 바로 concat해도 되지않나?
        ADD_VIDEO_LIST: (state, action) => state.videos = state.videos.concat(action.payload),
        RESET_VIDEO_LIST: (state, action) => state.videos = [],
        CHANGE_SELECTED_VIDEO: (state, action) => state.selectedVideo = action.payload,
        RESET_SELECTED_VIDEO: (state, action) => state.selectedVideo = null,
        ADD_COMMENTS: (state, action) => state.comments = state.comments.concat(action.payload), // 그냥 concat으로 해도 되지 않나?
        RESET_COMMENTS: (state, action) => state.comments = [],
        CHANGE_VIDEO_LOADING: (state, action) => state.isVideoLoading = !state.isVideoLoading
    }
});

export default videoSlice;
export const { ADD_VIDEO_LIST,
    RESET_VIDEO_LIST,
    CHANGE_SELECTED_VIDEO,
    RESET_SELECTED_VIDEO,
    ADD_COMMENTS,
    RESET_COMMENTS,
    CHANGE_VIDEO_LOADING  } = videoSlice.actions;