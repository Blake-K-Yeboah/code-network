// React Router Dom
import { Link } from "react-router-dom";

// Icons
import { FaLevelDownAlt } from "react-icons/fa";

// Styles
import styles from "./styles.js";

// Framer Motion
import { motion } from "framer-motion";

const Header = () => {
    const learnMoreHandler = () => {
        window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
        });
    };
    return (
        <header className={styles.header}>
            <motion.div
                animate={{ y: [100, 0], opacity: [0, 1] }}
                transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
            >
                <h2 className={styles.h2}>
                    Welcome To a New
                    <span className={styles.h2Gradient}>digital world</span>
                </h2>
                <p className={styles.paragraph}>
                    Code Network is an open-source social platform that allows
                    you to meet other developers with similar interests, play
                    tech trivia and share resources with the awesome tech
                    community.
                </p>
                <div className={styles.div}>
                    <Link to="/register">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className={`${styles.btn} ${styles.btnPrimary}`}
                        >
                            Create an account
                        </motion.button>
                    </Link>
                    <Link to="/login">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className={`${styles.btn} ${styles.btnSecondary}`}
                        >
                            Login
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
            <span className={styles.learnMore} onClick={learnMoreHandler}>
                Learn More <FaLevelDownAlt className={styles.learnMoreIcon} />
            </span>
        </header>
    );
};

export default Header;
