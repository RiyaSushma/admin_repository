import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../Services/authService';

export const initialState = {
    isAuthenticated: false,
    authError: null,
    user: null,
    authToken: null,
    loading: false
}

export const createUser = createAsyncThunk("auth/create-user", async (userDetails, { rejectWithValue }) => {
    try {
        return await registerUser(userDetails);
    } catch(error) {
        return rejectWithValue(error.message || "Failed to create user");
    }
});

// createasyncthunk is a middleware that allo

export const authenticateUser = createAsyncThunk("auth/login-user", async(userloginDetails, { rejectWithValue }) => {
    try {
        return await loginUser(userloginDetails);
    } catch(error) {
        return rejectWithValue(error.message || "Failed to authenticate user");
    }
});

export const logoutUser = createAsyncThunk("auth/logout-user", async() => {
    logout();
});

// there are promises

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.authError = null;
            state.user = {...action.payload.user};    
        })
        .addCase(createUser.rejected, (state, action) => {
            state.authError = true;
            state.loading = false;
            state.user = null;
        })
        .addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
            state.authError = false;
            state.authToken = action.payload.authToken;
            state.isAuthenticated = true;
            state.loading = false;
            state.user = {...action.payload.user};
        })
        .addCase(authenticateUser.rejected, (state, action) => {
            state.authError = true;
            state.authToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        })
        .addCase(logoutUser.fulfilled, (state) => { 
            state.isAuthenticated = false;
            state.user = null;
            state.authToken = null;
         })
    }
});

export default authSlice.reducer;