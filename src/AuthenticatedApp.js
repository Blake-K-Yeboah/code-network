// React Router Stuff
import { Routes, Route } from "react-router-dom";

const AuthenticatedApp = () => {
    return (
        <Routes>
            <Route path="/" element={<h1>Hello Mr. Authenticated App</h1>} />
        </Routes>
    );
};

export default AuthenticatedApp;
