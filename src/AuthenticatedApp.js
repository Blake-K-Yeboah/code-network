// useEffect hook
import { useEffect } from "react";

// React Router Stuff
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import ProfilePage from "./pages/ProfilePage";
import TriviaPage from "./pages/TriviaPage";
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
                <Route path="posts" element={<PostsPage />} />
                <Route path="users">
                    <Route index element={<UsersPage />} />
                    <Route path=":username" element={<ProfilePage />} />
                </Route>
                <Route path="trivia" element={<TriviaPage />} />
            </Route>
        </Routes>
    );
};

export default AuthenticatedApp;
