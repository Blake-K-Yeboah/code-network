// Styles
import styles from "./styles";

// Redux hooks
import { useSelector } from "react-redux";

// Link
import { Link } from "react-router-dom";

// Icons
import { FaPen, FaPlay } from "react-icons/fa";

const Actions = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className={styles.box}>
            <img
                className={styles.profilePic}
                alt={user.username}
                src={`/img/profilePics/${user.profilePic}`}
            />
            <div className={styles.btnGroup}>
                <Link
                    to="/trivia"
                    className={`${styles.btn} ${styles.outlineBtn}`}
                >
                    Play Tech Trivia
                    <FaPlay className={`${styles.btnIcon}`} />
                </Link>
                <Link
                    to="/posts"
                    className={`${styles.btn} ${styles.primaryBtn}`}
                >
                    Write a post
                    <FaPen className={styles.btnIcon} />
                </Link>
            </div>
        </div>
    );
};

export default Actions;
