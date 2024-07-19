import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import databaseConfi from "../appwrite/DatabaseConfi";
import { Query } from "appwrite";

export const postsFetch = createAsyncThunk(
    'Posts/FetchPosts',
    async() => {
      const posts = await databaseConfi.listPosts()
      if(posts.error){
        throw new Error(posts.error) 
      }
      return posts.documents
    }
)


export const addPost = createAsyncThunk(
    'Posts/AddPost',
    async({title, content, coverImage, userID, status}) => {
        const addedPost = await databaseConfi.createPost({ title: title, content:content, coverImage:coverImage, userID:userID, status:status})
        if(addedPost.error){
            throw new Error(addedPost.error) 
        }        
        return addedPost
    }
)

export const updatePost = createAsyncThunk(
    'Posts/UpdatePost',
    async({Id, title, content, coverImage, status}) => {
        const updatedPost = await databaseConfi.updatePost(Id, {title: title, content:content, coverImage:coverImage, status:status})
        if(updatedPost.error){
            throw new Error(updatedPost.error)
        }
        return updatedPost
    }
)

export const deletePost = createAsyncThunk(
    'Posts/DeletePost',
    async({Id , FEATUREDIMG}) => {
        const deletedPost = await databaseConfi.deletePost(Id)
        if(deletedPost.error){
            throw new Error(deletedPost.error)
        }else if(deletedPost){
            const deletefile = await databaseConfi.deleteFile(FEATUREDIMG)
            if(deletefile.error){
                throw new Error(deletefile.error)
            }
            return Id
        }
    }
)

export const getPost = createAsyncThunk(
    'Posts/getPostById',
    async({Id, queries}, ThunkAPI) => {
        const {getState} = ThunkAPI
        const post = getState().posts.AllPost
        const existingPost = post.find(post => post.$id === Id)
        if(existingPost){
            return existingPost
        }
        const responsePost = await databaseConfi.getPost({id :Id, queries:queries})
        if(responsePost.error){
            throw new Error(post.error)
        }
        return responsePost
    }
)


export const userPost = createAsyncThunk(
    'Posts/getUserPostsById',
    async(id, {getState, rejectWithValue}) => {
        const userData = getState().auth.userData
        const userId = userData?.$id
        if(!userId){
            return rejectWithValue('User ID not Found')
        }
        const queries = [Query.equal('USERID', id)]
        const response = await databaseConfi.listPosts(queries)
        if(response.error){
            return rejectWithValue(response.error) 
          }
          return response.documents
    }
)


const initialState = {
    AllPost: [],
    AllPostLoading: false,
    AllPostError: null,
    singlePost: null,
    singlePostLoading: false,
    singlePostError: null,
    AllUserPost: [],
    AllUserPostError: null,
    AllUserPostLoading: false,
    addPostLoading: false,
    addPostError: null,
    updatePostLoading: false,
    updatePostError: null,
    deletePostLoading: false,
    deletePostError: null,
}

const postsSlice= createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearPostsSlice: (state) => {
        state.AllPost =  []
        state.AllPostLoading =  false
        state.AllPostError = null
        state.singlePost = null
        state.singlePostLoading =  false
        state.singlePostError = null
        state.AllUserPost = []
        state.AllUserPostError = null
        state.AllUserPostLoading = false
        state.addPostLoading = false
        state.addPostError = null
        state.updatePostLoading = false
        state.updatePostError = null
        state.deletePostLoading = false
        state.deletePostError = null
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(postsFetch.pending, (state) => {
            state.AllPostLoading = true
            state.AllPostError = null
        })
        .addCase(postsFetch.fulfilled, (state, action) => {
            state.AllPostLoading = false
            state.AllPost = action.payload
            state.AllPostError = null
        })
        .addCase(postsFetch.rejected, (state, action) => {
            state.AllPostLoading = false
            state.AllPostError = action.error.message
        })
        .addCase(getPost.pending, (state) => {
            state.singlePostLoading = true
            state.singlePostError = null
        })
        .addCase(getPost.fulfilled, (state, action) => {
            state.singlePostLoading = false
            state.singlePost = action.payload
            state.singlePostError = null
        })
        .addCase(getPost.rejected, (state, action) => {
            state.singlePostLoading = false
            state.singlePostError = action.error.message
        })
        .addCase(addPost.pending, (state) =>{
            state.addPostLoading = true
            state.addPostError = null
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.addPostLoading = false
            state.AllPost.push(action.payload)
            state.addPostError = null
        })
        .addCase(addPost.rejected, (state, action) => { 
            state.addPostLoading = false
            state.addPostError = action.error.message
        })
        .addCase(deletePost.pending, (state) =>{
            state.deletePostLoading = true
            state.deletePostError = null
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.deletePostLoading = false 
            state.AllPost = state.AllPost.filter((post) => post.$id !== action.payload)
            if(state.post && state.post.$id == action.payload){
                state.singlePost = null
                state.singlePostError = null 
                state.singlePostLoading = false
            }
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.deletePostLoading = false
            state.deletePostError = action.error.message
        })
        .addCase(updatePost.pending, (state) => {
            state.updatePostLoading = true
            state.updatePostError = null
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            state.updatePostLoading = false
            const index = state.AllPost.findIndex((post) => post.$id === action.payload.$id)
            if(index !== -1){
                state.AllPost[index] = action.payload
            }
        })
        .addCase(updatePost.rejected, (state, action) => {
            state.updatePostLoading = false
            state.updatePostError = action.error.message
        })
        .addCase(userPost.pending, (state) => {
            state.AllUserPostLoading = true
            state.AllUserPostError = null
        })
        .addCase(userPost.fulfilled, (state, action) => {
            state.AllUserPostLoading = false
            state.AllUserPost = action.payload
        })
        .addCase(userPost.rejected, (state, action) => {
            state.AllUserPostLoading = false
            state.AllUserPostError = action.payload
        })

    }

})

export const {clearPostsSlice} = postsSlice.actions

export default postsSlice.reducer