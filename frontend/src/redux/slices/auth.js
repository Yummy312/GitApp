import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../../../axios.js";
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async ( _, { rejectWithValue })=>{
    try{
        const{data} = await axios.get('/getUserData', {
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


const initialState = {
    data: null,
    error: null,
    render: false
}
const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers:{

            logout:(state)=>{
                state.data = null
            },
            updateUserData: (state, action)=>{
                state.data = action.payload
            }

        },
        extraReducers: (builder) => {
            builder.addCase(fetchAuthMe.pending, (state) => {
                state.error = null;
                state.data = null

            });
            builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload;
            });
            builder.addCase(fetchAuthMe.rejected, (state, action) => {
                state.error = action.payload;
                state.data = null
            });
        },
    }
)

export const selectIsAuth = (state) => state.auth.data;

export const {logout, updateUserData} = authSlice.actions
export const authReducer = authSlice.reducer