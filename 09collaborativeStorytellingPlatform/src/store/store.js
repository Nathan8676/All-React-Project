import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'
import themeReducer from './themeSwitcherSlice'
import storyReducer from './storySlice';  
const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        story: storyReducer
    },
});

export default store