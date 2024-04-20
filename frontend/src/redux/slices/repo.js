import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../axios.js";
export const fetchPublicRepositories = createAsyncThunk('repo/fetchPublicRepositories', async (_, {rejectWithValue}) =>{
    try{
        const{data} = await axios.get(`https://api.github.com/user/repos?type=public`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        })
        // console.log(data)
        return data

    } catch (err) {
        return rejectWithValue(err.response.data)
    }

})


export const fetchPrivateRepositories = createAsyncThunk('repo/fetchPrivateRepositories', async (_, {rejectWithValue}) =>{
    try{
        const{data} = await axios.get(`https://api.github.com/user/repos?visibility=private`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        })
        // console.log(data)
        return data

    } catch (err) {
        return rejectWithValue(err.response.data)
    }

})



export const fetchUserRepositories = createAsyncThunk('repo/fetchUserRepositories', async (username, {rejectWithValue}) =>{
    try{
        const{data} = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        })
        return data

    } catch (err) {
        return rejectWithValue(err.response.data)
    }

})

const initialState = {
    publicData: null,
    privateData: null,
    userRepos: null,


}
const repoSlice = createSlice(
    {
        name: 'repo',
        initialState,
        reducers:{
            clearPublicRepos: (state)=>{
                state.publicData = null
            },

            clearPrivateRepos:(state)=>{
                state.privateData =null
            },

            clearUserRepos:(state) =>{
                state.userRepos = null
            },




        },
        extraReducers: (builder) => {
            builder.addCase(fetchPublicRepositories.pending, (state) => {
                state.publicData = null
                state.error = null;
            });
            builder.addCase(fetchPublicRepositories.fulfilled, (state, action) => {
                state.publicData = action.payload;
            });
            builder.addCase(fetchPublicRepositories.rejected, (state, action) => {
                state.error = action.payload;
                state.publicData = null
            });
            builder.addCase(fetchPrivateRepositories.pending, (state) => {
                state.privateData = null
                state.error = null;
            });
            builder.addCase(fetchPrivateRepositories.fulfilled, (state, action) => {
                state.privateData = action.payload;
            });
            builder.addCase(fetchPrivateRepositories.rejected, (state, action) => {
                state.error = action.payload;
                state.privateData = null
            });

            builder.addCase(fetchUserRepositories.pending, (state) => {
                state.userRepos = null
                state.error = null;
            });
            builder.addCase(fetchUserRepositories.fulfilled, (state, action) => {
                state.userRepos = action.payload;
            });
            builder.addCase(fetchUserRepositories.rejected, (state, action) => {
                state.error = action.payload;
                state.userRepos = null
            });
        },
    }
)

export const selectPublicRepos = (state) => state.repo.publicData;
export const selectPrivateRepos = (state) => state.repo.privateData;
export const selectUserRepos = (state) => state.repo.userRepos;

export const {clearPublicRepos, clearPrivateRepos, clearUserRepos} = repoSlice.actions

export const repoReducer = repoSlice.reducer