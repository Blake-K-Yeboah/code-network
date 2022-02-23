// React Router Stuff
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";

const AuthenticatedApp = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    );
};

export default AuthenticatedApp;
