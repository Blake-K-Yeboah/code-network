// useEffect hook
import { useEffect } from "react";

// React Router Stuff
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const UnauthenticatedApp = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path="/">
                <Route index element={<LandingPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
};

export default UnauthenticatedApp;
