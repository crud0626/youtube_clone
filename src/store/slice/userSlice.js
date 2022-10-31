import { createSlice } from '@reduxjs/toolkit';
// {uid, name, url}
// action: LOGIN, LOGOUT

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            state = action.payload
        },
        LOGOUT: (state, action) => {
            state = initialState
        }
    }
});

export default userSlice;
export const { LOGIN, LOGOUT } = userSlice.actions;

