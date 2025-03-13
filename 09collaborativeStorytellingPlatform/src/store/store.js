import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'
import themeReducer from './themeSwitcherSlice'
import storyReducer from './storySlice'; 
import userProfileReducer from './userProfileSlice'
import storyChaptersReducer from './storyChaptersSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile: userProfileReducer,
        theme: themeReducer,
        story: storyReducer,
        storyChapters: storyChaptersReducer
    },
});

export default store