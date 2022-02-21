import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        token: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload ? jwt_decode(action.payload) : null;
            state.isAuthenticated = action.payload ? true : false;
            state.token = action.payload || null;
        },
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
