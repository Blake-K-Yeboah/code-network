// Styles
import styles from "./styles";

// Redux Hook
import { useSelector } from "react-redux";

// Post Component
import Post from "../Post";

// Prop Types
import PropTypes from "prop-types";

const Posts = ({ username }) => {
    const posts = useSelector((state) => state.posts.posts);

    const loaders = (
        <>
            <div className={styles.loader} />
            <div className={styles.loader} />
            <div className={styles.loader} />
        </>
    );

    const displayPosts =
        posts && username
            ? posts.filter((post) => post.author.username === username)
            : posts;

    return (
        <div className={styles.container}>
            {!displayPosts ? (
                loaders
            ) : displayPosts.length === 0 ? (
                <>
                    <div className={styles.noPosts}>
                        <p className={styles.text}>This user has no posts.</p>
                    </div>
                </>
            ) : (
                displayPosts.map((post) => {
                    return <Post post={post} key={post._id} />;
                })
            )}
        </div>
    );
};

Posts.propTypes = {
    username: PropTypes.string,
};

export default Posts;
