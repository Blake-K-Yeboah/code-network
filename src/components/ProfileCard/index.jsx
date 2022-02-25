// Styles
import styles from "./styles";

// Redux
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = () => {
    const user = useSelector((state) => state.auth.user);
    const users = useSelector((state) => state.users.users);

    const followingCount = users
        ? users.filter((u) =>
              u.followers.some(
                  (follower) => follower.username === user.username
              )
          ).length
        : "...";

    return (
        <div className={styles.box}>
            <div className={styles.gradientHeader} />
            <img
                className={styles.profilePic}
                src={`/img/profilePics/${user.profilePic}`}
                alt={user.name}
            />
            <h5 className={styles.name}>{user.name}</h5>
            <p className={styles.headline}>{user.headline}</p>
            <div className={`${styles.statGroup} mt-6 border-y-2`}>
                <span className={styles.statTitle}>Following</span>
                <span className={styles.statFigure}>{followingCount}</span>
            </div>
            <div className={`${styles.statGroup} border-b-2`}>
                <span className={styles.statTitle}>Followers</span>
                <span className={styles.statFigure}>
                    {user.followers.length}
                </span>
            </div>
            <div className={styles.linkContainer}>
                <Link className={styles.link} to={`/users/${user.username}`}>
                    View Profile
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;
