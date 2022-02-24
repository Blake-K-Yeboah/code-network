// Styles
import styles from "./styles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/authSlice";

// Framer Motion
import { motion } from "framer-motion";

// Prop Types
import PropTypes from "prop-types";

// useState hook
import { useState } from "react";

// React Toast
import { ToastContainer, toast } from "react-toastify";

// Axios
import axios from "axios";

const ModalStep = ({ step, nextStep, prevStep }) => {
    const [headline, setHeadline] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [darkMode, setDarkMode] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const titles = [
        <>
            Welcome, <span className={styles.textGradient}>{user.name}</span>!
        </>,

        <>
            Your <span className={styles.textGradient}>Headline</span>
        </>,

        <>
            Your <span className={styles.textGradient}>Profile Picture</span>
        </>,

        <>
            Enable <span className={styles.textGradient}>Dark Mode</span>
        </>,
    ];

    const paragraphs = [
        "There are a few steps you need to complete in order to complete your registration. This will only take a minute.",

        "Please enter a headline to be displayed on your profile. For example, 'Fullstack Developer', or 'Software Engineer', etc.",

        "Please select a user icon to use as your profile picture. You can always change this later in case you're unsure.",

        "Please select whether you want to enable dark mode or not. You can always change this late if you change your mind.",
    ];

    const dispatch = useDispatch();

    const finishHandler = async () => {
        const body = {
                headline,
                profilePic,
                darkMode,
            },
            config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };

        try {
            const res = await axios.put("/api/users-update", body, config);
            dispatch(setUser(res.data.token));
            localStorage.setItem("token", res.data.token);
            toast.success("Registration Complete");
        } catch (error) {
            toast.error("An error occured.");
        }
    };

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
                theme="colored"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.container}
            >
                <h1 className={styles.title}>{titles[step - 1]}</h1>
                <p className={styles.paragraph}>{paragraphs[step - 1]}</p>
                {step === 1 && (
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={nextStep}
                    >
                        Get Started
                    </motion.button>
                )}
                {step === 2 && (
                    <>
                        <input
                            className={styles.input}
                            placeholder="Enter headline"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`${styles.btn} ${styles.btnPrimary}`}
                            onClick={
                                headline
                                    ? nextStep
                                    : () =>
                                          toast.error("Please enter a headline")
                            }
                        >
                            Continue
                        </motion.button>
                    </>
                )}
                {step === 3 && (
                    <>
                        <div className={styles.profilePicGrid}>
                            {Array.from({ length: 4 }, (_, i) => i + 1).map(
                                (num) => (
                                    <div
                                        className={`${styles.gridBox} ${
                                            profilePic === `${num}.jpg` &&
                                            styles.activeBox
                                        }`}
                                        onClick={() =>
                                            setProfilePic(`${num}.jpg`)
                                        }
                                        key={num}
                                    >
                                        <img
                                            src={`/img/profilePics/${`${num}.jpg`}`}
                                            className={styles.profilePic}
                                            alt="Profile Pic"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                        <div className={styles.btnGroup}>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.btn} ${styles.btnSecondary}`}
                                onClick={prevStep}
                            >
                                Go Back
                            </motion.button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.btn} ${styles.btnPrimary}`}
                                onClick={
                                    profilePic
                                        ? nextStep
                                        : () =>
                                              toast.error(
                                                  "Please select a profile picture"
                                              )
                                }
                            >
                                Continue
                            </motion.button>
                        </div>
                    </>
                )}
                {step === 4 && (
                    <>
                        <div className={styles.darkModeGrid}>
                            <div
                                className={`${styles.gridBox} ${
                                    darkMode === false && styles.activeBox
                                }`}
                                onClick={() => setDarkMode(false)}
                            >
                                <div
                                    className={`${styles.circle} bg-white`}
                                ></div>
                                Light
                            </div>
                            <div
                                className={`${styles.gridBox} ${
                                    darkMode === true && styles.activeBox
                                }`}
                                onClick={() => setDarkMode(true)}
                            >
                                <div
                                    className={`${styles.circle} bg-slate-800`}
                                ></div>
                                Dark
                            </div>
                        </div>
                        <div className={styles.btnGroup}>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.btn} ${styles.btnSecondary}`}
                                onClick={prevStep}
                            >
                                Go Back
                            </motion.button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.btn} ${styles.btnPrimary}`}
                                onClick={
                                    darkMode
                                        ? finishHandler
                                        : () =>
                                              toast.error(
                                                  "Please select a mode"
                                              )
                                }
                            >
                                Finish
                            </motion.button>
                        </div>
                    </>
                )}
            </motion.div>
        </>
    );
};

ModalStep.propTypes = {
    step: PropTypes.number.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
};

export default ModalStep;
