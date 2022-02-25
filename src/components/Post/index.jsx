// Styles
import styles from "./styles";

// Prop Types
import PropTypes from "prop-types";

// Link
import { Link } from "react-router-dom";

// Icons
import {
    AiFillDislike,
    AiFillLike,
    AiOutlineLike,
    AiOutlineDislike,
    AiOutlineComment,
    AiOutlineSetting,
} from "react-icons/ai";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../slices/postsSlice";

// React Toast
import { toast } from "react-toastify";

// Axios
import axios from "axios";

// Calculate Time Since Post
function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

const Post = ({ post }) => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const userLikesPost = post.likes.some(
        (like) => like.username === user.username
    );

    const userDislikesPost = post.dislikes.some(
        (dislike) => dislike.username === user.username
    );

    const dispatch = useDispatch();

    const likePostHandler = async () => {
        try {
            const res = await axios.put(
                `/api/posts-like?postId=${post._id}`,
                null,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(updatePost(res.data));
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const dislikePostHandler = async () => {
        try {
            const res = await axios.put(
                `/api/posts-dislike?postId=${post._id}`,
                null,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(updatePost(res.data));
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className={styles.post}>
            <div className={styles.postedBySection}>
                <img
                    src={`/img/profilePics/${post.author.profilePic}`}
                    className={styles.profilePic}
                    alt=""
                />
                <div>
                    <Link
                        to={`/users/${post.author.username}`}
                        className={styles.postedBy}
                    >
                        {post.author.username}
                    </Link>
                    <p className={styles.time}>
                        Posted {timeSince(new Date(post.createdAt))} ago
                    </p>
                </div>
            </div>
            <div className={styles.content}>
                <Link to={`/posts/${post._id}`} className={styles.title}>
                    {post.title}
                </Link>
                <p className={styles.body}>{post.body}</p>
            </div>
            <div className={styles.actions}>
                <span
                    className={`${styles.actionBtn} ${
                        userLikesPost
                            ? styles.primaryActionBtn
                            : styles.normalActionBtn
                    }`}
                    onClick={likePostHandler}
                >
                    {userLikesPost ? (
                        <AiFillLike className={styles.icon} />
                    ) : (
                        <AiOutlineLike className={styles.icon} />
                    )}
                    {post.likes.length}
                </span>
                <span
                    className={`${styles.actionBtn} ${
                        userDislikesPost
                            ? styles.primaryActionBtn
                            : styles.normalActionBtn
                    } ml-6`}
                    onClick={dislikePostHandler}
                >
                    {userDislikesPost ? (
                        <AiFillDislike className={styles.icon} />
                    ) : (
                        <AiOutlineDislike className={styles.icon} />
                    )}
                    {post.dislikes.length}
                </span>
                <Link
                    to={`/posts/${post._id}`}
                    className={`${styles.actionBtn} ${styles.normalActionBtn} ml-6`}
                >
                    <AiOutlineComment className={styles.icon} />
                    {post.comments.length} Comments
                </Link>
                {post.author.username === user.username && (
                    <Link
                        to={`/posts/${post._id}/settings`}
                        className={`${styles.actionBtn} ${styles.normalActionBtn} ml-6`}
                    >
                        <AiOutlineSetting className={styles.icon} />
                        Post Settings
                    </Link>
                )}
            </div>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
