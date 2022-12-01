import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: ""
}

const conditionSlice = createSlice({
    name: "condition",
    initialState,
    reducers: {
        CHANGE_SEARCH_QUERY: (state, action) => {
            state.searchQuery = action.payload ? action.payload : "";
        }
    }
})

export default conditionSlice;
export const { CHANGE_SEARCH_QUERY, CHANGE_IS_SEARCHING } = conditionSlice.actions;