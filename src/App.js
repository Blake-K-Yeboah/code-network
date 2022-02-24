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

// React Toastify Styling
import "react-toastify/dist/ReactToastify.min.css";

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

    // Dark Mode Functionality
    useEffect(() => {
        const enableDarkMode = () => {
            document.querySelector("body").classList.add("dark", "bg-gray-900");
            document.querySelector("body").classList.remove("bg-gray-100");
        };

        if (user && user.darkMode) {
            enableDarkMode();
        } else if (user) {
            document
                .querySelector("body")
                .classList.remove("dark", "bg-gray-900");
            document.querySelector("body").classList.add("bg-gray-100");
        } else {
            enableDarkMode();
        }
    }, [user]);

    return (
        <BrowserRouter>
            {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </BrowserRouter>
    );
};

export default App;
