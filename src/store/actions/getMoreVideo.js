const { CHANGE_VIDEO_LOADING, requestSearchData, requestVideoData } = require("../slice/videoSlice");

// 추가 비디오를 받아오는 함수 
// PlayList, GridVideoList 컴포넌트에서 사용 중
export const getMoreVideo = (nextToken, searchQuery) => {
    return async dispatch => {
        dispatch(CHANGE_VIDEO_LOADING());

        await dispatch(
            searchQuery 
            ? requestSearchData({ searchQuery, nextToken }) 
            : requestVideoData(nextToken)
        )
        .finally(() => dispatch(CHANGE_VIDEO_LOADING()))
    }
}