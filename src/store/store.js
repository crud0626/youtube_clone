/**
 * production 레벨에서 Redux devTools를 숨기려면 배포 시 
 * 환경 변수의 NODE_ENV의 값을 "production" 으로 꼭 등록해주어야 함.
 */

import { configureStore } from '@reduxjs/toolkit';
import conditionSlice from './slice/conditionSlice';
import userSlice from './slice/userSlice';
import videoSlice from './slice/videoSlice';

export const store = configureStore({
    reducer: {
        condition: conditionSlice.reducer,
        video: videoSlice.reducer,
        user: userSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
});