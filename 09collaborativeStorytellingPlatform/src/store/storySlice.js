import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import NewDatabase from "../appwrite/Database";


const initialState = {
    stories: [],
    storiesError: null,
    storiesLoading: false,
    story: null,
    storyLoading: false,
    storyError: null,
}

export const getStories = createAsyncThunk(
    'story/getStories',
    async(queries) => {
        const response = await NewDatabase.listStories(queries)
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const getStory = createAsyncThunk(
    'story/getStory',
    async({Id, queries}) => {
        const response = await NewDatabase.getStory({Id, queries})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const deleteStory = createAsyncThunk(
    'story/deleteStory',
    async({Id, Img}) => {
        const response = await NewDatabase.deleteStory({Id})
        if(response.error){
            throw new Error(response.error)
        }else if (response){
            const deleteFile = await NewDatabase.deleteFile(Img)
            if(deleteFile.error){
                throw new Error(deleteFile.error)
            }
            return Id
        }
    }
)

export const addStory = createAsyncThunk(
    'story/addStory',
    async({data}) => {
        console.log({...data})
        const response = await NewDatabase.createStory({...data})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const updateStory = createAsyncThunk(
    'story/updateStory',
    async({Id, data}) => {
        const response = await NewDatabase.updateStory(Id, {...data})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

const storySlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        clearStorySlice: (state) => {
            state.stories =  []
            state.storiesLoading =  false
            state.storiesError = null
            state.story = null
            state.storyLoading =  false
            state.storyError = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getStories.pending, (state) => {
            state.storiesLoading = true
            state.storiesError = null
        })
        .addCase(getStories.fulfilled, (state, action) => {
            state.storiesLoading = false
            state.stories = action.payload
            state.storiesError = null
        })
        .addCase(getStories.rejected, (state, action) => {
            state.storiesLoading = false
            state.storiesError = action.error.message
        })
        .addCase(getStory.pending, (state) => {
            state.storyLoading = true
            state.storyError = null
        })
        .addCase(getStory.fulfilled, (state, action) => {
            state.storyLoading = false
            state.story = action.payload
            state.storyError = null
        })
        .addCase(getStory.rejected, (state, action) => {
            state.storyLoading = false
            state.storyError = action.error.message
        })
        .addCase(deleteStory.pending, (state) => {
            state.storyLoading = true
            state.storyError = null
        })
        .addCase(deleteStory.fulfilled, (state, action) => {
            state.storyLoading = false
            state.stories = state.stories.filter((story) => story.$id !== action.payload)
            state.story = null
            state.storyError = null
        })
        .addCase(deleteStory.rejected, (state, action) => {
            state.storyLoading = false
            state.storyError = action.error.message
        })
        .addCase(addStory.pending, (state) => {
            state.storyLoading = true
            state.storyError = null
        })
        .addCase(addStory.fulfilled, (state, action) => {
            state.storyLoading = false
            state.story = action.payload
            state.storyError = null
        })
        .addCase(addStory.rejected, (state, action) => {
            state.storyLoading = false
            state.storyError = action.error.message
        })
        .addCase(updateStory.pending, (state) => {
            state.storyLoading = true
            state.storyError = null
        })
        .addCase(updateStory.fulfilled, (state, action) => {
            state.storyLoading = false
            state.story = action.payload
            const index = state.stories.findIndex((story) => story.$id === action.payload.$id)
            if(index !== -1){
                state.stories[index] = action.payload
            }
            state.storyError = null
        })
        .addCase(updateStory.rejected, (state, action) => {
            state.storyLoading = false
            state.storyError = action.error.message
        })
    }
})

export const {clearStorySlice} = storySlice.actions
export default storySlice.reducer