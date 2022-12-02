
import { CHANGE_VIDEO_LOADING, requestSearchData, RESET_SELECTED_VIDEO } from "../slice/videoSlice";
import { CHANGE_SEARCH_QUERY } from "../slice/conditionSlice";

export const onSearchVideos = (searchQuery) => {
    return async dispatch => {
        dispatch(CHANGE_VIDEO_LOADING());

        if(searchQuery) {
            await dispatch(requestSearchData({ searchQuery, isFirst: true }))
            .then(() => {
                dispatch(RESET_SELECTED_VIDEO());
                dispatch(CHANGE_SEARCH_QUERY(searchQuery));
            })
            .finally(() => dispatch(CHANGE_VIDEO_LOADING()))
        }
    }
}