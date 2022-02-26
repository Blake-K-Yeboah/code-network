// Styles
import styles from "./styles";

// Link Component
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Prop Types
import PropTypes from "prop-types";

// Individual User Component
const IndividualUser = ({ user }) => {
    return (
        <div className={styles.user}>
            <img
                src={`/img/profilePics/${user.profilePic}`}
                className={styles.profilePic}
                alt=""
            />
            <div>
                <Link
                    to={`/users/${user.username}`}
                    className={styles.username}
                >
                    {user.name}
                </Link>
                <p className={styles.headline}>
                    {user.headline || "No headline"}
                </p>
            </div>
        </div>
    );
};

IndividualUser.propTypes = {
    user: PropTypes.object.isRequired,
};

const UsersToFollow = () => {
    const authUser = useSelector((state) => state.auth.user);

    const users = useSelector((state) => state.users.users);

    const displayUsers = users
        ? users
              .filter((user) => {
                  if (
                      user.username === authUser.username ||
                      user.followers.some(
                          (follower) => follower.username === authUser.username
                      )
                  ) {
                      return false;
                  }
                  return true;
              })
              .slice(0, 5)
        : null;

    return (
        <div className={styles.box}>
            <h5 className={styles.title}>Users To Follow</h5>
            {displayUsers
                ? displayUsers.map((user) => {
                      return <IndividualUser user={user} key={user._id} />;
                  })
                : "Loading..."}
        </div>
    );
};

export default UsersToFollow;
