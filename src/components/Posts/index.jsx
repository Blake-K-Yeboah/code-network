// Styles
import styles from "./styles";

// Redux Hook
import { useSelector } from "react-redux";

// Post Component
import Post from "../Post";

const Posts = () => {
    const posts = useSelector((state) => state.posts.posts);

    const loaders = (
        <>
            <div className={styles.loader} />
            <div className={styles.loader} />
            <div className={styles.loader} />
        </>
    );

    return (
        <div className={styles.container}>
            {!posts
                ? loaders
                : posts.map((post) => {
                      return <Post post={post} key={post._id} />;
                  })}
        </div>
    );
};

export default Posts;
