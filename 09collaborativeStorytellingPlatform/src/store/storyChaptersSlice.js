import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NewDatabase from "../appwrite/Database";

const initialState = {
    chapters: [],
    chaptersError: null,
    chaptersLoading: false,
    singleChapter: null,
    singleChapterLoading: false,
    singleChapterError: null,
}

export const getChapters = createAsyncThunk(
    'storyChapters/getChapters',
    async({queries}) => {
        const response = await NewDatabase.listChapters(queries)
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const getSingleChapter = createAsyncThunk(
    'storyChapters/getSingleChapter',
    async({Id, queries}) => {
        const response = await NewDatabase.getChapter({Id, queries})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const addChapter = createAsyncThunk(
    'storyChapters/addChapter',
    async({data}) => {
        const response = await NewDatabase.createChapter({...data})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const deleteChapter = createAsyncThunk(
    'storyChapters/deleteChapter',
    async({Id}) => {
        const response = await NewDatabase.deleteChapter(Id)
        if(response.error){
            throw new Error(response.error)
        }
        return Id
    }
)

export const updateChapter = createAsyncThunk(
    'storyChapters/updateChapter',
    async({Id, data}) => {
        const response = await NewDatabase.updateChapter(Id, {...data})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

const storyChaptersSlice = createSlice({
    name: "storyChapters",
    initialState,
    reducers: {
        clearChaptersSlice: (state) => {
            state.chapters = []
            state.chaptersError = null
            state.chaptersLoading = false
            state.singleChapter = null
            state.singleChapterError = null
            state.singleChapterLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChapters.pending, (state) => {
                state.chaptersLoading = true
                state.chaptersError = null
            })
            .addCase(getChapters.fulfilled, (state, action) => {
                state.chaptersLoading = false
                state.chapters = action.payload.documents
                state.chaptersError = null
            })
            .addCase(getChapters.rejected, (state, action) => {
                state.chaptersLoading = false
                state.chaptersError = action.error.message
            })
            .addCase(getSingleChapter.pending, (state) => {
                state.singleChapterLoading = true
                state.singleChapterError = null
            })
            .addCase(getSingleChapter.fulfilled, (state, action) => {
                state.singleChapterLoading = false
                state.singleChapterError = null
                state.singleChapter = action.payload
            })
            .addCase(getSingleChapter.rejected, (state, action) => {
                state.singleChapterLoading = false
                state.singleChapterError = action.error.message
            })
            .addCase(addChapter.pending, (state) => {
                state.chaptersLoading = true
                state.chaptersError = null
            })
            .addCase(addChapter.fulfilled, (state, action) => {
                state.chaptersLoading = false
                state.chapters.push(action.payload)
                state.chaptersError = null
            })
            .addCase(addChapter.rejected, (state, action) => {
                state.chaptersLoading = false
                state.chaptersError = action.error.message
            })
            .addCase(deleteChapter.pending, (state) => {
                state.chaptersLoading = true
                state.chaptersError = null
            })
            .addCase(deleteChapter.fulfilled, (state, action) => {
                state.chaptersLoading = false
                state.chapters = state.chapters.filter((chapter) => chapter.$id !== action.payload)
                if(state.singleChapter && state.singleChapter.$id === action.payload){
                    state.singleChapter = null
                    state.singleChapterError = null
                    state.singleChapterLoading = false
                }
            })
            .addCase(deleteChapter.rejected, (state, action) => {
                state.chaptersLoading = false
                state.chaptersError = action.error.message
            })
            .addCase(updateChapter.pending, (state) => {
                state.chaptersLoading = true
                state.chaptersError = null
            })
            .addCase(updateChapter.fulfilled, (state, action) => {
                state.chaptersLoading = false
                const chapterIndex = state.chapters.findIndex((chapter) => chapter.$id === action.payload.$id)
                if (chapterIndex !== -1) {
                    state.chapters[chapterIndex] = action.payload
                }
                state.chaptersError = null
            })
            .addCase(updateChapter.rejected, (state, action) => {
                state.chaptersLoading = false
                state.chaptersError = action.error.message
            })
    }
})


export const {clearChaptersSlice} = storyChaptersSlice.actions
export default storyChaptersSlice.reducer