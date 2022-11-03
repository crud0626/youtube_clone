import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: "",
    isSearched: false,
}

const conditionSlice = createSlice({
    name: "condition",
    initialState,
    reducers: {
        CHANGE_SEARCH_QUERY: (state, action) => {
            state.searchQuery = action.payload ? action.payload : "";
        },
        CHANGE_IS_SEARCHED: (state) => {
            state.isSearched = !state.isSearched;
        },
    }
})

export default conditionSlice;
export const { CHANGE_SEARCH_QUERY, CHANGE_IS_SEARCHED } = conditionSlice.actions;