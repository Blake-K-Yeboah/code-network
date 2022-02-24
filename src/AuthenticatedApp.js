// useEffect hook
import { useEffect } from "react";

// React Router Stuff
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";

const AuthenticatedApp = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/">
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    );
};

export default AuthenticatedApp;
