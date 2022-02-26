// useEffect hook
import { useEffect } from "react";

// React Router Stuff
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import UsersPage from "./pages/UsersPage";

const AuthenticatedApp = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="posts">
                    <Route index element={<PostsPage />} />
                </Route>
                <Route path="users">
                    <Route index element={<UsersPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AuthenticatedApp;
