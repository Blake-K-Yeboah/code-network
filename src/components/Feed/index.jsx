// Styles
import styles from "./styles";

// Components
import ProfileCard from "../ProfileCard";
import CopyrightCard from "../CopyrightCard";
import Actions from "../Actions";
import Posts from "../Posts";
import TriviaPreview from "../TriviaPreview";
import UsersToFollow from "../UsersToFollow";

// Prop Types
import PropTypes from "prop-types";

// Framer Motion
import { motion } from "framer-motion";

const Feed = ({ type }) => {
    return (
        <main className={styles.grid}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.75,
                }}
            >
                <ProfileCard />
                <CopyrightCard />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.spanTwo}
                transition={{
                    ease: "easeInOut",
                    duration: 0.75,
                }}
            >
                {type === "home" && (
                    <>
                        <Actions />
                        <Posts />
                    </>
                )}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.75,
                }}
            >
                {type === "home" && (
                    <>
                        <TriviaPreview />
                        <UsersToFollow />
                    </>
                )}
            </motion.div>
        </main>
    );
};

Feed.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Feed;
