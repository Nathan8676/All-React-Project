import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import NewDatabase from '../appwrite/Database';
import AuthService from '../appwrite/auth';
const initialState = {
    userProfile: null,
    userProfileError: null,
    userProfileLoading: false,
};

export const getUserProfile = createAsyncThunk(
    'userProfile/getUserProfile',
    async({Id}) => {
        const response = await NewDatabase.getUserProfile(Id)
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const updateUserProfile = createAsyncThunk(
    'userProfile/updateUserProfile',
    async({Id, data}) => {
        const response = await NewDatabase.updateUserProfile(Id, {...data})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

export const deleteUserProfile = createAsyncThunk(
    'userProfile/deleteUserProfile',
   async ({Id}) => {
       const response = await NewDatabase.deleteUserProfile(Id)
       if(response.error){
           throw new Error(response.error)
       }
       if(response){
        const result = await AuthService.deleteAccount()
        if(result.error){
            throw new Error(result.error)
        }
        return true
       }
   }
)

export const addUserProfile = createAsyncThunk(
    'userProfile/addUserProfile',
    async({data}, ) => {
        const response = await NewDatabase.createUserProfile(data)
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
)

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.userProfileLoading = true;
                state.userProfileError = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfileLoading = false;
                state.userProfile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.userProfileLoading = false;
                state.userProfileError = action.error.message;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.userProfileLoading = true;
                state.userProfileError = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.userProfileLoading = false;
                state.userProfile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.userProfileLoading = false;
                state.userProfileError = action.error.message;
            })
            .addCase(deleteUserProfile.pending, (state) => {
                state.userProfileLoading = true;
                state.userProfileError = null;
            })
            .addCase(deleteUserProfile.fulfilled, (state, _action) => {
                state.userProfileLoading = false;
                state.userProfile = null;
            })
            .addCase(deleteUserProfile.rejected, (state, action) => {
                state.userProfileLoading = false;
                state.userProfileError = action.error.message;
            })
            .addCase(addUserProfile.pending, (state) => {
                state.userProfileLoading = true;
                state.userProfileError = null;
            })
            .addCase(addUserProfile.fulfilled, (state, action) => {
                state.userProfileLoading = false;
                state.userProfile = action.payload;
            })
            .addCase(addUserProfile.rejected, (state, action) => {
                state.userProfileLoading = false;
                state.userProfileError = action.error.message;
            })
        }

})

export default userProfileSlice