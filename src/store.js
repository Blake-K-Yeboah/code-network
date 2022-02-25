import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import postsReducer from "./slices/postsSlice";

// Export store with all reducers
export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        posts: postsReducer,
    },
});
