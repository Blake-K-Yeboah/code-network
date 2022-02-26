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
import Profile from "../Profile";

// Prop Types
import PropTypes from "prop-types";

// Framer Motion
import { motion } from "framer-motion";

const Feed = ({ type, user }) => {
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
                {type === "profile" && (
                    <>
                        <Profile user={user} />
                        <Posts username={user.username} />
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
                {(type === "home" || type === "profile") && (
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
    user: PropTypes.object,
};

export default Feed;
