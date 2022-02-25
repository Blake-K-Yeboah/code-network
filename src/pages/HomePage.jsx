// Helmet
import { Helmet } from "react-helmet";

// Redux hooks
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../slices/usersSlice";
import { setPosts } from "../slices/postsSlice";

// Components
import Navbar from "../components/Navbar";
import WelcomeModal from "../components/WelcomeModal";
import Feed from "../components/Feed";

// useEffect hook
import { useEffect } from "react";

// axios
import axios from "axios";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch Users
        const fetchUsersAndPosts = async () => {
            try {
                const usersRes = await axios.get("/api/users-get");
                dispatch(setUsers(usersRes.data.result));

                const postsRes = await axios.get("/api/posts-get");
                dispatch(setPosts(postsRes.data.result.reverse()));
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsersAndPosts();
        // eslint-disable-next-line
    }, []);

    const user = useSelector((state) => state.auth.user);

    return (
        <>
            <Helmet>
                <title>Code Network - Home</title>
            </Helmet>
            <Navbar />
            {user.isNewAccount ? <WelcomeModal /> : <Feed type="home" />}
        </>
    );
};

export default HomePage;
