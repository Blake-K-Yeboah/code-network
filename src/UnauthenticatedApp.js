// React Router Stuff
import { Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";

const UnauthenticatedApp = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<LandingPage />} />
            </Route>
        </Routes>
    );
};

export default UnauthenticatedApp;
