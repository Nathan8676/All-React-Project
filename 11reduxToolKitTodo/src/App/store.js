import {configureStore, } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/TodoSlices'
import storage from 'redux-persist/lib/storage'
import { persistReducer} from 'redux-persist';



const presistConfigone = {
    key: 'todo',
    storage,
}



const localStorageReducer = persistReducer(presistConfigone, todoReducer)

export const store = configureStore({
    reducer: localStorageReducer
})