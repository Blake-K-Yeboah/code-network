// Styles
import styles from "./styles";

// Framer Motion
import { motion } from "framer-motion";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updatePost, removePost } from "../../slices/postsSlice";

// useState hook
import { useState } from "react";

// Axios
import axios from "axios";
import { toast } from "react-toastify";

const PostSettings = ({ post }) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const [postDetails, setPostDetails] = useState({
        title: post.title,
        body: post.body,
    });

    const inputOnChange = (e) => {
        setPostDetails({ ...postDetails, [e.target.id]: e.target.value });
    };

    const reqConfig = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        toast.info("Updating Post...", { theme: "colored" });

        try {
            const res = await axios.put(
                `/api/posts-update?postId=${post._id}`,
                postDetails,
                reqConfig
            );
            dispatch(updatePost(res.data));
            toast.success("Post Updated!", { theme: "colored" });
        } catch (err) {
            toast.error("An error occured.", { theme: "colored" });
        }
    };

    const deletePost = async () => {
        if (window.confirm("Are you sure you want to delete post?")) {
            toast.info("Deleting Post...", { theme: "colored" });

            try {
                const res = await axios.delete(
                    `/api/posts-delete?postId=${post._id}`,
                    reqConfig
                );
                dispatch(removePost(res.data._id));
                toast.success("Post Deleted!", { theme: "colored" });
            } catch (err) {
                toast.error("An error occured.", { theme: "colored" });
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.container}
        >
            <p className={styles.heading}>Edit Post</p>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Title</label>
                    <input
                        value={postDetails.title}
                        onChange={inputOnChange}
                        id="title"
                        placeholder="Post Title: "
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Body</label>
                    <textarea
                        value={postDetails.body}
                        onChange={inputOnChange}
                        id="body"
                        placeholder="Post Body: "
                        className={styles.input}
                    />
                </div>
                <div className={`${styles.formGroup} ${styles.formGroupFlex}`}>
                    <button type="submit" className={styles.submitBtn}>
                        Update Post
                    </button>
                    <p className={styles.or}>or</p>
                    <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={deletePost}
                    >
                        Delete Post
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default PostSettings;
