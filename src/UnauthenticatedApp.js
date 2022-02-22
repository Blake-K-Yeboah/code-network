// React Router Stuff
import { Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const UnauthenticatedApp = () => {
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
