// Styles
import styles from "./styles";

// Proptypes
import PropTypes from "prop-types";

// Link
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../slices/postsSlice";

// Icons
import { BsTrash } from "react-icons/bs";

// Axios
import axios from "axios";

// Toast
import { toast } from "react-toastify";

const Comment = ({ comment, timeSince, post }) => {
    const authUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const dispatch = useDispatch();

    const deleteComment = async () => {
        try {
            const res = await axios.delete(
                `/api/posts-delete-comment?postId=${post._id}&commentId=${comment._id}`,
                { headers: { authorization: `Bearer ${token}` } }
            );
            dispatch(updatePost(res.data));
            toast.success("Comment Deleted", { theme: "colored" });
        } catch (error) {
            toast.error("An error occured.", { theme: "colored" });
        }
    };

    return (
        <div className={styles.comment}>
            <div>
                <p>
                    <Link
                        to={`/users/${comment.username}`}
                        className={styles.username}
                    >
                        @{comment.username} -{" "}
                    </Link>
                    <span className={styles.time}>
                        {timeSince(new Date(comment.date))} ago
                    </span>
                </p>
                <p className={styles.text}>{comment.text}</p>
            </div>
            {(authUser.username === comment.username ||
                authUser.username === post.author.username) && (
                <BsTrash
                    className={styles.deleteIcon}
                    onClick={deleteComment}
                />
            )}
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    timeSince: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

export default Comment;
