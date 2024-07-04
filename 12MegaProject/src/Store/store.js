import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Store/authSlice'
import postsReducer from '../Store/postsSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
});

export default store