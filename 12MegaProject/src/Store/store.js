import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Store/authSlice'
import postsReducer from '../Store/postsSlice'
import themeReducer from '../Store/themeSwitcherSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        theme: themeReducer,
    }
});

export default store