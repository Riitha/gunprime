import { configureStore } from '@reduxjs/toolkit';
import gunplaReducer from '../features/gunpla/gunplaSlice.js';

export const store = configureStore({
    reducer: {
        gunpla: gunplaReducer,
    },
});