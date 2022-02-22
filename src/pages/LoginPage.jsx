// useEffect Hook
import { useEffect } from "react";

// Helmet
import { Helmet } from "react-helmet";

// Components
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

const Login = () => {
    useEffect(() => {
        // Automatic dark mode on login page
        document.querySelector("body").classList.add("dark", "bg-slate-900");
    }, []);

    return (
        <>
            <Helmet>
                <title>Code Network - Login</title>
            </Helmet>
            <Navbar />
            <LoginForm />
        </>
    );
};

export default Login;
