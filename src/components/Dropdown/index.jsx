// useState hook
import { useState } from "react";

// Styles
import styles from "./styles";

// Icons
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../slices/authSlice";

// Framer Motion
import { AnimatePresence, motion } from "framer-motion";

// React Router Dom Stuff
import { NavLink, useNavigate } from "react-router-dom";

// React Toast
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Dropdown = () => {
    const [show, setShow] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const toggleDropdown = () => setShow(!show);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/login");
    };

    const darkModeHandler = async () => {
        try {
            const res = await axios.put(
                "/api/users-update",
                { darkMode: !user.darkMode },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(setUser(res.data.token));
            localStorage.setItem("token", res.data.token);
            toast.success("Preferences Updated", {
                theme: "colored",
            });
        } catch (err) {
            toast.error("An error occured.", {
                theme: "colored",
            });
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
            />
            <div className={styles.toggler} onClick={toggleDropdown}>
                <FaUserCircle className={styles.userIcon} />
                <span>{user.name}</span>
                {show ? (
                    <FaChevronUp className={styles.chevron} />
                ) : (
                    <FaChevronDown className={styles.chevron} />
                )}
            </div>
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplte={() => null}
            >
                {show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.dropdown}
                    >
                        <NavLink
                            to={`/users/${user.username}`}
                            className={styles.dropdownText}
                        >
                            View Profile
                        </NavLink>
                        <span
                            className={styles.dropdownText}
                            onClick={darkModeHandler}
                        >
                            Dark Theme: {user.darkMode ? "ON" : "OFF"}
                        </span>
                        <span
                            className={styles.dropdownText}
                            onClick={logoutHandler}
                        >
                            Logout
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Dropdown;
