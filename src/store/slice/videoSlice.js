import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import youtubeAPI from 'service/youtube-api';

const initialState = {
    videos: {
        items: [],
        nextPageToken: null
    },
    selectedVideo: null,
    comments: {
        items: [],
        nextPageToken: null
    },
    isVideoLoading: false
}

// Async functions
const requestVideoData = createAsyncThunk(
    "video/requestVideo",
    async (nextToken = null) => {
        const data = await youtubeAPI.getMostPopular(nextToken);
        if(data) {
            return data;
        }
    }
);

const requestCommentData = createAsyncThunk(
    "video/requestComment",
    async (nextToken = null) => {
        const data = await youtubeAPI.getMostPopular(nextToken);
        if(data) {
            return data;
        }
    }
);

// isFirst는 새로운 검색시 기존 비디오 리스트를 리셋하기 위함.
const requestSearchData = createAsyncThunk(
    "video/requestSearch",
    async ({ searchQuery, nextToken = null, isFirst = false }, thunkAPI) => {
        const data = await youtubeAPI.searchVideo(searchQuery, nextToken);
        if(data) {
            if(isFirst) thunkAPI.dispatch(RESET_VIDEO_LIST());
            return data;
        }
    }
);


const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        // 초기, 무한스크롤링
        ADD_VIDEO_LIST: (state, action) => {
            state.videos.items.push(...action.payload.items);
            state.videos.nextPageToken = action.payload.nextPageToken 
            ? action.payload.nextPageToken : null;
        },
        // 검색
        RESET_VIDEO_LIST: (state) => {
            state.videos.items = [];
            state.videos.nextPageToken = null;
        },
        // 검색
        RESET_SELECTED_VIDEO: (state) => {
            state.selectedVideo = null;
        },
        // 클릭
        CHANGE_SELECTED_VIDEO: (state, action) => {
            state.selectedVideo = action.payload;
        },
        // 무한 스크롤링 및 비디오 클릭
        ADD_COMMENTS: (state, action) => {
            state.comments.items.push(...action.payload.items);
            state.comments.nextPageToken = action.payload.nextPageToken 
            ? action.payload.nextPageToken : null;
        },
        // 로고 클릭
        RESET_COMMENTS: (state) => {
            state.comments.items = [];
            state.comments.nextPageToken = null;
        },
        CHANGE_VIDEO_LOADING: (state) => {
            state.isVideoLoading = !state.isVideoLoading;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestVideoData.fulfilled, (state, action) => {
                state.videos.items[0] === ""
                ? state.videos.items = action.payload.items
                : state.videos.items.push(...action.payload.items); 
                
                state.videos.nextPageToken = action.payload.nextPageToken;
            })
            .addCase(requestCommentData.fulfilled, (state, action) => {
                state.comments.items.push(...action.payload.items); 
                state.comments.nextPageToken = action.payload.nextPageToken;
            })
            .addCase(requestSearchData.fulfilled, (state, action) => {
                state.videos.items.push(...action.payload.items);
                state.videos.nextPageToken = action.payload.nextPageToken;
            })
    }
});

export default videoSlice;

export { requestVideoData, requestCommentData, requestSearchData };

export const { 
    ADD_VIDEO_LIST,
    RESET_VIDEO_LIST,
    CHANGE_SELECTED_VIDEO,
    RESET_SELECTED_VIDEO,
    ADD_COMMENTS,
    RESET_COMMENTS,
    CHANGE_VIDEO_LOADING
} = videoSlice.actions;