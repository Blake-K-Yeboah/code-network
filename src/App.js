// useEffect Hook
import React, { useEffect } from "react";

// Import React Router Stuff
import { BrowserRouter } from "react-router-dom";

// useDispatch hook and useSelector hook
import { useDispatch, useSelector } from "react-redux";

// setUser action
import { setUser } from "./slices/authSlice";

// Apps
import UnauthenticatedApp from "./UnauthenticatedApp";
import AuthenticatedApp from "./AuthenticatedApp";

const App = () => {
    // Redux Dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            dispatch(setUser(token));
        }
    }, [dispatch]);

    // isAuthenticated
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user && user.darkMode) {
            document.querySelector("body").classList.add("dark");
        }
    }, [user]);

    return (
        <BrowserRouter>
            {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </BrowserRouter>
    );
};

export default App;
