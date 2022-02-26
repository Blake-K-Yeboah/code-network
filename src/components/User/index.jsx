// Styles
import styles from "./styles";

// Prop types
import PropTypes from "prop-types";

// Link Component
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../slices/usersSlice";

// axios
import axios from "axios";

// Toast
import { toast } from "react-toastify";

const User = ({ user }) => {
    const authUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const isFollowing = user.followers.some(
        (follower) => follower.username === authUser.username
    );

    const dispatch = useDispatch();

    const followHandler = async () => {
        try {
            const res = await axios.put(
                `/api/users-follow?username=${user.username}`,
                null,
                { headers: { authorization: `Bearer ${token}` } }
            );
            dispatch(updateUser(res.data));
            toast.success("Success!", { theme: "colored" });
        } catch (err) {
            toast.error("An error occured.", { theme: "colored" });
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.details}>
                <img
                    src={`/img/profilePics/${user.profilePic}`}
                    alt=""
                    className={styles.profilePic}
                />
                <div>
                    <Link
                        to={`/users/${user.username}`}
                        className={styles.name}
                    >
                        {user.name}
                    </Link>
                    <p className={styles.username}>@{user.username}</p>
                    <p className={styles.headline}>
                        {user.headline || "No Headline"}
                    </p>
                </div>
            </div>
            {user.username !== authUser.username ? (
                <button
                    className={`${styles.btn} ${
                        isFollowing ? styles.secondaryBtn : styles.primaryBtn
                    }`}
                    onClick={followHandler}
                >
                    {isFollowing ? "Following" : "Follow"}
                </button>
            ) : (
                <button
                    disabled
                    className={`${styles.btn} ${styles.disabledBtn}`}
                >
                    Follow
                </button>
            )}
        </div>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
};

export default User;
