// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../slices/authSlice";

// Styles
import styles from "./styles.js";

// Framer Motion
import { motion } from "framer-motion";

// React Router Stuff
import { Link, useNavigate } from "react-router-dom";

// Icons
import {
    FaClone,
    FaDoorOpen,
    FaHome,
    FaQuestionCircle,
    FaUsers,
} from "react-icons/fa";

// Components
import Dropdown from "../Dropdown/index.jsx";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const brand = (
        <h2
            className={`${styles.brand} ${isAuthenticated && styles.authBrand}`}
        >
            &lt;Code Network &#x2f;&gt;
        </h2>
    );

    const navbarJustifyClass = isAuthenticated
        ? "justify-between"
        : "justify-center";

    const getActiveClass = (path) => {
        if (window.location.pathname === path) {
            return styles.activeLink;
        } else {
            return styles.notActiveLink;
        }
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/login");
    };

    const navLinks = (
        <div className={styles.navLinksContainer}>
            <Link to="/" className={`${styles.navLink} ${getActiveClass("/")}`}>
                <FaHome />
                Home
            </Link>
            <Link
                to="/users"
                className={`${styles.navLink} ${getActiveClass("/users")}`}
            >
                <FaUsers />
                Devs
            </Link>
            <Link
                to="/posts"
                className={`${styles.navLink} ${getActiveClass("/posts")}`}
            >
                <FaClone />
                Posts
            </Link>
            <Link
                to="/trivia"
                className={`${styles.navLink} ${getActiveClass("/trivia")}`}
            >
                <FaQuestionCircle />
                Trivia
            </Link>
            <span
                className={`${styles.navLink} ${styles.notActiveLink} ${styles.mobileLink}`}
                onClick={logoutHandler}
            >
                <FaDoorOpen />
                Logout
            </span>
        </div>
    );

    return (
        <motion.nav
            animate={{ y: [-100, 0], opacity: [0, 1] }}
            transition={{ ease: "easeOut", duration: 0.75 }}
            className={`${styles.navbar} ${navbarJustifyClass}`}
        >
            {brand}
            {isAuthenticated && (
                <>
                    {navLinks}
                    <div className={styles.dropdownContainer}>
                        <Dropdown />
                    </div>
                </>
            )}
        </motion.nav>
    );
};

export default Navbar;
