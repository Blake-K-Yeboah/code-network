// useState hook
import { useState } from "react";

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
    AiOutlineSend,
} from "react-icons/ai";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../slices/postsSlice";

// React Toast
import { toast } from "react-toastify";

// Axios
import axios from "axios";

// Framer Motion
import { AnimatePresence, motion } from "framer-motion";

// Components
import Comment from "../Comment";
import PostSettings from "../PostSettings";

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

    const [commentShow, setCommentShow] = useState(false);
    const [comment, setComment] = useState("");

    const commentHandler = async () => {
        if (!comment) {
            toast.error("Please enter a comment", { theme: "colored" });
        } else {
            const body = { body: comment };
            const config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };

            try {
                const res = await axios.put(
                    `/api/posts-comment?postId=${post._id}`,
                    body,
                    config
                );
                dispatch(updatePost(res.data));
                toast.success("Commented.", { theme: "colored" });
                setComment("");
            } catch (err) {
                toast.error("An error occured.", { theme: "colored" });
            }
        }
    };

    const [settingsShow, setSettingsShow] = useState(false);

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
                        @{post.author.username}
                    </Link>
                    <p className={styles.time}>
                        Posted {timeSince(new Date(post.createdAt))} ago
                    </p>
                </div>
            </div>
            <div className={styles.content}>
                <h5 className={styles.title}>{post.title}</h5>
                <p className={styles.body}>{post.body}</p>
            </div>
            <div className={styles.actions}>
                <span
                    className={`${styles.actionBtn} ${
                        userLikesPost
                            ? styles.primaryActionBtn
                            : styles.normalActionBtn
                    } mr-6`}
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
                    } mr-6`}
                    onClick={dislikePostHandler}
                >
                    {userDislikesPost ? (
                        <AiFillDislike className={styles.icon} />
                    ) : (
                        <AiOutlineDislike className={styles.icon} />
                    )}
                    {post.dislikes.length}
                </span>
                <span
                    onClick={() => {
                        setCommentShow(!commentShow);
                        setSettingsShow(false);
                    }}
                    className={`${styles.actionBtn} ${styles.normalActionBtn}  ${styles.specialBtn} mr-6`}
                >
                    <AiOutlineComment className={styles.icon} />
                    {post.comments.length} Comments
                </span>
                {post.author.username === user.username && (
                    <span
                        onClick={() => {
                            setSettingsShow(!settingsShow);
                            setCommentShow(false);
                        }}
                        className={`${styles.actionBtn} ${styles.normalActionBtn} ${styles.specialBtn}`}
                    >
                        <AiOutlineSetting className={styles.icon} />
                        Post Settings
                    </span>
                )}
            </div>
            <AnimatePresence initial={false} exitBeforeEnter={true}>
                {commentShow && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.commentSection}
                    >
                        <h5 className={styles.commentHeading}>
                            Write A Comment
                        </h5>
                        <input
                            className={styles.writeACommentInput}
                            value={comment}
                            placeholder="Your comment..."
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <AiOutlineSend
                            className={styles.commentIcon}
                            onClick={commentHandler}
                        ></AiOutlineSend>
                        {post.comments.length > 0 ? (
                            post.comments.map((c) => (
                                <Comment
                                    comment={c}
                                    key={c._id}
                                    timeSince={timeSince}
                                    post={post}
                                />
                            ))
                        ) : (
                            <p className={styles.noComments}>
                                No one has commented yet.
                            </p>
                        )}
                    </motion.div>
                )}
                {settingsShow && <PostSettings post={post} />}
            </AnimatePresence>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
