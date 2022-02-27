// Styles
import styles from "./styles";

// Prop Types
import PropTypes from "prop-types";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../slices/usersSlice";

// axios
import axios from "axios";

// Toast
import { toast } from "react-toastify";

const Profile = ({ user }) => {
    const authUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const isFollowing = user
        ? user.followers.some(
              (follower) => follower.username === authUser.username
          )
        : false;

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

    const followerCount = user ? user.followers.length : "...";

    return (
        <>
            {!user ? (
                <div className={styles.loader} />
            ) : (
                <div className={styles.box}>
                    <div className={styles.header} />
                    <div className={styles.container}>
                        <div className="flex">
                            <img
                                className={styles.profilePic}
                                src={`/img/profilePics/${user.profilePic}`}
                                alt="Profile Pic"
                            />
                            <div className={styles.details}>
                                <h5 className={styles.name}>{user.name}</h5>
                                <p className={styles.headline}>
                                    {user.headline || "No Headline"}
                                </p>
                            </div>
                        </div>
                        {user.username !== authUser.username ? (
                            <button
                                className={`${styles.btn} ${
                                    isFollowing
                                        ? styles.secondaryBtn
                                        : styles.primaryBtn
                                }`}
                                onClick={followHandler}
                            >
                                {isFollowing ? "Following" : "Follow"}{" "}
                                {followerCount}
                            </button>
                        ) : (
                            <button
                                disabled
                                className={`${styles.btn} ${styles.disabledBtn}`}
                            >
                                Follow {followerCount}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

Profile.propTypes = {
    user: PropTypes.object,
};

export default Profile;
