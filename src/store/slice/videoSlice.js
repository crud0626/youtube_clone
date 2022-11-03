import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    videos: {
        items: [],
        nextPageToken: null
    },
    selectedVideo: null, // null || 객체
    comments: {
        items: [],
        nextPageToken: null
    },
    isVideoLoading: false
}

// Async functions
// requestVideos

// requestCommnets

// change selected video

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        ADD_VIDEO_LIST: (state, action) => {
            state.videos.items.push(...action.payload.items);
            state.videos.nextPageToken = action.payload.nextPageToken 
            ? action.payload.nextPageToken : null;
        },
        RESET_VIDEO_LIST: (state) => {
            state.videos.items = [];
            state.videos.nextPageToken = null;
        },
        CHANGE_SELECTED_VIDEO: (state, action) => {
            state.selectedVideo = action.payload;
        },
        RESET_SELECTED_VIDEO: (state) => {
            state.selectedVideo = null;
        },
        ADD_COMMENTS: (state, action) => {
            state.comments.items.push(...action.payload.items);
            state.comments.nextPageToken = action.payload.nextPageToken 
            ? action.payload.nextPageToken : null;
        },
        RESET_COMMENTS: (state) => {
            state.comments.items = [];
            state.comments.nextPageToken = null;
        },
        CHANGE_VIDEO_LOADING: (state) => {
            state.isVideoLoading = !state.isVideoLoading;
        }
    }
});

export default videoSlice;
export const { 
    ADD_VIDEO_LIST,
    RESET_VIDEO_LIST,
    CHANGE_SELECTED_VIDEO,
    RESET_SELECTED_VIDEO,
    ADD_COMMENTS,
    RESET_COMMENTS,
    CHANGE_VIDEO_LOADING
} = videoSlice.actions;