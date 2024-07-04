import { createSlice,  } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../appwrite/auth";
const initialState = {
    status: false,
    sessionData: null,
    userData: null,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async({email, password}) => {
        const response = await AuthService.login({email, password})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
    
)

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async({email, password, name}) => {
        const response = await AuthService.createAccount({email, password, name})
        if(response.error){
            throw new Error(response.error)
        }
        return response
    }
    
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async() => {
        const response = await AuthService.logout()
        if(response.error){
            throw new Error(response.error)
        }
        return true
    }
)

export const fetchUserDataAndSessionData = createAsyncThunk(
    'auth/fetchUserDataAndSessionData',
    async() => {
        const response = await AuthService.getCurrentUser()
        if(response.error){
            throw new Error(response.error)
        }else if(response){
            const sessionData = await AuthService.getCurrentUserSession()
            if(sessionData.error){
                throw new Error(sessionData.error)
            }
            return {userData: response, sessionData:sessionData}
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.sessionData = action.payload
            state.status = true
            state.error = null
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false
            state.sessionData = null
            state.userData = null
            state.status = false
            state.error = null
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(fetchUserDataAndSessionData.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchUserDataAndSessionData.fulfilled, (state, action) => {
            state.loading = false
            state.userData = action.payload.userData
            state.sessionData = action.payload.sessionData
            state.status = true
            state.error = null  
        })
        .addCase(fetchUserDataAndSessionData.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.userData = null
            state.sessionData = null
            state.status = false
        })
        .addCase(signupUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false
            state.sessionData = action.payload.sessionData,
            state.userData = action.payload.userData
            state.status = true
            state.error = null
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})


export default authSlice.reducer