import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../axios.js";
export const fetchUsers = createAsyncThunk('search/fetchUsers', async (searchQuery, {rejectWithValue}) =>{
    try{
        const{data} = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        })
        return data.items

    } catch (err) {
        return rejectWithValue(err.response.data)
    }

})

const initialState = {
    searchData: null

}
const searchSlice = createSlice(
    {
        name: 'search',
        initialState,
        reducers:{
            clearSearchData: (state)=>{
                state.searchData = null
            }

        },
        extraReducers: (builder) => {
            builder.addCase(fetchUsers.pending, (state) => {
                state.searchData = null
                state.error = null;
            });
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.searchData = action.payload;
            });
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.payload;
                state.searchData = null
            });



        },
    }
)

export const selectSearchData = (state) => state.search.searchData;
export const {clearSearchData} = searchSlice.actions
export const searchReducer = searchSlice.reducer