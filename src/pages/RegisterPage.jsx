// useEffect Hook
import { useEffect } from "react";

// Helmet
import { Helmet } from "react-helmet";

// Components
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
    useEffect(() => {
        // Automatic dark mode on register page
        document.querySelector("body").classList.add("dark", "bg-gray-900");
    }, []);

    return (
        <>
            <Helmet>
                <title>Code Network - Register</title>
            </Helmet>
            <Navbar />
            <RegisterForm />
        </>
    );
};

export default Register;
