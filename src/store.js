import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./slices/authSlice";

// Export store with all reducers
export default configureStore({
    reducer: {
        auth: authReducer,
    },
});
