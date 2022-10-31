import { configureStore } from '@reduxjs/toolkit';
import conditionSlice from './slice/conditionSlice';
import userSlice from './slice/userSlice';
import videoSlice from './slice/videoSlice';

export const store = configureStore({
    reducer: {
        condition: conditionSlice.reducer,
        video: videoSlice.reducer,
        user: userSlice.reducer
    }
});