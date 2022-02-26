// Styles
import styles from "./styles";

// redux
import { useSelector } from "react-redux";

// Components
import User from "../User";

const Users = () => {
    const users = useSelector((state) => state.users.users);

    return (
        <div className={styles.container}>
            {users && users.length > 0 ? (
                users.map((user) => <User key={user._id} user={user} />)
            ) : (
                <>
                    <div className={styles.loader} />
                    <div className={styles.loader} />
                    <div className={styles.loader} />
                </>
            )}
        </div>
    );
};

export default Users;
