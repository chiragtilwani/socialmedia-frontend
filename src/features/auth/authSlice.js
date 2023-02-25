import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'// createAsyncThunk is a middleware by which we could have async functions for updating state(i.e updating state using server)

// get user from localstorage - using token stored in localStorage with key 'user'
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,//if there is user we will set initialState.user=user else initialState.user=null
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {//here user will be passed from register page
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, user)
        localStorage.setItem('user', JSON.stringify(res.data))//now res.data will also contain token
        return res.data
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();//bcz error can be in any of them
        return thunkAPI.rejectWithValue(message)//this will send error message as payload
    }
})//whatever this function will return will be payload which we will be using in extraReducers

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {//here user will be passed from register page
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, user)
        localStorage.setItem('user', JSON.stringify(res.data))//now res.data will also contain token
        return res.data
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();//bcz error can be in any of them
        return thunkAPI.rejectWithValue(message)//this will send error message as payload
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user')
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {//this function is used to reset values of isError, isLoading ,isSuccess ,message to initial values once we register or login for next tym usage
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {//for thunkFunctions
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload//value returned by register func in case of success
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload//thunkAPI.rejectWithValue in the case of error will add error message to payload of action
                state.isLoading = false
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload//value returned by login func in case of success
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload//thunkAPI.rejectWithValue in the case of error will add error message to payload of action
                state.isLoading = false
                state.user = null
            })
    }
})

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions

export default authSlice.reducer