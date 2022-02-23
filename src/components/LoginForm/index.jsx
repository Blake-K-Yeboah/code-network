// Styles
import styles from "./styles.js";

// useState & useEffect
import { useState, useEffect } from "react";

// Icons
import { FiArrowUpLeft } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Link Component
import { Link, useNavigate } from "react-router-dom";

// Framer Motion
import { motion } from "framer-motion";

// React Toast
import { ToastContainer, toast } from "react-toastify";

// Axios
import axios from "axios";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/authSlice";

const LoginForm = () => {
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });

    const inputChangeHandler = (e) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    };

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await axios.post("/api/auth-login", userInput);
            dispatch(setUser(res.data.token));
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (error) {
            setError(error.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    };

    const formHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        login();
    };

    const [passwordInputType, setPasswordInputType] = useState("password");

    const eyeClickHandler = () => {
        setPasswordInputType(
            passwordInputType === "password" ? "text" : "password"
        );
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                theme: "colored",
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
                    <h2 className={styles.title}>Login</h2>
                    <form onSubmit={formHandler} className={styles.form}>
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
                                {isLoading ? "Loading..." : "Login"}
                            </motion.button>
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    className={`${styles.secondaryBtn} mt-8 sm:mt-0 sm:ml-8`}
                                >
                                    Don't have an account?
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

export default LoginForm;
