import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: null,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(
                (post) => post._id !== action.payload
            );
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id
            );
            state.posts[index] = action.payload;
        },
    },
});

export const { setPosts, addPost, removePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
