// Styles
import styles from "./styles";

// Components
import ProfileCard from "../ProfileCard";
import CopyrightCard from "../CopyrightCard";
import Actions from "../Actions";
import Posts from "../Posts";
import TriviaPreview from "../TriviaPreview";
import UsersToFollow from "../UsersToFollow";
import WriteAPost from "../WriteAPost";
import MoreInfoCard from "../MoreInfoCard";
import Users from "../Users";

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
                {type === "posts" && (
                    <>
                        <WriteAPost />
                        <Posts />
                    </>
                )}
                {type === "users" && (
                    <>
                        <Users />
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
                {type === "posts" && (
                    <>
                        <MoreInfoCard />
                    </>
                )}
                {type === "users" && (
                    <>
                        <TriviaPreview />
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
