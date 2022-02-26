import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(
                (user) => user._id === action.payload._id
            );
            state.users[index] = action.payload;
        },
    },
});

export const { setUsers, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
