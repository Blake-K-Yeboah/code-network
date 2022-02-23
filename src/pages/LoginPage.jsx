// useEffect Hook
import { useEffect } from "react";

// Helmet
import { Helmet } from "react-helmet";

// Components
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

const Login = () => {
    useEffect(() => {
        // Automatic dark mode on login page
        document.querySelector("body").classList.add("dark", "bg-gray-900");
    }, []);

    return (
        <>
            <Helmet>
                <title>Code Network - Login</title>
            </Helmet>
            <Navbar />
            <LoginForm />
            <Footer />
        </>
    );
};

export default Login;
