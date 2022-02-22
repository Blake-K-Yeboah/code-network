// Redux
import { useSelector } from "react-redux";

// Styles
import styles from "./styles.js";

// Framer Motion
import { motion } from "framer-motion";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const brand = (
        <h2
            className={`${styles.brand} ${
                isAuthenticated ? "dark:text-black" : ""
            }`}
        >
            &lt;Code Network &#x2f;&gt;
        </h2>
    );

    return (
        <>
            {isAuthenticated ? (
                <nav className={`${styles.navbar} justify-between`}>
                    {brand}
                </nav>
            ) : (
                <motion.nav
                    animate={{ y: [-100, 0], opacity: [0, 1] }}
                    transition={{ ease: "easeOut", duration: 0.75 }}
                    className={`${styles.navbar} justify-center`}
                >
                    {brand}
                </motion.nav>
            )}
        </>
    );
};

export default Navbar;
