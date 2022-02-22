// Styles
import styles from "./styles.js";

// useState & useEffect
import { useState, useEffect } from "react";

// Icons
import { FiArrowUpLeft } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Link Component
import { Link } from "react-router-dom";

// Framer Motion
import { motion } from "framer-motion";

// React Toast
import { ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const inputChangeHandler = (e) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    const formHandler = (e) => {
        e.preventDefault();
        console.table(userInput);
        setError("An error occured.");

        // TODO: Make Register Request
    };

    const [passwordInputType, setPasswordInputType] = useState("password");

    const eyeClickHandler = () => {
        setPasswordInputType(
            passwordInputType === "password" ? "text" : "password"
        );
    };

    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setError(null);
        }
    }, [error]);

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={styles.largeContainer}>
                <motion.div
                    animate={{ y: [75, 0], opacity: [0, 1] }}
                    transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
                    className={styles.container}
                >
                    <h2 className={styles.title}>Create An Account</h2>
                    <form onSubmit={formHandler} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Name *</label>
                            <input
                                id="name"
                                onChange={inputChangeHandler}
                                className={`${styles.input} rounded-lg`}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Username *</label>
                            <div className={styles.inputGroup}>
                                <div
                                    className={`${styles.inputGroupBox} rounded-l-lg`}
                                >
                                    <span>@</span>
                                </div>
                                <input
                                    id="username"
                                    onChange={inputChangeHandler}
                                    className={`${styles.input} rounded-r-lg`}
                                    placeholder="Enter your desired username"
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email *</label>
                            <input
                                id="email"
                                type="email"
                                onChange={inputChangeHandler}
                                className={`${styles.input} rounded-lg`}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password *</label>
                            <div className={styles.inputGroup}>
                                <input
                                    id="password"
                                    type={passwordInputType}
                                    onChange={inputChangeHandler}
                                    className={`${styles.input} rounded-l-lg`}
                                    placeholder="Enter your password"
                                />
                                <div
                                    className={`${styles.inputGroupBox} rounded-r-lg`}
                                >
                                    <span>
                                        {passwordInputType === "password" ? (
                                            <FaEye
                                                className={styles.eye}
                                                onClick={eyeClickHandler}
                                            />
                                        ) : (
                                            <FaEyeSlash
                                                className={styles.eye}
                                                onClick={eyeClickHandler}
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${styles.formGroup} ${styles.formGroupCenter}`}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                                className={styles.primaryBtn}
                            >
                                Register
                            </motion.button>
                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    className={`${styles.secondaryBtn} ml-8`}
                                >
                                    Already have an account?
                                </motion.button>
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
            <Link to="/">
                <span className={styles.goBack}>
                    <FiArrowUpLeft className={styles.goBackIcon} /> Go back home
                </span>
            </Link>
        </>
    );
};

export default RegisterForm;
