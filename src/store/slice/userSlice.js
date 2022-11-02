import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from 'service/auth';

const initialState = {
    uid: null,
    name: null,
    url: null
};

// Async function
const requestLogin = createAsyncThunk(
    "user/LOGIN", 
    async () => {
        const response = await authService.login();
        if(response) {
            return response;
        }
    }
);

const requestLogout = createAsyncThunk(
    "user/LOGOUT", 
    async () => {
        const response = await authService.logOut();
        if(response) {
            alert("로그아웃 되었습니다.");
            return initialState;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            state.uid = action.payload.uid;
            state.name = action.payload.name;
            state.url = action.payload.url;
        },
        LOGOUT: (state) => {
            state.uid = null;
            state.name = null;
            state.url = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // LogIn
            .addCase(requestLogin.fulfilled, (state, action) => {
                state.uid = action.payload.uid;
                state.name = action.payload.name;
                state.url = action.payload.url;
            })
            // LogOut
            .addCase(requestLogout.fulfilled, (state) => {
                state.uid = null;
                state.name = null;
                state.url = null;
            })
    }
});

const { LOGIN } = userSlice.actions;

export default userSlice;
export { requestLogin, requestLogout, LOGIN };